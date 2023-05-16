# cereol
Login Form
Logout API:

Setup the project:


 I followed mvc structure for building project 

Initialize a new Node.js project using a package manager like npm or Yarn.
Install the necessary dependencies, including Express.js, Passport.js, and any other libraries or middleware we may require.
Database setup:

Choose a suitable database system (e.g., MongoDB) and set up the database connection.
Define the necessary database models and schemas to represent the data for users, addresses, and other entities.
Register API:

Create a route for the registration endpoint (e.g., /register) in your Express application.
Implement the registration logic by validating the input fields (Email, Name, Gender, Password), hashing the password, and saving the user details in the database.
Login API:

Configure Passport.js for authentication in your Node.js application.
Create a route for the login endpoint (e.g., /login) in your Express application.
Use Passport.js middleware to authenticate the user based on the provided credentials.
Generate and return a token (e.g., JWT) to the client upon successful authentication.
User Profile APIs:

Create routes for viewing and updating user profiles (e.g., /profile, /profile/update) in your Express application.
Implement the logic to retrieve and update the user profile information, including fields like Name, Gender, and profile picture.
For updating the profile picture, consider using a file upload mechanism and store the uploaded file securely.
Change Password API:

Create a route for the change password endpoint (e.g., /change-password) in your Express application.
Implement the logic to validate the current password, hash the new password, and update the user's password in the database.
Address Book CRUD APIs:

Create routes for performing CRUD operations on the address book (e.g., /address, /address/:id) in your Express application.
Implement the necessary endpoints to create, read, update, and delete addresses in the address book.
Consider validating the input fields (Title, Address line 1, Address Line 2, Country, State, City, pincode) and handle the multiple address addition and single address update scenarios.





//app.use(passport.initialize());

// Configure LocalStrategy for login
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email', // Assuming the email field is used for authentication
//       passwordField: 'password', // Assuming the password field is named "password"
//     },
//     async function (email, password, done) {
//       try {
//         // Find the user in the database based on the provided email
//         const user = await userModel.findOne({ email: email });

//         // If the user does not exist or the password is incorrect, return false
//         if (!user || user.password !== password) {
//           return done(null, false);
//         }

//         // If the user is found and the password is correct, return the user object
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );   


this was my first 