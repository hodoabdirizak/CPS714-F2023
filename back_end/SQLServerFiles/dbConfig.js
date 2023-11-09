const config = {
    user: 'cpsdevuser',
    password: 'password',
    database: 'EventEasy', //REPLACE if you named yours differently
    server: 'ROXANNE\\SQLEXPRESS', //REPLACE
    port: 1433, //REPLACE
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 150000,
    options: {
        instancename: 'SQLEXPRESS',
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

module.exports = config;

