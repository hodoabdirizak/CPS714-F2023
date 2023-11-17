const config = {
    user: 'rudabada',
    password: 'pm23',
    database: 'EventEasy', //REPLACE if you named yours differently
    server: 'LAPTOP-TB3L796Q', //REPLACE
    port: 1433, //REPLACE
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 150000,
    options: {
        instancename: 'SQLEXPRESS01',
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

module.exports = config;

