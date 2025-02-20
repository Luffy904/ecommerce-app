# E-commerce App

A cross-platform e-commerce application with Expo React Native frontend and Spring Boot backend, featuring product listing, details, and addition with JWT authentication and PostgreSQL database.

## Features
- **Frontend**: Product List, Detail, and Add screens (React Native with Expo)
- **Backend**: REST APIs (`GET /products`, `GET /products/{id}`, `PUT /products`) with Spring Boot
- **Auth**: JWT-based with VIEW (list/detail) and EDIT (add) roles
- **Database**: PostgreSQL

Tools Used :
VS Code,Sts,pgAdmmin 

## Prerequisites
- Node.js & npm
- Java 17+, Maven
- PostgreSQL
- Expo CLI (`npm install -g expo-cli`)

## Setup

### Backend
1. Configure `application.properties`:
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce
spring.datasource.username=your_user
spring.datasource.password=your_pass
jwt.secret=your_secret_key




Usage
Register: POST /auth/register with {"username": "editor", "password": "pass123", "roles": ["ROLE_VIEW", "ROLE_EDIT"]}
Login: Use app login screen with credentials
Add Product: Visible for ROLE_EDIT users on Product List screen
Troubleshooting

Unit Tests: Run mvn test (backend) and npm test (frontend) for 80% coverage
Notes
Runs on http://localhost:8081 (web) or Expo Go (mobile)
Roles must include ROLE_ prefix (e.g., ROLE_EDIT)
