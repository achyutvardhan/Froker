# Money Lending Application Backend

## Overview
This is a backend for a money lending application, similar to apps like Slice and KreditBee. The backend is built using Node.js and MongoDB and provides several APIs for user signup, login, fetching user data, and borrowing money.

## Installation

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (>= 4.x)

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/money-lending-app-backend.git
    cd money-lending-app-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    Create a `.env` file in the root directory and add the following configuration:
    ```env
    MONGODB_URI=mongodb://localhost:27017/money_lending_app
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. **Start the server:**
    ```bash
    npm run dev
    ```

The server will be running on `http://localhost:5000`.

