/* 
Queries for reading from DB   
In relation to https://app.asana.com/0/1205599354289459/1205619395751888/f
*/

/*  Get user account info  
    For displaying in the user's account 
    Inputs: User_id 
*/
SELECT Full_name, Email, Phone_number, Pronouns, Account_type FROM User_Account WHERE User_id=1;

/*  Get the basic info for all the events that a user is attending 
    For previewing an event in the user's account 
    Inputs: User_id
*/
SELECT et.event_name, et.Event_start_date, et.Event_start_time
    FROM Event_table AS et, Event_attendees AS ea 
    WHERE ea.User_id = 1 AND et.Event_id = ea.Event_id;

/*  Get the basic info for all events  
    For previewing events on the home page
    Inputs: based on filters
*/
SELECT et.Event_name, et.Event_start_date, v.Venue_name
    FROM Event_table AS et, Venue AS v, Event_hosting AS eh
    WHERE et.Event_id = eh.Event_id 
    AND eh.Venue_id = v.Venue_id;

/*  Get all the attendees of an event
    For event organizers to view
    Inputs: Event_id
*/
SELECT ua.Full_name, ua.Phone_number, ua.Email
    FROM User_account AS ua, Event_attendees AS ea
    WHERE ua.User_id = ea.User_ID AND ea.Event_id = 54; 

/*
    Get all the caterers available at a venue
    For organizer view
    Inputs: Venue_id
*/
SELECT ua.Full_name, c.Cuisine, c.Price_per_attendee
    FROM User_Account AS ua, Caterer AS c, Venue_caterer AS vc
    WHERE c.User_id = ua.User_id
    AND vc.Caterer_id = c.Caterer_id
    AND vc.Venue_id = 1004;

/*
    Get all the events booked by a venue
    For checking venue availability
    Input: Venue_id
*/
SELECT et.Event_name, et.Event_start_date, et.Event_start_time, et.Event_end_date, et.Event_end_time
    FROM Event_table AS et, Event_hosting AS eh
    WHERE eh.Event_id = et.Event_id

/*
    Get all the events with a specific tag
    For filtering on event search
    Input: Tag_name
*/

/*
    Get all the events hosted by an organizer
    For organizer view
    Input: Organizer name
*/

/*
    Get all the venues available for an event 
    For organizer view when booking a venue
    Inputs: time and day of desired event
*/
