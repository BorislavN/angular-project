# angular-project

## 1.About the project.  
This is my project for the Angular November 2020 course at SoftUni.  
It represents a car e-market.  

## 2.About the backend.  
It's written on javascript using express, mongoDB and Mongoose,  
Formidable - for FormData parsing, Cloudinary for file upload.  
Incoming data is validated with express-validator.  
I'm using JWT tokens for authentication.  
When the user logouts his token is saved to a Blacklist collection in Mongo.  
The expired tokens are cleaned by a Cron job every 12 hours.

## 3.About the Angular client  
### Current functionality and pages:  
- Home page - has different content for anonymous and authenticated users  
- Login page - has validations  
- Register page - has validations  
- Logout functionality  
- Add Car page - has validations  
- Collection page - here the user can see his cars. Cars tagged for sale have red background.  
- Car Details page - the details for the selected car and form here the user can access the Sell menu.  
- Sell Car menu - has validations, the user is redirected to My Offers page after success.  
- My Offers page - here the user can see his active offers ordered by date descending. If he clicks on a link he is redirected to the Offer Details page.  
- Offer Details page - the details for the current offer. If the user has submitted more than one picture he can toggle whats displayed in the main picture  container by clicking on the smaller pictures.  
- All Offers page with pagination  
- User Profile page  
- Transfer money menu  
- Delete Car functionality  
- Delete Offer functionality  
- Buy Car from offer functionality  
- Edit Offer page  
- Edit User Profile menu  
- Add Comment functionality  
- Offer Comments page  
- Edit Car page  

### Dynamic pages  
- Collection page - made with flex-box, data is sorted by forSale property  
- Car Details page - includes car info, edit car menu, sell car menu, delete car functionality  
- My Offers page - made with flex-box, displays all active offers for the current user ordered descending by date of creation  
- Offers page - made with flex-box, offers ordered descending by date of creation and has pagination  
- Offer Details page - includes offer info, picture toggle by click, edit offer menu, delete offer functionality, buy car from offer functionality, link to comments page  
- Offer Comments page - shows all comments (most recent first) for the current offer, add comment functionality  
- Profile page - displays user info, has transfer money menu, edit menu  

## 5.Bonuses  
I think my Cloudinary picture upload counts as a bonus - Use a file storage cloud API, e.g. Dropbox, Google Drive or other for storing the files.  
