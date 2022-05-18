# student-api
We can use this api to manage a student database

# Add a .env file => 
  Add following: MONGO_URI,  JWT_SECRET, JWT_EXPIRES_IN

# Run following scripts =>
  npm install &&  npm start 

# Signup user with body{name, email, mobile, password}   [POST]
localhost:5000/api/v1/user/signup

# Login user with body {email,password}  [POST]
localhost:5000/api/v1/user/login

# After getting JWT token a "admin user" can use below routes and passing as Bearer to Authorization header 

# Get all user [GET]
localhost:5000/api/v1/user

# Update user with userId [PATCH]
localhost:5000/api/v1/user/:userId

# delete user with userId [DELETE]
localhost:5000/api/v1/user/:userId

# Creating a new student entry  [POST]
localhost:5000/api/v1/user/





