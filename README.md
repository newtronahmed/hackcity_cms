# Content Management System (CMS) API

Welcome to the documentation for the REST API of our Content Management System (CMS). This API provides endpoints for managing posts, categories, users, and includes real-time monitoring for administrators.
Introduction
Welcome to the API documentation for Hackcity CMS. This API provides endpoints to manage and retrieve posts. Please follow the guidelines below to make successful requests.



https://hackcitycms-e8e8b5dada74.herokuapp.com/api/v1/posts
Endpoints
1. Get All Posts
URL: /
Method: GET
Description: Retrieve all posts.
Example:
bash



curl https://hackcitycms-e8e8b5dada74.herokuapp.com/api/v1/posts
2. Get One Post
URL: /:id
Method: GET
Description: Retrieve a specific post by its ID.
Parameters:
id (string): The unique identifier of the post.
Example:
bash

Copy code

curl https://hackcitycms-e8e8b5dada74.herokuapp.com/api/v1/posts/123
3. Create New Post
URL: /
Method: POST
Description: Create a new post.
Request Body:
Include the necessary parameters in the request body.
Example:
bash



curl -X POST -H "Content-Type: application/json" -d '{"title": "New Post", "content": "This is a new post."}' https://hackcitycms-e8e8b5dada74.herokuapp.com/api/v1/posts
4. Delete One Post
URL: /:id
Method: DELETE
Description: Delete a specific post by its ID.
Parameters:
id (string): The unique identifier of the post.
Example:
bash



curl -X DELETE https://hackcitycms-e8e8b5dada74.herokuapp.com/api/v1/posts/123
5. Update One Post
URL: /:id
Method: PATCH
Description: Update a specific post by its ID.
Parameters:
id (string): The unique identifier of the post.
Request Body:
Include the fields to be updated in the request body.
Example:
bash


curl -X PATCH -H "Content-Type: application/json" -d '{"title": "Updated Post"}' https://hackcitycms-e8e8b5dada74.herokuapp.com/api/v1/posts/123

## SWAGGER DOCS
src

### 1. API Prefix

All routes follow the convention: `/api/v1/{route_name}`.

Example routes:
- `https://{{base_url}}/api/v1/user/login`
- `https://{{base_url}}/api/v1/posts`

### 2. Bearer Token Authentication

To access protected routes, a valid bearer token must be provided. We implement social login (Twitter, Google, Facebook) using PassportJS. The token includes the user_uuid as a claim.

### 3. User Endpoint (CRUD)

This endpoint handles CRUD operations for users and includes the following features:

- Register/login/logout
- Forgot/reset password
- Listing all user posts

**Note:** Operations are restricted to the currently logged-in user. User A cannot access or modify data belonging to User B.

### 4. Forgot/Reset Password

This endpoint manages the forgot and reset password feature:

- Users can request a token to reset their password.
- A unique token is generated for each user (only one token per user at a time).
- After a successful password update, the token is deleted.

### 5. Categories and Post Endpoint (CRUD)

This endpoint handles CRUD operations for categories and posts.

### 6. Admin Endpoint (Real-time Dashboard)

This endpoint, built with socket, enables administrators to monitor system activities in real-time.

## User Stories

### 1. API Prefix

As a developer, I need a standardized API routing prefix for better organization and clarity.

### 2. Bearer Token Authentication

As a security-conscious developer, I want protected routes with Bearer Token authentication to ensure authorized access.

### 3. User Endpoint (CRUD)

As a user, I want to register, log in, log out, and manage my posts securely. I should only be able to access and modify my own data.

### 4. Forgot/Reset Password

As a forgetful user, I want a secure and straightforward process to reset my password if needed.

### 5. Categories and Post Endpoint (CRUD)

As a content creator, I want to manage categories and posts efficiently through the API.

### 6. Admin Endpoint (Real-time Dashboard)

As an administrator, I want to monitor system activities in real-time using a dashboard built with socket.

## Getting Started

To use the API, follow these steps:

1. Obtain a valid bearer token through social login.
2. Use the token to access protected routes.
3. Follow the API documentation for specific endpoints and their functionalities.

Feel free to reach out for any additional support or clarification. Happy coding!
