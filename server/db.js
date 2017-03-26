import pg from "pg";
import { getConfig } from "../config/dbconfig";
const pool = new pg.Pool(getConfig(process.env.NODE_ENV === "production"));

// This module serves the purpose of providing access to single instance of Pool
// https://github.com/brianc/node-pg-pool#a-note-on-instances

export const query = (text, values) => pool.query(text, values);

export const connect = () => pool.connect();
