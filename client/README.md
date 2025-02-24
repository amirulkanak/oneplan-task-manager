# onePlan

## Description
onePlan is a web application that allows users to create and manage their own personal plans. Users can create plans, add tasks to plans, and mark tasks as complete.

## Technologies
- React
- Node.js
- Express
- MongoDB
- Mongoose
- Tailwind CSS
- Axios
- Firebase
- Firebase Admin SDK
- tanstack query for real-time updates

## Key Features
- User authentication
- Create tasks
- Mark tasks as complete
- Delete tasks
- Edit tasks
- Task priority management
- Drag and drop tasks for reordering
- Real-time updates

## Installation
1. Clone the repository
2. Navigate to the client and server directory
```bash
cd client
```
```bash
cd server
```
3. Install dependencies
```bash
npm install
```
4. .env file
- Create a .env.local in client file in the root directory
- Add the following environment variables
```
# firebase config 
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id

# backend api
VITE_API_URL=your-backend-api-url
```
- Create a .env file in server file in the root directory
- Add the following environment variables
```
# front end url
FRONTEND_URLS=your-frontend-url
# mongodb connection string
MONGODB_URI=your-mongodb-uri
# firebase service account key
FIREBASE_SERVICE_ACCOUNT_KEY=your-firebase-service-account-key
```
4. Start the development server
```bash
npm start
```
## Live Project
[onePlan](https://oneplan-amirulkanak.web.app/)