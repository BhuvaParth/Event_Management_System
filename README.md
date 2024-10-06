# Event_Management_System
## Overview

Event Management System is a responsive web application built with React, Tailwind CSS, and JSON server. The platform allows users to create, edit, delete, and view events with an intuitive user interface and user experience.

## Features

- Fully responsive design for optimal viewing on all devices
- User-friendly UI/UX for seamless navigation
- CRUD operations to manage events:
  - **Create** events
  - **Edit** existing events
  - **Delete** events
  - **View** event details including:
    - Date
    - Time
    - Location (with map integration)
    - Additional information
- User authentication:
  - Login and signup functionality to secure access to event management features
- Built with:
  - **React.js** for a dynamic front-end
  - **Tailwind CSS** for modern and responsive styling
  - **JSON Server** for a mock backend

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node (v12 or above)
- npm (Node package manager)

### Installation


#### Please Check must be your localhost:3001 for frontend

```bash
 npm install
 npm run start
```

## Start Json Server

### Please Check must be your localhost:3000 for json server

```bash
  npx json-server --watch db.json --port 3000
```