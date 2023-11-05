class User_Account {
  constructor(User_id, Email, Full_name, Phone_number, Pronouns, Account_type) {
    this.User_id = User_id,
      this.Email = Email,
      this.Full_name = Full_name,
      this.Phone_number = Phone_number,
      this.Pronouns = Pronouns,
      this.Account_type = Account_type
  }
}
module.exports = { 
  User_Account
};