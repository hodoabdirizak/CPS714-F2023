const config = {
    user: '714user',
    password: 'ughhhhh',
    database: 'EventEasy',
    server: 'eventeasy2.cv70awf1gzpj.ca-central-1.rds.amazonaws.com',
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

