import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform(Number).default(4000),
    MONGO_URI: z.string().nonempty("MONGO_URI is required"),
    TOKEN_SECRET: z.string().nonempty("TOKEN_SECRET is required"),
    NODE_ENV: z.string().nonempty("NODE_ENV is required"),
    HMAC_VERIFICATION_CODE_SECRET: z
        .string()
        .nonempty("HMAC_VERIFICATION_CODE_SECRET is required"),
});

export const env = envSchema.parse(process.env);
