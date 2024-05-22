# Flat share System Server

This server involves creating a Flat share system using TypeScript and Express.js, with Prisma ORM for database interaction, specifically with a PostgreSQL database. Authentication is handled through JSON Web Tokens (JWT). The system is designed around five main models: User, Flat, Booking, and UserProfile, each with specific fields such as ids, names, timestamps, and relationships to other models.

## Server Live Link

### https://lostfoundserver.vercel.app/

## Run the server application locally

- Clone this repository: `git clone <repository_url>`
- Install dependencies: `npm install`
- Set up the environment variables by creating a `.env` file.
- Run the database migrations: `npx prisma migrate dev`
- Start the server: `npm start`

## Server API Documentation

1. User Registration

- Endpoint: POST `/api/register`

2. User Login

- Endpoint: POST `/api/login`

3. Add a Flat

- Endpoint: POST `/api/flats`

4. Get Paginated and Filtered Flats

- Endpoint: GET `/api/flats`

5. Update Flat Information

- Endpoint: PUT `/api/flats/:flatId`

6. Flat Booking Request

- Endpoint: POST `/api/booking-applications`

7. Get Booking Requests

- Endpoint: GET `/api/booking-requests`

8. Update Booking Flat Application Status

- Endpoint: PUT `/api/booking-requests/:bookingId`

9. Get User Profile

- Endpoint: GET `/api/profile`

10. Update User Profile

- Endpoint: PUT `/api/profile`
