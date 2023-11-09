const dbOperationUserAccount    = require('./SQLServerFiles/dbOperationUserAccount');

const userAccountController = {
    getAccounts: async(req,res) => {
        console.log('Called /api/account/getaccounts');
        const result = await dbOperationUserAccount.getAccounts();
        console.dir(result);
        res.send(result.recordset);
    },    
    getUserId: async(req,res) => {
        console.log('Called /api/account/getuserid');
        const result = await dbOperationUserAccount.getUserId();
        // console.dir(`User ID is: ${result}`);
        res.send(result.toString());
    },
    noDupEmails: async(req,res) => {
        console.log('Called /api/account/nodupemails');
        const result = await dbOperationUserAccount.noDupEmails(req.body.email);
        const emailExists = result.toString().length > 0;
        // console.dir(`Email exists: ${emailExists}`);
        res.send(emailExists.toString());
    },
    getAccountByName: async(req,res) => {
        console.log('Called /api/account/getaccountbyname');
        const result = await dbOperationUserAccount.getAccountByName(req.body.name);
        console.dir(result);
        res.send(result.recordset);
    },
    createUserAccount: async(req,res) => {
        console.log('Called /api/account/addaccount');
        console.dir(req.body);
        // await dbOperation.addAccount(req.body);  
        // const result = await dbOperationUserAccount.getAccounts();
        // console.dir(result);
        // res.send(result.recordset);
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