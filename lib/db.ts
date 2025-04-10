import mysql from "mysql2/promise"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "admin@1234567",
  database: process.env.MYSQL_DATABASE || "elite_center",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function executeQuery<T>({ query, values = [] }: { query: string; values?: any[] }): Promise<T> {
  try {
    const [rows] = await pool.execute(query, values);
    return rows as T;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to execute database query");
  }
}

export default pool