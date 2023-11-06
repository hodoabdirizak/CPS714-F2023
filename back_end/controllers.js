const dbOperation   = require('./SQLServerFiles/dbOperationUserAccount');

const userAccountController = {
    getAccounts: async(req,res) => {
        console.log('Called /api/account/getaccounts');
        const result = await dbOperation.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    },    
    getAccountByName: async(req,res) => {
        console.log('Called /api/account/getaccountbyname');
        const result = await dbOperation.getAccountByName(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    createUserAccount: async(req,res) => {
        console.log('Called /api/account/addaccount');  
        await dbOperation.addAccount(req.body);  
        const result = await dbOperation.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    }
};


const organizerController = {

};


const eventController = {

};


const venueController = {

};


const catererController = {

};


module.exports = {
    userAccountController,
    organizerController,
    eventController,
    venueController,
    catererController
}