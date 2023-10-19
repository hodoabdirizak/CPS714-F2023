/* 
Queries for reading from DB   
In relation to https://app.asana.com/0/1205599354289459/1205619395751888/f
*/

/* Get user account info  
   For displaying in the user's account 
   Inputs: User_id 
*/
SELECT Full_name, Email, Phone_number, Pronouns, Account_type FROM User_Account WHERE User_id=1;

/* Get the basic info for all the events that a user is attending 
   For previewing an event in the user's account 
   Inputs: User_id
*/
SELECT et.event_name, et.Event_start_date, et.Event_start_time
    FROM Event_table AS et, Event_attendees AS ea 
    WHERE ea.User_id = 1 AND et.Event_id = ea.Event_id;

/* Get the basic info for all events  
   For previewing events on the home page
   Inputs: based on filters
*/
SELECT et.Event_name, et.Event_start_date, v.Venue_name
    FROM Event_table AS et, Venue AS v, Event_hosting AS eh
    WHERE et.Event_id = eh.Event_id 
    AND eh.Venue_id = v.Venue_id;

/* Get all the attendees of an event
   For event organizers to view
   Inputs: Event_id
*/
SELECT ua.Full_name, ua.Phone_number, ua.Email
    FROM User_account AS ua, Event_attendees AS ea
    WHERE ua.User_id = ea.User_ID AND ea.Event_id = 54; 

/*
    all the venues available for an event
    all the caterers available at a venue
    all the venues available for an event
    all the events with a specific tag
    all the events hosted by an organizer 
*/