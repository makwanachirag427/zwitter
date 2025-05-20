# Zwitter

Zwitter is a full-stack social media web application inspired by Twitter. It allows users to register, login, post tweets, follow other users, and interact with posts in real-time.

![Screenshot (128)](https://github.com/user-attachments/assets/07eb34bd-a86e-48ba-9086-7a9ec80d5ed3)


## Features

- User authentication (sign up, login, logout)
- Create, edit, and delete tweets/posts
- Follow and unfollow users
- Like and comment on tweets
- Real-time updates
- Responsive UI for both desktop and mobile

## Tech Stack

- **Frontend:** React.js, TanStack Query, Tailwind css
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or cloud instance)
- Git

```bash
## 📦 Installation

Follow the steps below to run the project locally:


# 1. Clone the repository
git clone https://github.com/makwanachirag427/vibeflix-app.git
cd vibeflix-app

# 2. Install dependencies
npm install

# 3. Set up backend environment variables
# Create a .env file in the root folder 'vibeflix-app' and add the following:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# NODE_ENV=development

# 4. Start the backend server
npm run dev

# 5. Open a new terminal and install frontend dependencies
cd ../frontend
npm install

# 6. Start the frontend app
npm start
