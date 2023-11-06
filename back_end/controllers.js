const dbOperationUserAccount   = require('./SQLServerFiles/dbOperationUserAccount');

const userAccountController = {
    getAccounts: async(req,res) => {
        console.log('Called /api/account/getaccounts');
        const result = await dbOperationUserAccount.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    },    
    getAccountByName: async(req,res) => {
        console.log('Called /api/account/getaccountbyname');
        const result = await dbOperationUserAccount.getAccountByName(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    createUserAccount: async(req,res) => {
        console.log('Called /api/account/addaccount');  
        await dbOperation.addAccount(req.body);  
        const result = await dbOperationUserAccount.getAccounts();
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