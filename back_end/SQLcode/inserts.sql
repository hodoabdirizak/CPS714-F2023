insert into User_Account values ('patrickstarr@hotmail.com', 'Patrick Star', 9056753264, 'He/Him', 'attendee', 'test');
insert into User_Account values ('spongebobsqpants23@gmail.com', 'Spongebob Squarepants', 6471230124, 'He/Him', 'organizer', 'test');
insert into User_Account values ('jackson.michael@yahoo.com', 'Michael Jackson', 4168246426, 'He/He', 'approver', 'test');
insert into User_Account values ('USApresident@outlook.com', 'Michelle Obama', 287546193, 'Her/She', 'attendee', 'test');
insert into User_Account values ('NickiM@live.com', 'Nicki Minaj', 6479021346, 'She/Her', 'organizer', 'test');
insert into User_Account values ('T.Holland@live.ca', 'Tom Holland', 6477391043, 'He/Him', 'attendee', 'test');
insert into User_Account values ('pastahouse@gmail.ca', 'Pasta House', 6477891043, '', 'caterer', 'test');
insert into User_Account values ('kelseys@gmail.ca', 'Kelseys', 6477891013, '', 'caterer', 'test');
insert into User_Account values ('ouioui@gmail.ca', 'Oui Oui', 6471021013, '', 'caterer', 'test');

insert into Organizer values (2, 'Yellow square that is ready','rippedmypants.com');
insert into Organizer values (5, 'Super Bass', 'BarbzRules.com');

insert into Organizer_events values (1, 1);
insert into Organizer_events values (1, 2);
insert into Organizer_events values (2, 3);

insert into Event_table values ('Christmas Party', 'Social Gathering', '2023-12-24', '2023-12-24', '17:00', '23:00', 'Christmas Party at my house!!', 20, 1, 1, 0, 'Toronto On.');
insert into Event_table values ('Squidward resuscitation event', 'Social Gathering', '2023-12-25', '2023-12-25', '00:01', '12:01', 'I forgot Squidward is claustrophobic', 5, 18, 0, 0,'Toronto On.');
insert into Event_table values ('My Wedding', 'Wedding', '2023-11-16', '2023-11-11', '14:00', '1:00', 'I am marrying Tom Holland', 450, 18, 1, 100,'Toronto On.');

insert into Event_attendees values (1, 1, 1);
insert into Event_attendees values (2, 2, 2);
insert into Event_attendees values (3, 3, 1);
insert into Event_attendees values (4, 3, 1);

insert into Venue values ('Spongebob''s Pineapple', 'House', '25 Bikini Bottom', 'In-Person', 'Krusty Krab');
insert into Venue values ('Bikini Bottom Hospital', 'Hospital', '83 Emergency St', 'In-Person', 'N/A');
insert into Venue values ('Texas', 'Country', '1 Texas CRT', 'Virtual', 'Bring your own food');

insert into Event_hosting values (1, 1);
insert into Event_hosting values (2, 2);
insert into Event_hosting values (3, 3);

insert into Caterer values (8, 'American', 7.90);
insert into Caterer values (7, 'Italian', 18.99);
insert into Caterer values (9, 'French', 54.21);

insert into Venue_caterer values (1, 1);
insert into Venue_caterer values (2, 2);
insert into Venue_caterer values (3, 3); 


