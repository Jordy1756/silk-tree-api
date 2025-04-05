declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            PORT: string;
            SECRET_KEY: string;
            REFRESH_SECRET_KEY: string;
            NODE_ENV: "development" | "production" | "test";
            SALT_ROUNDS: number;
        }
    }
}

process.loadEnvFile();

export const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, SECRET_KEY, REFRESH_SECRET_KEY, NODE_ENV, SALT_ROUNDS } =
    process.env;
