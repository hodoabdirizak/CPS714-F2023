const dbOperationUserAccount    = require('./SQLServerFiles/dbOperationUserAccount');

const userAccountController = {
    createUserAccount: async(req,res) => {
        console.log('Called /api/account/addaccount');
        const result = await dbOperationUserAccount.addAccount(req.body);  
        try {
            res.send(result.toString());
        } catch {
            res.send(''.toString());
        }
    },
    addOrganizerAccount: async(req,res) => {
        console.log('Called /api/account/addorganizeraccount');
        // console.log('c',req.body['userId']);
        const result = await dbOperationUserAccount.addOrganizerAccount(req.body['userId']);  
        try {
            res.send(result.toString());
        } catch {
            res.send(''.toString());
        }
    },
    addCatererAccount: async(req,res) => {
        console.log('Called /api/account/addcatereraccount');
        // console.log('c',req.body['userId']);
        const result = await dbOperationUserAccount.addCatererAccount(req.body['userId']);  
        try {
            res.send(result.toString());
        } catch {
            res.send(''.toString());
        }
    },
    getAccounts: async(req,res) => {
        console.log('Called /api/account/getaccounts');
        const result = await dbOperationUserAccount.getAccounts();
        console.dir(result);
        res.send(result);
    },    
    getUserIdByEmail: async(req,res) => {
        console.log('Called /api/account/getuseridbyemail');
        console.log('input',req.body.email);
        const result = await dbOperationUserAccount.getUserIdByEmail(req.body.email);
        console.log('result',result[0]['User_id'].toString());
        res.send(result[0]['User_id'].toString());
    },
    verifyLogin: async(req,res) => {
        console.log('Called /api/account/verifylogin');
        console.log('input',req.body.email);
        const result = await dbOperationUserAccount.verifyLogin(req.body.email,req.body.password);
        console.log('result',result[0]['User_id'].toString());
        res.send(result[0]['User_id'].toString());
        // depending on if the return is an empty string or a user ID, you may need to use try and catch
    }
    // noDupEmails: async(req,res) => {
    //     console.log('Called /api/account/nodupemails');
    //     const result = await dbOperationUserAccount.noDupEmails(req.body.email);
    //     const emailExists = result.toString().length > 0;
    //     // console.dir(`Email exists: ${emailExists}`);
    //     res.send(emailExists.toString());
    // }
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