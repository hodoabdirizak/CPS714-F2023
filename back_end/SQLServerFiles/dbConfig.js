const config = {
    user: 'camillia',
    password: '0m@rFa!ls?',
    database: 'EventEasy',
    server: 'DESKTOP-TR8A4MF',
    port: 1433,
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

// const config = {
//     user: 'camillia',
//     password: '0m@rFa!ls?',
//     database: 'EventEasy',
//     server: 'DESKTOP-TR8A4MF',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         // If you are on Microsoft Azure, you need encryption:
//         // encrypt: true,
//         // instancename: 'SQLEXPRESS',
//         trustedConnection: true,
//         trustServerCertificate: true
//     },
//     port: 1433
// };

module.exports = config;

