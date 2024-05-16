/**
 * A constants file
 */

import * as path from "path";
// import dotenv
import dotenv from "dotenv";
dotenv.config();

export const SOURCE_PATH = path.resolve("src");
export const VIEWS_PATH = path.resolve(SOURCE_PATH, "views");

export const {
    PORT, 
    NODE_ENV,

    DB_URL, 
    DB_HOST, 
    DB_PORT, 
    DB_USER, 
    DB_NAME, 
    DB_PASSWORD,
    DB_SSL,

    DB_DEV_NAME,

    TOKEN_SALT,
} = process.env;