import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 72; // bcrypt ignores anything past 72 bytes

const COMMON_PASSWORDS = new Set([
  'password123',
  'password12',
  'changeme123',
  'changeme123!',
  'admin12345',
  'welcome123',
  'qwertyuiop',
  '1234567890',
  '0123456789',
  'letmein123',
]);

/** Returns a message describing the problem, or null if the password is acceptable. */
export const validatePassword = (password: string, email?: string): string | null => {
  if (password.length < MIN_PASSWORD_LENGTH) return `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (password.length > MAX_PASSWORD_LENGTH) return `Use at most ${MAX_PASSWORD_LENGTH} characters.`;
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return 'Include at least one letter and one number.';
  if (COMMON_PASSWORDS.has(password.toLowerCase())) return 'That password is too common. Choose another.';
  if (email && password.toLowerCase() === email.toLowerCase()) return 'Your password cannot be your email address.';
  return null;
};

export const hashPassword = (password: string, rounds = 12) => bcrypt.hash(password, rounds);
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);

// Compared against when the email is unknown, so a wrong email and a wrong
// password take about the same time and reveal nothing.
let dummyHash: string | undefined;
export const getDummyHash = async () => (dummyHash ??= await bcrypt.hash('not-a-real-password', 10));

export const signToken = (adminId: string, role: string, secret: string, expiresIn: string) =>
  jwt.sign({ role }, secret, { subject: adminId, expiresIn, algorithm: 'HS256' } as SignOptions);

/** Throws if the token is missing, forged, expired, or signed with another algorithm. */
export const verifyToken = (token: string, secret: string): { adminId: string; role: string } => {
  const payload = jwt.verify(token, secret, { algorithms: ['HS256'] }) as jwt.JwtPayload;
  if (typeof payload.sub !== 'string') throw new Error('Token has no subject');
  return { adminId: payload.sub, role: String(payload.role ?? '') };
};

/** Refuse to run in production with a guessable signing secret. */
export const assertSecureSecret = (secret: string, nodeEnv: string) => {
  if (nodeEnv !== 'production') return;
  if (secret.length < 32 || secret.toLowerCase().includes('supersecret')) {
    throw new Error(
      'JWT_SECRET is missing or too weak for production. Set a long random value in the server environment.'
    );
  }
};
