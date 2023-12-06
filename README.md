# Wink Front-End Integration Documentation

## Introduction

This documentation outlines the steps required to integrate Wink Login into a frontend application built with React and TypeScript. It is based on [Wink's official guide](https://docs.wink.cloud/docs/front-end-integration) and demonstrates implementing a login/logout button.

## Key Features

- Utilization of `useEffect` and `customHooks` in React.
- Login button that checks the authentication status of the user.
- Display of user information and logout button if the user is already authenticated.
- Enrollment and recognition process for unauthenticated users.

## Project Setup

### Wink Styles

- Wink styles are included in the `index.css` file.

### Global Variables

- Declaration of `WinkLogin` and `getWinkLoginClient` as global variables.

### Components

- Reusable button encapsulating the login/logout logic.
- Custom hook for initialization and handling user information.

## Directory Structure

- `public/`: Contains `silent-check-sso.html` and `wink.module.js`.
- `src/`: Source code of the React application.

## Usage Guide

### Installation

Install the project dependencies with the following command:

```javascript dark
npm install
```

### Execution

Start the application in development mode:

```javascript dark
npm run dev
```

Access the application at `http://localhost:3000`.

## Conclusion

This document provides an overview of integrating Wink Login into a React + Typescript application. Follow the mentioned steps for proper implementation.
