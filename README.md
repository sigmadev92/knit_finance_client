# Knit Finance Assignment Project

Deadline - 4th January 2026

## Taskment - Task Management Prototype API

- UI for Task management API

## Table of Content

0. Quick Links
1. Features
2. Tech Stack
3. Requirements
4. Start commands
5. Folder Structure
6. Environment variables
7. Future Enhancements

## Quick Links

```md
[Frontend github Link](https://github.com/sigmadev92/knit_finance_client)
[Server Github Link](https://github.com/sigmadev92/knit_finance-api)
[Deployed Frontend Link]
[Deployed Server Link] Not Deployed

sample data
user
email: user1@test.com
password: user1@Pass

admin
email: devyaniadmin@test.com
password : devyani@Pass
```

## Features

- Global State management using context
- Routing using react-router
- Separate dashboards for admin and user using dynamic routing
- Protected routes and role based routing
- Dark mode toggle
- Logout feature
- Customized elements - buttons, inputs, textarea
- Strong typechecking using Typescript
- Followed best design system approach

## Tech Stack

- Vite
- React
- TypeScript
- TailwindCSS
- React Router
- Lucide - for icons
- React-hot-toast - for custom toast alerts

## Requirements

Nodejs must be installed on your system
Vite requires Node.js version 20.19+ or 22.12+.

## Setup and Start Commands

### clone the repository

```bash
git clone https://github.com/sigmadev92/knit_finance_client frontend
```

### Install dependencies

```bash
cd frontend
npm install
```

### Run the development Server

```bash
npm run dev
```

## Folder Structure

```text
├───node_modules
├───public
└───src
    ├───App
    ├───assets
    ├───components
    │   ├───Footer
    │   ├───Navbar
    │   │   └───Right
    │   │       └───NavLinks
    │   └───ui
    ├───constants
    │   ├───objects
    │   └───urls
    ├───contextAPI
    │   ├───contexts
    │   └───providers
    ├───layouts
    ├───pages
    │   ├───About
    │   ├───Admin_dashboard
    │   │   └───Body
    │   │       └───Tasks
    │   │           └───History
    │   ├───Contact
    │   ├───Dashboard
    │   │   └───Right
    │   │       └───body
    │   │           └───Tasks
    │   ├───ForgotPassword
    │   ├───Home
    │   ├───Login
    │   └───Register
    └───types
```

## Environmant Variables

```js
VITE_backendURL - base URL of API
```

## FUture Enhancements

- Can USe web sockets for live notifications
- Admins can assign task to users
- Admin must give a explanantion on their verification
- New collection for keeping Verified Tasks
