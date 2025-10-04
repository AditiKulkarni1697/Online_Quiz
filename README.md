# Online_Quiz
Online quiz : take quiz and get score instantly on different topics


This project is a Node.js backend for an online quiz application. It uses Express for routing and middleware, and MongoDB (via Mongoose) for data storage. The application allows users to register, log in, take quizzes, submit answers, and receive instant scores. It supports user roles (user/admin), quiz and question management, and includes validation, authentication, and rate limiting for security. The codebase is organized into controllers, models, services, middleware, and routes for modularity and maintainability.

Prerequisites
Node.js (v14 or higher)
npm (comes with Node.js)
MongoDB (local or cloud instance)


Steps
1.Clone the repository
    git clone <repository-url>
    cd Online_Quiz

2.Install dependencies
    npm install

3.Configure environment variables

    Create a .env file in the root directory.
    Add the following variables :

    MONGODB_URI=
    JWT_SECRET=
    PORT=

4. Run the Application 
    npm run start

5. Run the tests
    npm test

Assumptions:

0. There are 3 types of questions: multiple choice questions, single choice questions, text   based questions
1. Multiple choice questions and single choice questions will have exact 4 options
2. Multiple choice questions will have one or more than one correct answers
3. Single Choice questions will have exact one correct answer
4. There are two roles : user and admin
5. Admin can create quiz
6. Only admin who created quiz can add questions to that quiz

- testcases
- video recording 