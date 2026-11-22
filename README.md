# 🏡 Wanderlust – Property Rental Platform

Wanderlust is a full-stack property rental web application inspired by Airbnb. It allows users to explore different properties, create and manage property listings, and share their experiences through reviews.

The application provides user authentication, property management, category-based filtering, and a responsive interface for a smooth browsing experience.

## 🚀 Features

- **User Authentication:** Secure user registration and login using Passport.js.
- **Property Listings:** Create, view, edit, and delete property listings.
- **Search Functionality:** Search for properties based on keywords.
- **Category-Based Filtering:** Explore properties using different categories.
- **Review & Ratings:** Users can add and manage reviews for properties.
- **Session Management:** Persistent session storage using MongoDB.
- **Authorization:** Restrict listing and review management to authorized users.
- **Form Validation:** Server-side validation for user inputs.
- **Flash Messages:** Display success and error notifications.
- **Responsive Design:** User-friendly interface for different screen sizes.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript, Bootstrap, EJS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | Passport.js, Passport-Local |
| Session Management | Express-Session, Connect-Mongo |
| Template Engine | EJS, EJS-Mate |
| Other Tools | Git, GitHub, Method-Override |

## 📂 Project Structure

```text
MAJORPROJECT/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── utils/
│   ├── ExpressError.js
│   ├── wrapAsync.js
│   └── detectCategory.js
│
├── app.js
├── schema.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd MAJORPROJECT
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
```

Replace the placeholder values with your actual MongoDB Atlas connection string and a secure session secret.

### 5. Start the application

```bash
nodemon app.js
```

Or:

```bash
node app.js
```

### 6. Open in your browser

```text
http://localhost:8080
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| ATLASDB_URL | MongoDB Atlas connection string |
| SECRET | Secret key for session management |

**Important:** Never upload your `.env` file, database credentials, or private secrets to GitHub.

Add this to `.gitignore`:

```gitignore
node_modules/
.env
```

## 🎯 Project Objectives

- Build a full-stack web application using the MERN-related JavaScript ecosystem with EJS templating.
- Understand RESTful routing and MVC architecture.
- Implement authentication, authorization, and session management.
- Perform database operations using MongoDB and Mongoose.
- Develop responsive and user-friendly web interfaces.

## 👨‍💻 Author

**Himanshu Dhewle**

B.Tech Graduate – Artificial Intelligence & Data Science
- LinkedIn: www.linkedin.com/in/himanshudhewle
---

⭐ If you find this project interesting, feel free to explore the repository and give it a star!
