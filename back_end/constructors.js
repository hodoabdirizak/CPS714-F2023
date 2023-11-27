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

class Organizer {
  constructor(Organizer_id, User_id, Organizer_name, Organizer_description, Organizer_website) {
    this.Organizer_id = Organizer_id,
    this.User_id = User_id,
    this.Organizer_name = Organizer_name,
    this.Organizer_description = Organizer_description,
    this.Organizer_website = Organizer_website
  }
}

class Organizer_events {
  constructor(Organizer_id, Event_id) {
    this.Organizer_id = Organizer_id,
    this.Event_id = Event_id
  }
}

class Event_table {
  constructor(Event_id, Event_name, Event_type, Event_start_date, Event_end_date, Event_start_time, Event_end_time, Event_description, Capacity, Minimum_age, Approved, Ticket_cost) {
    this.Event_id = Event_id,
    this.Event_name = Event_name,
    this.Event_type = Event_type,
    this.Event_start_date = Event_start_date,
    this.Event_end_date = Event_end_date,
    this.Event_start_time = Event_start_time,
    this.Event_end_time = Event_end_time,
    this.Event_description = Event_description,
    this.Capacity = Capacity,
    this.Minimum_age = Minimum_age,
    this.Approved = Approved,
    this.Ticket_cost = Ticket_cost
  }
}  

class Event_attendees {
  constructor(User_id, Event_id, Number_of_tickets) {
    this.User_id = User_id,
    this.Event_id = Event_id,
    this.Number_of_tickets = Number_of_tickets
  }
}

class Venue {
  constructor(Venue_id, Venue_name, Venue_type, Venue_address, Venue_format, Catering_options){
    this.Venue_id = Venue_id,
    this.Venue_name = Venue_name,
    this.Venue_type = Venue_type,
    this.Venue_address = Venue_address,
    this.Venue_format = Venue_format,
    this.Catering_options = Catering_options
  }
}

class Event_hosting {
  constructor(Event_id, Venue_id){
    this.Event_id = Event_id,
    this.Venue_id = Venue_id
  }
}

class Caterer {
  constructor(Caterer_id, User_id, Cuisine, Price_per_attendee) {
    this.Caterer_id = Caterer_id,
    this.User_id = User_id,
    this.Cuisine = Cuisine,
    this.Price_per_attendee = Price_per_attendee
  }
}

class Venue_caterer {
  constructor(Venue_id, Caterer_id){
    this.Venue_id = Venue_id,
    this.Caterer_id = Caterer_id
  }
}

module.exports = {
  User_Account,
  Organizer,
  Organizer_events,
  Event_table,
  Event_attendees,
  Venue,
  Event_hosting,
  Caterer,
  Venue_caterer
};
