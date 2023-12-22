const Pool = require('pg').Pool
const config = require(__dirname + '/../config/config.json');

// Create the connection pool
const pool = new Pool({
    user: "yoaqtxvl",
    host: "rain.db.elephantsql.com",
    database: "yoaqtxvl",
    password: "PPr7gzt67BbTzFagQlqq_MzwzfpzX2Hr",
    port: 5432
});

module.exports = pool;