# angular-project

## 1.About the project.  
This is my project for the Angular November 2020 course at SoftUni.  
It represents a simple car E-Market.  

## 2.About the backend.  
It's written on javascript using Express, MongoDB and Mongoose,  
Formidable - for FormData parsing, Cloudinary for file upload.  
Incoming data is validated with express-validator.  
I'm using JWT tokens for authentication.  
When the user logouts his token is saved to a Blacklist collection in Mongo.  
The expired tokens are cleaned by a Cron job every 12 hours.

## 3.About the Angular client.  
### Dynamic pages:  
- Collection page - made with flex-box, data is sorted by forSale property  
- Car Details page - includes car info, edit car menu, sell car menu, delete car functionality  
- My Offers page - made with flex-box, displays all active offers for the current user ordered descending by date of creation  
- Offers page - made with flex-box, offers ordered descending by date of creation and has pagination  
- Offer Details page - includes offer info, picture toggle by click, edit offer menu, delete offer functionality, buy car from offer functionality, link to comments page  
- Offer Comments page - shows all comments (most recent first) for the current offer, add comment functionality  
- Profile page - displays user info, has transfer money menu, edit menu  

### Static pages:  
- Home page  
- Register page  
- Login page  
- Add Car page  
- Error page  

## 4.PS.  
There were several major releases for MongoDB, Node, Angular,
the code is not updated to the newer versions. If you have newer versions of Node or MongoDB
installed the backend server might fail to start.

No entities (users, offers, cars) are generated by default. They need to be created by the 
appropriate page/menu.

On these versions the project still works:
Node (14.15.0), 
Angular (10.2.0), 
MongoDB Community (4.4.2)

MongoDB Community Archive:
https://www.mongodb.com/try/download/community-edition/releases/archive

Node.js Downloads:
https://nodejs.org/en/download/prebuilt-installer
