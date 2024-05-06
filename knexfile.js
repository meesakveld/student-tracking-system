import dotenv from 'dotenv';
dotenv.config();

import { DB_URL, DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD, DB_SSL, DB_DEV_NAME } from './src/consts.js';

const config = {
    production: {
        client: "pg",
        connection: {
            connectionString: DB_URL,
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            database: DB_NAME,
            password: DB_PASSWORD,
            ssl: DB_SSL ? { rejectUnauthorized: false } : false,
        },
        useNullAsDefault: true,
        migrations: {
            tableName: "knex_migrations", // table that will store the migration history
            directory: "./src/migrations", // location of the migration files
            stub: "./migration.stub", // this is the file that will be copied when creating a new migration
        },
        seeds: {
            directory: "./src/seeds", // location of the seed files (seeds = initial data for the database)
            stub: "./seed.stub", // this is the file that will be copied when creating a new seed
        },
    },
    development: {
        client: "sqlite3",
        connection: {
            filename: `./${DB_DEV_NAME}`, // the file that will store the database
        },
        useNullAsDefault: true,
        migrations: {
            tableName: "knex_migrations", // table that will store the migration history
            directory: "./src/migrations", // location of the migration files
            stub: "./migration.stub", // this is the file that will be copied when creating a new migration
        },
        seeds: {
            directory: "./src/seeds", // location of the seed files (seeds = initial data for the database)
            stub: "./seed.stub", // this is the file that will be copied when creating a new seed
        },
    },
};

export default config;