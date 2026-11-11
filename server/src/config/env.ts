import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().default('supersecretjwtkeyforlocaldevelopmentminimum32chars'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  CLOUDINARY_CLOUD_NAME: z.string().default('YOUR_CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: z.string().default('YOUR_CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: z.string().default('YOUR_CLOUDINARY_API_SECRET'),
  RESEND_API_KEY: z.string().default('re_placeholder'),
  EMAIL_FROM: z.string().default('Happy Events <onboarding@resend.dev>'),
  ADMIN_EMAIL: z.string().default('george@happyevents.co'),
  WHATSAPP_NUMBER: z.string().default('919908683101'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
