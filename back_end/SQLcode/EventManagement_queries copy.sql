/* Represents the User entity */
CREATE TABLE User_Account (
	User_id INT NOT NULL PRIMARY KEY,
	Email VARCHAR(255) NOT NULL UNIQUE,
	Full_name VARCHAR(255),
	Phone_number INT CHECK (phone_number BETWEEN 0 AND 9999999999),
	Pronouns VARCHAR(10), 
	Account_type VARCHAR(10) NOT NULL /* Options: "attendee", "organizer", "approver" */
);

/* Represents the Organizer entity - each organizer is associated with a user_id*/
CREATE TABLE Organizer ( 
	Organizer_id INT NOT NULL,
	User_id INT NOT NULL,
	Organizer_name VARCHAR(30),
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
CREATE TABLE Event ( /* Event is a keyword in sql */
	Event_id INT NOT NULL PRIMARY KEY,
	Event_name VARCHAR(100) NOT NULL,
	Event_date DATE NOT NULL, /*format is YYYY-MM-DD*/
	Event_time TIME NOT NULL, /*format is HH:MM runs as a 24-hour clock time */
  	Event_description VARCHAR(500) NOT NULL,
	Capacity INT NOT NULL,
  	Family_friendly BOOLEAN NOT NULL,
  	Minimum_age INT NOT NULL, 
	Approved BOOLEAN NOT NULL,
	Event_cost DECIMAL(10,2) NOT NULL, /* 10 digits before the point, 2 digits after the point */
	Ticket_cost DECIMAL(10,2) NOT NULL
);

/* Altering Event table
ALTER TABLE Event
ADD newcolumn DATATYPE;

ALTER TABLE Event
DROP COLUMN columnName; 
*/

/*Updating Event table
UPDATE Event
SET column1 = value1,...
WHERE condition;
*/

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
	Venue_id INT NOT NULL PRIMARY KEY,
	Venue_name VARCHAR(255) NOT NULL,
	Venue_type VARCHAR(255) NOT NULL,
	Venue_address VARCHAR(255),
	Venue_format VARCHAR(20), /*Either "in-person" or "virtual" */
	Catering_options VARCHAR(255)
);

/* 
Relationship between Event and Venue 
Each venue may host one or more events
Each events can only be hosted at one venue 
*/
CREATE TABLE Event_hosting (
	Event_id INTEGER NOT NULL UNIQUE, /*should be unique*/
	Venue_id INTEGER NOT NULL, 
    PRIMARY KEY(Event_id,Venue_id)
);

/* Represents the Tag entity */
CREATE TABLE Tag (
	Tag_id INT NOT NULL PRIMARY KEY,
	Tag_name VARCHAR(20) NOT NULL
);

/* 
Relationship between Event and Tag 
Each event may have one or more tags
Each tag may be associated with one or more events 
*/
CREATE TABLE Event_tags (
	Event_id INTEGER NOT NULL,
	Tag_id INTEGER NOT NULL, 
	PRIMARY KEY(Event_id,Tag_id)
);

/* Represents the Caterer entity */
CREATE TABLE Caterer (
	Caterer_id INT NOT NULL PRIMARY KEY,
	Cuisine VARCHAR(20) NOT NULL, /*Ex. Thai, Seafood, Japanese, etc.*/
	Price_per_attendee DECIMAL(10,2) NOT NULL
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
