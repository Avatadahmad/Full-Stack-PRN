var { Pool } = require("pg");
const CONNECTION_STRING =
  process.env.DATABASE_URL ||
  "postgresql://postgres:Blacklist@123@localhost:5432/weather-db";

const SSL = process.env.NODE_ENV === "production";
class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL,
    });
    this.pool.on("error", (err, client) => {
      console.error("unexpected error", err);
      process.exit(-1);
    });
  }
  query(query, ...args) {
    this.pool.connect((err, client, done) => {
      if (err) throw err;

      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      client.query(this.query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({ error: "Database error" }, null);
        }
        callback({}, res.rows);
      });
    });
  }
  end() {
    this.pool.end();
  }
}

module.exports = new Database();
