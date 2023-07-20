# TIKTALK

This repository contains the client and server components of the **TIKTALK** application.

## Prerequisites

Before running the application on your local machine, make sure you have the following installed:

- Node.js (https://nodejs.org)
- npm (Node Package Manager, usually comes with Node.js installation)
- MongoDB (https://www.mongodb.com)


## Getting Started

Follow the steps below to set up and run the application on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tiktalk.git
cd tiktalk
```

### 2. Setup .env Files

In both the client and server folders, you will find a **.env.example** file. Create a copy of this file and name it **.env**.

For the Client:

```bash
cd client
cp .env.example .env
```

For the Server:

```bash
cd server
cp .env.example .env
```

### 3. Install Dependencies

For the Client:

```bash
cd ../client
npm install
```

For the Server:

```bash
cd ../server
npm install
```

### 4. Run the Application

For the Client:

```bash
npm run dev
```

For the Server:

```bash
npm start
```

The client application will run on **http://localhost:3000**, and the server will run on **http://localhost:8000**.
