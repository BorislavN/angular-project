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

### Future functionality and pages:  
- Edit Car page  
- Delete Car functionality  
- Edit Offer page  
- Delete Offer functionality  
- Offer Comments page  
- Add Comment functionality  
- Edit User Profile menu  
- Buy Car from offer functionality  

## 4.Bonuses  
I think my Cloudinary picture upload counts as a bonus - Use a file storage cloud API, e.g. Dropbox, Google Drive or other for storing the files.  

## 5.Finally  
I'll continue working on the project. Hopefully by the time of the Project Defence i'll be done with most of the TODO-s.  

