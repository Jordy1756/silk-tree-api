process.loadEnvFile();

export const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, SECRET_KEY, REFRESH_SECRET_KEY, NODE_ENV, SALT_ROUNDS } =
    process.env;
