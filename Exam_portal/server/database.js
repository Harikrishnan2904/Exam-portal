const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'geetha4050',
    host: 'localhost',
    port: 5432,
    database: 'EXAM'
});
module.exports = pool;