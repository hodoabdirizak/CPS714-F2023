CREATE TABLE User (
	User_id int,//PK
	Full_name varchar(255),
	Name varchar(255),
	Phone_number int,
	Pronouns varchar(5),
	Email varchar(255),
	Account_type varchar(255),
);
CREATE TABLE Event (
	Event_id int,
	Event_name varchar(255),
	Date DATE,//format is YYYY-MM-DD
	Time TIME,//format is HH:MM runs as a 24-hour clock time
  	Capacity int,
  	Family_friendly BOOLEAN,
  	Age_restriction int,
  	Description varchar(255),
  	Venue_id int,
	Organirzer_id int,
	Approved BOOLEAN,
	Cost int,
);
CREATE TABLE Venue (
	Venue_id int,
	Venue_name varchar(255),
	Type varchar(255),
	Location varchar(255),
	Catering_options varchar(255),
);