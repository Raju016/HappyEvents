/**
 * Creates an admin account, or resets the password of an existing one.
 *
 *   cd server
 *   npx tsx scripts/create-admin.ts
 *
 * Run it again with the same email to reset a forgotten password.
 */
import readline from 'readline';
import { PrismaClient } from '@prisma/client';
import { hashPassword, validatePassword } from '../src/services/adminAuth';

const prisma = new PrismaClient();

const ask = (rl: readline.Interface, question: string) =>
  new Promise<string>((resolve) => rl.question(question, (a) => resolve(a.trim())));

// Reads a password without echoing it to the screen.
const askHidden = (question: string) =>
  new Promise<string>((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(question);
    let value = '';
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    const onData = (char: string) => {
      if (char === '\r' || char === '\n') {
        stdin.setRawMode?.(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve(value);
      } else if (char === '\u0003') {
        process.exit(1);
      } else if (char === '\u007f' || char === '\b') {
        value = value.slice(0, -1);
      } else {
        value += char;
      }
    };
    stdin.on('data', onData);
  });

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const email = (await ask(rl, 'Admin email: ')).toLowerCase();
  const name = await ask(rl, 'Full name: ');
  const roleInput = (await ask(rl, 'Role (SUPER_ADMIN / ADMIN / EDITOR) [SUPER_ADMIN]: ')).toUpperCase() || 'SUPER_ADMIN';
  rl.close();

  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('That does not look like an email address.');
  if (!name) throw new Error('Name is required.');
  if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(roleInput)) throw new Error('Role must be SUPER_ADMIN, ADMIN or EDITOR.');

  const password = await askHidden('Password (hidden): ');
  const problem = validatePassword(password, email);
  if (problem) throw new Error(problem);
  const confirm = await askHidden('Repeat password: ');
  if (confirm !== password) throw new Error('The passwords did not match.');

  const passwordHash = await hashPassword(password);
  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    await prisma.admin.update({
      where: { email },
      data: { passwordHash, name, role: roleInput as 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR', isActive: true },
    });
    console.log(`Updated the existing account for ${email} (password reset).`);
  } else {
    await prisma.admin.create({
      data: { email, name, passwordHash, role: roleInput as 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' },
    });
    console.log(`Created ${roleInput} account for ${email}.`);
  }
}

main()
  .catch((err) => {
    console.error(`\nNot saved: ${err.message}`);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
