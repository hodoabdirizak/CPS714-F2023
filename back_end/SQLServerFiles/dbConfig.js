const config = {
    user: 'camillia',
    password: '0m@rFa!ls?',
    database: 'EventEasy', //REPLACE if you named yours differently
    server: '192.168.56.1', //REPLACE
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
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = config;

