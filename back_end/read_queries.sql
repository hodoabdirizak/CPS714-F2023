/* In relation to https://app.asana.com/0/1205599354289459/1205619395751888/f

Create queries for retrieving:
    user account info
    all the events that a user is attending
    all attendees of an event
    all the venues available for an event
    all the caterers available at a venue
    all the venues available for an event
    all the events with a specific tag
    all the events hosted by an organizer 
    
*/

/* Get user account info */
SELECT * FROM User_Account WHERE User_id=1;

/* Get the basic into all the events that a user is attending */
SELECT * FROM Event_attendees WHERE User_id=1;

