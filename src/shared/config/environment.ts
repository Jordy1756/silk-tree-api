process.loadEnvFile();

export const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, JWT_SECRET, NODE_ENV } = process.env;
