# Netflix-Inspired Video Streaming Platform

**Submitted by:**  
[Your Name]  
[Roll Number]  

**Department:**  
[Department Name]  

**College:**  
[College Name]  

**Academic Year:**  
2026

**Guide:**  
[Guide Name]

---

## 1. Abstract

With the increasing demand for on-demand digital entertainment, video streaming platforms have become an essential part of modern media consumption. This project presents the design and development of a Netflix-inspired video streaming platform that allows users to browse, view details, and play video content through a web-based interface.

The system is developed using modern web technologies and follows a full-stack architecture, integrating frontend, backend, and database components. Users can interact with the platform to explore content, while an admin panel enables dynamic management of movies. The project aims to demonstrate practical knowledge of web application development, RESTful APIs, and database integration in an academic environment.

---

## 2. Objectives

*   To develop a web-based video streaming application.
*   To implement user authentication and content browsing.
*   To integrate frontend and backend using REST APIs.
*   To manage video content dynamically using a database.
*   To understand full-stack application architecture.

---

## 3. Problem Statement

Traditional academic learning often lacks practical exposure to real-world application development. Building modern web platforms requires the integration of multiple technologies such as frontend frameworks, backend services, and databases.

The problem addressed in this project is the development of a functional video streaming platform that simulates the core features of commercial systems, enabling students to gain hands-on experience in designing, implementing, and managing a full-stack web application.

---

## 4. System Architecture

The system follows a three-tier architecture consisting of a frontend layer, backend layer, and database layer.

1.  **Frontend Layer**: Responsible for user interaction and presentation (React.js).
2.  **Backend Layer**: Handles application logic and API requests (Node.js/Express).
3.  **Database Layer**: Stores user and movie data (SQLite).

The frontend communicates with the backend through RESTful APIs, and the backend interacts with the database to fetch and store information.

*(Place System Architecture Diagram Here: User -> Frontend -> Backend -> Database)*

---

## 5. Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite |
| **Tools** | VS Code, Postman |

---

## 6. Module Description

### User Module
*   **Authentication**: Users can sign up and login securely.
*   **Browse Content**: Browse a categorized catalog of movies.
*   **View Details**: View description, rating, and year of movies.
*   **Play Video**: Watch the movie content via a built-in player.
*   **Watchlist**: Add movies to a personal "My List" for later viewing.

### Admin Module
*   **Content Management**: Add new movies with title, poster, and video links.
*   **Delete Content**: Remove outdated or incorrect movie entries.
*   **Library Control**: Maintain an up-to-date database of content.

---

## 7. Database Design

The database uses SQLite with the following tables:

1.  **Users Table (`users`)**: Stores user credentials (`id`, `name`, `email`, `password`, `role`).
2.  **Movies Table (`movies`)**: Stores movie metadata (`id`, `title`, `description`, `category`, `poster`, `video_url`).
3.  **Categories Table (`categories`)**: Stores genre information.
4.  **Watchlist Table (`watchlist`)**: Maps users to their saved movies (`id`, `user_id`, `movie_id`).

The database is designed to efficiently store and retrieve relational data for user preferences and content cataloging.

---

## 8. Future Scope

*   **Recommendation System**: Implement logic to suggest movies based on viewing history.
*   **Cloud Storage**: Move media assets to AWS S3 or Cloudinary for scalability.
*   **Advanced Security**: Implement OAuth (Google Login) and Two-Factor Authentication.
*   **Mobile App**: Develop a React Native version for mobile devices.
*   **Analytics Dashboard**: Provide admins with detailed views on most-watched content.

---

## 9. Screenshots

*(Insert Screenshots Here)*

*   **Fig 1**: Login Page
*   **Fig 2**: Home Page
*   **Fig 3**: Movie Details Page
*   **Fig 4**: Player Interface
*   **Fig 5**: Admin Panel

---

## 10. Conclusion

This project successfully demonstrates the development of a Netflix-inspired video streaming platform using a full-stack approach. The system integrates frontend, backend, and database components to deliver a functional and user-friendly application. Through this project, practical knowledge of web technologies and system design has been gained.
