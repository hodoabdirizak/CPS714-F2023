-- Update tables

-- Update User_Account, Input: user_id
UPDATE User_Account
SET Full_name = fullname,
    Phone_number = phnumber
WHERE User_id = userid;

-- Update Organizer, Input: User_id, organizer_id
UPDATE Organizer
SET Organizer_name = newname,
    Organizer_description = newdescription,
    Organizer_website = newwebsite
WHERE User_id = userid AND Organizer_id = orgid;

-- Update Organizer_events, Input: Organizsr_id, Event_id
-- Not sure what to update

-- Update Event_table, Input: Event_id
UPDATE Event_table
SET Event_start_date = startdate,
    Event_end_date = enddate,
    Event_start_time = starttime,
    Event_end_time = endtime,
    Capacity = capacity,
    Approved = approved,
    Event_cost = eventcost
WHERE Event_id = eventid;


-- Update Event_attendees, Input: User_id, Event_id
UPDATE Event_attendees
SET Number_of_tickets = numtickets
WHERE User_id = userid AND Event_id = eventid;

-- Update Venue, Input: Venue_id
UPDATE Venue
SET Venue_address = newaddress,
    Venue_name = newname,
    Catering_options = newoption
WHERE Venue_id = venid;

-- Update Event_hosting
-- Not sure what to update

-- Update Tag, Input: tag_id
UPDATE Tag
SET Tag_name = newname
WHERE Tag_d = tagid;

-- Update Event_tags
-- Not sure what to update

-- Updtae Caterer, Input: Caterer_id, User_id
UPDATE Catrer
SET Cuisine = newcuisine,
    Price_per_attendee = newprice
WHERE Caterer_id = catid AND User_id = userid;

-- Update Venue_caterer
-- Not sure what to update
