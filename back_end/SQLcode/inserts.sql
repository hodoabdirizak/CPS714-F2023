insert into User_Account values (1, 'patrickstarr@hotmail.com', 'Patrick Star', 9056753264, 'He/Him', 'attendee');
insert into User_Account values (2, 'spongebobsqpants23@gmail.com', 'Spongebob Squarepants', 6471230124, 'He/Him', 'organizer');
insert into User_Account values (3, 'jackson.michael@yahoo.com', 'Michael Jackson', 4168246426, 'He/He', 'approver');
insert into User_Account values (4, 'USApresident@outlook.com', 'Michelle Obama', 287546193, 'Her/She', 'attendee');
insert into User_Account values (5, 'NickiM@live.com', 'Nicki Minaj', 6479021346, 'She/Her', 'organizer');
insert into User_Account values (6, 'T.Holland@live.ca', 'Tom Holland', 6477391043, 'He/Him', 'attendee');
insert into User_Account values (7, 'pastahouse@gmail.ca', 'Pasta House', 6477891043, '', 'caterer');
insert into User_Account values (8, 'kelseys@gmail.ca', 'Kelseys', 6477891013, '', 'caterer');
insert into User_Account values (9, 'ouioui@gmail.ca', 'Oui Oui', 6471021013, '', 'caterer');


insert into Organizer values (20, 2, 'Krusty Krab', 'Yellow square that is ready','rippedmypants.com');
insert into Organizer values (21, 5, 'Barbz', 'Super Bass', 'BarbzRules.com');

insert into Organizer_events values (20, 54);
insert into Organizer_events values (20, 84);
insert into Organizer_events values (21, 102);

insert into Event_table values (54, 'Christmas Party', 'Social Gathering', '2023-12-24', '2023-12-24', '17:00', '23:00', 'Christmas Party at my house!!', 20, 1, 1, 0);
insert into Event_table values (84, 'Squidward resuscitation event', 'Social Gathering', '2023-12-25', '2023-12-25', '00:01', '12:01', 'I forgot Squidward is claustrophobic', 5, 18, 0, 0);
insert into Event_table values (102, 'My Wedding', 'Wedding', '2023-11-16', '2023-11-11', '14:00', '1:00', 'I am marrying Tom Holland', 450, 18, 1, 100);

insert into Event_attendees values (1, 54, 1);
insert into Event_attendees values (4, 84, 2);
insert into Event_attendees values (6, 102, 1);
insert into Event_attendees values (5, 102, 1);

insert into Venue values (1004, 'Spongebob''s Pineapple', 'House', '25 Bikini Bottom', 'In-Person', 'Krusty Krab');
insert into Venue values (1014, 'Bikini Bottom Hospital', 'Hospital', '83 Emergency St', 'In-Person', 'N/A');
insert into Venue values (1250, 'Texas', 'Country', '1 Texas CRT', 'Virtual', 'Bring your own food');

insert into Event_hosting values (54, 1004);
insert into Event_hosting values (84, 1014);
insert into Event_hosting values (102, 1250);

insert into Caterer values (8067, 8, 'American', 7.90);
insert into Caterer values (8068, 7, 'Italian', 18.99);
insert into Caterer values (8069, 9, 'French', 54.21);

insert into Venue_caterer values (1004, 8067);
insert into Venue_caterer values (1014, 8069);
insert into Venue_caterer values (1250, 8068); 


