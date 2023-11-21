const config = {
    user: 'masteruser',
    password: '805of7SsoLnaQGHIehT4',
    database: 'EventEasy', //REPLACE if you named yours differently
    server: 'eventeasy.cv70awf1gzpj.ca-central-1.rds.amazonaws.com', //REPLACE
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

