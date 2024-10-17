# Django and React Project

The project consists of two directories: 

- `frontend`: Contains the React application
- `backend`: Contains the Django backend

## Installation

To run this project on your local machine, follow the steps below:

### Prerequisites

Ensure you have the following installed on your local machine:

- Python 3.8 or higher
- Node.js v14.15.0 or higher
- npm 6.14.9 or higher

#Setup
1. Install and set up a local programming environment for Python 3

2. Install Node.js and Create a Local Development Environment.

### Server

1. Navigate to the `server` directory:
    ```
    cd ../backend
    ```
2. Install Django and other dependencies:

   
    python manage.py runserver

### Client

1. Navigate to the `frontend` directory:
    ```
    cd ../frontend
    ```
2. Install all the dependencies:
    ```
    npm install
    ```
3. Run the client:
    ```
    npm start
    ```

Now, your application should be running at `localhost:3000`.

Note:
- The Django server should be running at the same time as the React application for the system to function properly.
- The application uses the email field instead of the username field for user identification.
