declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            PORT: string;
            SECRET_KEY: string;
            REFRESH_SECRET_KEY: string;
            NODE_ENV: "development" | "production" | "test";
            SALT_ROUNDS: number;
        }
    }
}

process.loadEnvFile();

export const { DB_URL, PORT, SECRET_KEY, REFRESH_SECRET_KEY, NODE_ENV, SALT_ROUNDS } = process.env;
