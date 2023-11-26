/* Represents the User entity */
CREATE TABLE User_Account (
	User_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Email VARCHAR(255) NOT NULL UNIQUE,
	Full_name VARCHAR(255),
	Phone_number BIGINT,
	Pronouns VARCHAR(10), 
	Account_type VARCHAR(10) NOT NULL, /* Options: "attendee", "organizer", "approver" */
	Pswd VARCHAR(20) NOT NULL,
	Account_verified VARCHAR(3)
);

/* Represents the Organizer entity - each organizer is associated with a user_id*/
CREATE TABLE Organizer ( 
	Organizer_id INT NOT NULL IDENTITY(1,1),
	User_id INT NOT NULL,
	Organizer_description VARCHAR(500),
	Organizer_website VARCHAR(500),
	PRIMARY KEY(User_id,Organizer_id)
);

/* 
Relationship between Organizer and Event 
Each organizer may create one of more events
Each event can only be created by one organizer
*/
CREATE TABLE Organizer_events (
	Organizer_id INT NOT NULL,
	Event_id INT NOT NULL,
    PRIMARY KEY(Organizer_id,Event_id)
);

/* Represents the Event entity */
CREATE TABLE Event_table ( 
	Event_id INT IDENTITY(1,1) PRIMARY KEY,
	Event_name VARCHAR(100) NOT NULL,
	Event_type VARCHAR(100) NOT NULL,
	Event_format VARCHAR(100) NOT NULL,
	Event_start_date DATE NOT NULL, /*format is YYYY-MM-DD*/	
	Event_end_date DATE NOT NULL, /*format is YYYY-MM-DD*/
	Event_start_time TIME NOT NULL, /*format is HH:MM runs as a 24-hour clock time */
	Event_end_time TIME NOT NULL, /*format is HH:MM runs as a 24-hour clock time */
  	Event_description VARCHAR(500) NOT NULL,
	Capacity INT NOT NULL,
  	Minimum_age INT NOT NULL, 
	Approved BIT NOT NULL, /* 1 for true, 0 for false */
	Ticket_cost DECIMAL(10,2) NOT NULL
);

/* 
Relationship between User and Event 
Each user may attend one or more events
Each event may have one or more attendees 
*/
CREATE TABLE Event_attendees (
	User_id INT NOT NULL, 
    Event_id INT NOT NULL,
	Number_of_tickets INT NOT NULL, 
	PRIMARY KEY(User_id,Event_id)
);

/* Represents the Venue entity */
CREATE TABLE Venue (
	Venue_id INT IDENTITY(1,1) PRIMARY KEY ,
	Venue_name VARCHAR(255) NOT NULL,
	Venue_type VARCHAR(255) NOT NULL,
	Venue_address VARCHAR(255)
);

/* 
Relationship between Event and Venue 
Each venue may host one or more events
Each events can only be hosted at one venue 
*/
CREATE TABLE Event_hosting (
	Event_id INTEGER NOT NULL,
	Venue_id INTEGER NOT NULL, 
    PRIMARY KEY(Event_id,Venue_id)
);

/* Represents the Caterer entity */
CREATE TABLE Caterer (
	Caterer_id INT NOT NULL IDENTITY(1,1),
	User_id INT NOT NULL,
	Full_address VARCHAR(255),
	Cuisine VARCHAR(20), /*Ex. Thai, Seafood, Japanese, etc.*/
	Price_per_attendee DECIMAL(10,2),
	PRIMARY KEY(Caterer_id, User_id)
);

/* 
Relationship between Venue and Caterer
Each venue may have one or more caterers
Each caterer may cater to one or more venues 
*/
CREATE TABLE Venue_caterer (
	Venue_id INTEGER NOT NULL,
	Caterer_id INTEGER NOT NULL, 
	PRIMARY KEY(Venue_id,Caterer_id)
);
