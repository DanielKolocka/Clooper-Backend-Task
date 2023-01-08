# Clooper-Backend-Task
Property Manager
We would want you to build a simple property manager, where; 

There are two user types ( Admin and a normal user )

A user can :
create,
update,
delete,
publish and
Search for properties by address.

Admin:
Manage users ( activate and deactivate ) and manage properties


•	On creation of a property send a notification email, 20 minutes later, to metrics@clooper.com each time a user publishes a property on the platform; 
•	email should describe the published property and the user. 
•	A user has the following attributes (first_name, last_name, email, phone, is_admin ( boolean ), is_active ); 
•	A user must be approved by the admin before they can create, update, delete and publish, but they can search for a property.

A property has the following attributes 
name, 
address, 
type => flat, 
description, 
image_url, 
total_rooms => 3 bdrm, 
occupancy_type => single, 
rent_amount => $1200, 
rent_frequency => monthly, 
is_published => true|false

Note: 
Property is not automatically published when it is created, and can only be published when approved by an admin 
