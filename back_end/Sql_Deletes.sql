
--INDIVIDUAL DELETION STATEMENTS 
    
 /* User_Account deletion
    Inputs: user
 */
DELETE FROM User_Account WHERE User_id = user;

 /* Event_table deletion
    Inputs: eventid
 */
 DELETE FROM Event_table WHERE Event_id = eventid;

/*  Organizer deletion
    Inputs: User, organizer 
 */
DELETE FROM Organizer WHERE User_id = user AND Organizer_id = organizer;

/*  Organizer_events deletion
    Inputs: eventid, organizer 
 */
 DELETE FROM Organizer_events WHERE Event_id = eventid AND Organizer_id = organizer;

 /* Event_Attendees deletion
    Inputs: user, eventid 
 */
DELETE FROM Event_Attendees WHERE Event_id = eventid AND User_id = user;

 /* Venue deletion
    Inputs: venueid 
 */
DELETE FROM Venue WHERE Venue_id = venue;

 /* Tag deletion
    Inputs: tag
 */
 DELETE FROM Tag WHERE Tag_id = tag;

 /* Caterer deletion
    Inputs: caterer, eventid 
 */
DELETE FROM Caterer WHERE Caterer_id= Caterer AND Event_id = eventid;

 /* Venue_caterer deletion
    Inputs: caterer, venue 
 */
 DELETE FROM Venue_caterer WHERE Venue_id= venue AND caterer_id = caterer;







