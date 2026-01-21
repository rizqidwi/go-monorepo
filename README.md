# Go + Next.js Monorepo

This project is a monorepo containing a Go backend and a Next.js frontend.

## Structure

- `cmd/`: Go application entry point.
- `frontend/`: Next.js web application.
- `handlers/`, `middleware/`, `models/`, `config/`, `utils/`: Go backend packages.
- `package.json`: Root configuration for managing the monorepo and running global scripts.

## Prerequisites

- Go 1.25+
- Node.js & NPM

## Getting Started

1.  **Install Dependencies** (Root & Frontend):
    ```bash
    npm install
    ```

2.  **Run Development Server** (Runs both Go backend and Next.js frontend):
    ```bash
    npm run dev
    ```

    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:8080](http://localhost:8080)

## Go Dependency Management

This project uses Go Modules to manage backend dependencies.

- **`go.mod`**: Defines the project's module path and lists the specific versions of libraries (dependencies) used.
- **`go.sum`**: Contains checksums of the specific module versions to ensure security and integrity of downloaded code.

### Managing Backend Dependencies

If you add new imports or want to clean up unused dependencies, run:

```bash
go mod tidy
```

This command automatically updates `go.mod` and `go.sum` to match your code.

## API Documentation

The backend API runs on port 8080.
- `POST /login`: User login
- `GET /users`: Get all users (Protected)
- `POST /users`: Create user (Protected)
- `PUT /users/:id`: Update user (Protected)
- `DELETE /users/:id`: Delete user (Protected)

## Frontend Routes

The frontend application runs on port 3000.
- `/login`: Login page.
- `/register`: Registration page.
- `/users`: Dashboard to manage users (Protected, requires login).
