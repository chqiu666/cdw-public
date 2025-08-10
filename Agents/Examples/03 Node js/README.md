# Node.js Foundation Tutorial

This tutorial will introduce you to Node.js, explain why it's essential for modern web development, and teach you the basic functions you'll need to work with it effectively.

## What is Node.js?

Node.js is a **JavaScript runtime environment** that allows you to run JavaScript code outside of a web browser. It's built on Chrome's V8 JavaScript engine and enables you to:

- **Run JavaScript on the server** (backend development)
- **Build command-line tools** and utilities
- **Create desktop applications** using frameworks like Electron
- **Develop APIs** and web services
- **Handle file system operations** and database connections
- **Manage packages** and dependencies

## Why Do We Need Node.js?

### 1. **JavaScript Everywhere**
Before Node.js, JavaScript was limited to browsers. Now you can use the same language for both frontend and backend development.

### 2. **Fast and Scalable**
Node.js uses an **event-driven, non-blocking I/O model**, making it perfect for:
- Real-time applications (chat apps, gaming)
- APIs that handle many concurrent requests
- Data-intensive applications

### 3. **Rich Ecosystem**
Node.js has the largest package ecosystem (npm) with over 1.5 million packages for:
- Web frameworks (Express, Koa)
- Database drivers (MongoDB, PostgreSQL)
- Authentication libraries
- File processing tools
- And much more

### 4. **Modern Development**
Node.js enables modern development practices:
- **Package management** with npm/yarn
- **Build tools** and bundlers
- **Development servers** and hot reloading
- **Testing frameworks**

## Prerequisites

Before starting, you should have:
- Basic knowledge of JavaScript
- Familiarity with command line/terminal
- A text editor (VS Code, Sublime Text, etc.)

## Installation

### For Windows Users

1. **Download Node.js**
   - Go to [nodejs.org](https://nodejs.org)
   - Download the **LTS** (Long Term Support) version
   - Run the installer (.msi file)

2. **Verify Installation**
   Open Command Prompt or PowerShell and run:
   ```bash
   node --version
   npm --version
   ```

3. **Optional: Install Git Bash**
   - Download Git for Windows from [git-scm.com](https://git-scm.com)
   - This gives you a Unix-like terminal experience

### For Mac Users

1. **Using Homebrew (Recommended)**
   ```bash
   # Install Homebrew first (if you don't have it)
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Alternative: Direct Download**
   - Go to [nodejs.org](https://nodejs.org)
   - Download the **LTS** version for macOS
   - Run the installer (.pkg file)

3. **Verify Installation**
   Open Terminal and run:
   ```bash
   node --version
   npm --version
   ```

## Your First Node.js Program

### Step 1: Create a Project Directory

**Windows (Command Prompt):**
```cmd
mkdir my-first-node-app
cd my-first-node-app
```

**Mac/Linux (Terminal):**
```bash
mkdir my-first-node-app
cd my-first-node-app
```

### Step 2: Create Your First File

Now you need to create a JavaScript file in your project directory. You can do this in several ways:

#### Option 1: Using Your Text Editor (Recommended)

1. **Open your text editor** (VS Code, Sublime Text, Notepad++, etc.)
2. **Create a new file** (File → New File)
3. **Save the file** as `hello.js` in your `my-first-node-app` folder
4. **Copy and paste** this code into the file:

```javascript
console.log("Hello, Node.js!");

// Get current date and time
const now = new Date();
console.log(`Current time: ${now.toLocaleString()}`);

// Simple calculation
const result = 2 + 2;
console.log(`2 + 2 = ${result}`);
```

5. **Save the file** (Ctrl+S on Windows, Cmd+S on Mac)

You should see the file listed and its contents displayed.

### Step 3: Run Your Program

**Windows:**
```cmd
node hello.js
```

**Mac/Linux:**
```bash
node hello.js
```

You should see output like:
```
Hello, Node.js!
Current time: 12/25/2023, 2:30:45 PM
2 + 2 = 4
```

## Congratulations! What Just Happened?

You just ran your first Node.js program! Let's break down what this means and why it's exciting:

### **What You Accomplished:**

1. **You ran JavaScript outside a browser** - Before Node.js, JavaScript only worked in web browsers
2. **You executed code on your computer** - Your computer processed and ran the JavaScript code
3. **You saw real-time output** - The program showed you the current time and performed calculations

### **Why This Matters:**

Think of it like this: **You just taught your computer to speak JavaScript!**

- **Before Node.js**: JavaScript was like a language that only worked in one room (the browser)
- **With Node.js**: JavaScript is now a language your entire computer understands

### **Real-World Analogy:**

Imagine you're learning to cook:
- **HTML/CSS** = Learning to read recipes and decorate plates
- **Browser JavaScript** = Learning to cook in a specific kitchen (the browser)
- **Node.js** = Learning to cook anywhere - your kitchen, a friend's kitchen, or even a restaurant kitchen!

### **What This Enables:**

Now that you can run JavaScript on your computer, you can:

- **Build websites** that work behind the scenes (backend)
- **Create tools** that help you automate tasks
- **Build apps** that don't need a browser
- **Connect to databases** and work with data
- **Create APIs** that other applications can use

### **The Big Picture:**

You're learning to become a **full-stack developer** - someone who can build both:
- **Frontend** (what users see in the browser)
- **Backend** (the behind-the-scenes logic that makes everything work)

This is like learning to build both the front door and the entire house behind it!

## Understanding Client-Side vs Server-Side

Now that you understand what Node.js is, let's explore the key concept that makes it so powerful: **the difference between client-side and server-side code**.

### **What is Client-Side Code?**

**Client-side code** runs in the user's browser (like Chrome, Firefox, Safari):
- **HTML**: Structure of the webpage
- **CSS**: Styling and appearance
- **JavaScript**: Interactivity and user experience

**Think of it like this**: Client-side code is like the furniture and decorations in a house - it's what visitors see and interact with.

### **What is Server-Side Code?**

**Server-side code** runs on a computer somewhere else (a server) and handles the "behind-the-scenes" work:
- **Processing data** from users
- **Connecting to databases** to store/retrieve information
- **Performing calculations** that shouldn't happen in the browser
- **Handling sensitive operations** (like API keys and passwords)
- **Serving web pages** to users

**Think of it like this**: Server-side code is like the kitchen, electrical system, and plumbing - it's the infrastructure that makes everything work, but visitors don't see it directly.

### **Why Do We Need Both?**

Imagine you're building a social media app:

**Client-Side (Browser)**:
- User types a post and clicks "Share"
- The page looks nice and responds to clicks
- Shows the post immediately

**Server-Side (Node.js)**:
- Receives the post data from the browser
- Saves it to a database
- Sends it to other users
- Handles user authentication
- Manages API keys securely

### **The Problem with Client-Side Only**

In our previous tutorials, we put API keys directly in the browser code. This is like leaving your house keys under the doormat - anyone can find them!

**What happens when API keys are in the browser:**
- Anyone can open browser tools and see your secret keys
- They can use your keys to make API calls
- You might get charged for their usage
- No way to control who uses your API

### **The Solution: Server-Side Code**

With Node.js, we can:
- **Keep API keys secure** on the server
- **Control who can access** our APIs
- **Monitor usage** and prevent abuse
- **Perform complex operations** that shouldn't happen in the browser

## Where We're Going: Firebase Functions

In **Tutorial 4: Firebase Functions**, you'll learn about **Firebase Cloud Functions** - a way to run Node.js code in the cloud without managing servers yourself. This is where you'll apply everything you've learned about Node.js to build secure, production-ready applications.

### **What are Firebase Functions?**

Firebase Functions are like having a **server in the cloud** that:
- Runs your Node.js code automatically
- Handles requests from your website
- Keeps your API keys secure
- Scales automatically as more people use your app

### **The Complete Picture:**

```
User clicks button → Browser sends request → Firebase Function → API call → Response → User sees result
```

**Instead of:**
```
User clicks button → Browser makes API call directly (with exposed keys) → User sees result
```

### **Why This Matters for Your Projects:**

1. **Security**: API keys stay on the server, not in the browser
2. **Control**: You decide who can use your APIs
3. **Monitoring**: Track usage and prevent abuse
4. **Scalability**: Handle thousands of users without managing servers
5. **Professional**: This is how real applications work

### **Real-World Example:**

Think of it like a restaurant:
- **Client-side** = The dining room where customers sit and order
- **Server-side** = The kitchen where food is prepared and bills are calculated
- **Firebase Functions** = A professional kitchen service that handles all the cooking for you

You focus on creating a great dining experience (your website), while the kitchen service (Firebase) handles all the complex cooking (server operations) behind the scenes.

## Basic Node.js Functions and Concepts

### 1. **File System Operations**

Node.js can read, write, and manipulate files on your computer.

#### Reading Files

Create `read-file.js`:

```javascript
const fs = require('fs');

// Read a file synchronously
try {
  const data = fs.readFileSync('hello.js', 'utf8');
  console.log('File contents:');
  console.log(data);
} catch (error) {
  console.error('Error reading file:', error.message);
}

// Read a file asynchronously (recommended)
fs.readFile('hello.js', 'utf8', (error, data) => {
  if (error) {
    console.error('Error reading file:', error.message);
    return;
  }
  console.log('File contents (async):');
  console.log(data);
});
```

#### Writing Files

Create `write-file.js`:

```javascript
const fs = require('fs');

// Write a file synchronously
try {
  fs.writeFileSync('output.txt', 'Hello from Node.js!');
  console.log('File written successfully');
} catch (error) {
  console.error('Error writing file:', error.message);
}

// Write a file asynchronously
fs.writeFile('output-async.txt', 'Hello from Node.js (async)!', (error) => {
  if (error) {
    console.error('Error writing file:', error.message);
    return;
  }
  console.log('File written successfully (async)');
});
```

### 2. **Working with Directories**

Create `directory-operations.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Create a directory
fs.mkdir('my-folder', (error) => {
  if (error) {
    console.error('Error creating directory:', error.message);
    return;
  }
  console.log('Directory created successfully');
});

// List files in current directory
fs.readdir('.', (error, files) => {
  if (error) {
    console.error('Error reading directory:', error.message);
    return;
  }
  console.log('Files in current directory:');
  files.forEach(file => {
    console.log(`- ${file}`);
  });
});

// Check if file/directory exists
const filePath = 'hello.js';
if (fs.existsSync(filePath)) {
  console.log(`${filePath} exists`);
} else {
  console.log(`${filePath} does not exist`);
}
```

### 3. **HTTP Server**

Node.js excels at creating web servers. Create `simple-server.js`:

```javascript
const http = require('http');

// Create a simple HTTP server
const server = http.createServer((request, response) => {
  // Set response headers
  response.writeHead(200, { 'Content-Type': 'text/html' });
  
  // Send response
  response.end(`
    <html>
      <head>
        <title>My Node.js Server</title>
      </head>
      <body>
        <h1>Hello from Node.js!</h1>
        <p>Current time: ${new Date().toLocaleString()}</p>
        <p>Request URL: ${request.url}</p>
      </body>
    </html>
  `);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});
```

Run the server:
```bash
node simple-server.js
```

Then open your browser and go to `http://localhost:3000`

### 4. **Working with Environment Variables**

Create `environment-vars.js`:

```javascript
// Access environment variables
console.log('Node.js version:', process.version);
console.log('Current working directory:', process.cwd());
console.log('Platform:', process.platform);

// Set and access custom environment variables
process.env.MY_CUSTOM_VAR = 'Hello from environment!';
console.log('Custom variable:', process.env.MY_CUSTOM_VAR);

// Access command line arguments
console.log('Command line arguments:', process.argv);
```

### 5. **Timers and Scheduling**

Create `timers.js`:

```javascript
// setTimeout - run code after a delay
console.log('Starting timer example...');

setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

// setInterval - run code repeatedly
let counter = 0;
const interval = setInterval(() => {
  counter++;
  console.log(`Counter: ${counter}`);
  
  if (counter >= 5) {
    clearInterval(interval);
    console.log('Interval stopped');
  }
}, 1000);

// Immediate execution
setImmediate(() => {
  console.log('This runs immediately after current execution');
});

console.log('Timer example setup complete');
```

## Package Management with npm

### Initializing a Project

Create a new directory and initialize a Node.js project:

```bash
mkdir my-node-project
cd my-node-project
npm init
```

Follow the prompts, or use `npm init -y` to accept all defaults.

This creates a `package.json` file that tracks your project's dependencies and scripts.

### Installing Packages

```bash
# Install a package locally
npm install express

# Install a package globally
npm install -g nodemon

# Install a development dependency
npm install --save-dev jest
```

### Example: Using External Packages

Create `package.json`:

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Create `index.js`:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to my Node.js app!</h1>
    <p>This is served using Express.js</p>
  `);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    message: 'Echo response',
    data: req.body
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

Install dependencies and run:
```bash
npm install
npm start
```

## Common Node.js Patterns

### 1. **Error Handling**

```javascript
const fs = require('fs');

// Synchronous error handling
try {
  const data = fs.readFileSync('nonexistent.txt', 'utf8');
  console.log(data);
} catch (error) {
  console.error('Error:', error.message);
}

// Asynchronous error handling
fs.readFile('nonexistent.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log(data);
});

// Promise-based error handling
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('nonexistent.txt', 'utf8')
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error.message));
```

### 2. **Working with JSON**

```javascript
const fs = require('fs');

// Write JSON to file
const data = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
  hobbies: ['reading', 'coding', 'gaming']
};

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('JSON file written');

// Read JSON from file
try {
  const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  console.log('Loaded data:', jsonData);
  console.log('Name:', jsonData.name);
  console.log('Hobbies:', jsonData.hobbies.join(', '));
} catch (error) {
  console.error('Error reading JSON:', error.message);
}
```

### 3. **Command Line Arguments**

```javascript
// Access command line arguments
const args = process.argv.slice(2);
console.log('Arguments:', args);

// Simple command line interface
if (args.length === 0) {
  console.log('Usage: node script.js <command> [options]');
  console.log('Commands: hello, time, version');
} else {
  const command = args[0];
  
  switch (command) {
    case 'hello':
      const name = args[1] || 'World';
      console.log(`Hello, ${name}!`);
      break;
      
    case 'time':
      console.log('Current time:', new Date().toLocaleString());
      break;
      
    case 'version':
      console.log('Node.js version:', process.version);
      break;
      
    default:
      console.log('Unknown command:', command);
  }
}
```

## Development Tools

### 1. **Nodemon (Auto-restart)**

Install globally:
```bash
npm install -g nodemon
```

Use it to run your app:
```bash
nodemon app.js
```

Nodemon automatically restarts your application when files change.

### 2. **Debugging**

Add debugging to your code:

```javascript
// Simple debugging
console.log('Debug info:', { user: 'john', action: 'login' });

// Using debugger statement
function complexFunction() {
  let result = 0;
  
  for (let i = 0; i < 10; i++) {
    result += i;
    debugger; // Browser dev tools will pause here
  }
  
  return result;
}

// Run with debugging enabled
// node --inspect app.js
```

### 3. **Environment Variables**

Create `.env` file:
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
API_KEY=your-secret-key
```

Install dotenv:
```bash
npm install dotenv
```

Use in your code:
```javascript
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

console.log('Port:', port);
console.log('Database URL:', dbUrl);
```

## Best Practices

### 1. **Project Structure**
```
my-node-app/
├── package.json
├── README.md
├── .gitignore
├── .env
├── src/
│   ├── index.js
│   ├── routes/
│   ├── models/
│   └── utils/
├── public/
├── tests/
└── node_modules/
```

### 2. **Error Handling**
- Always handle errors in async operations
- Use try-catch for synchronous code
- Provide meaningful error messages
- Log errors appropriately

### 3. **Security**
- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate and sanitize user input
- Keep dependencies updated

### 4. **Performance**
- Use async operations when possible
- Implement proper caching
- Monitor memory usage
- Use streaming for large files

## Troubleshooting

### Common Issues

**"node: command not found"**
- Node.js not installed or not in PATH
- Restart terminal after installation
- Check installation with `node --version`

**"npm: command not found"**
- npm comes with Node.js
- Reinstall Node.js if npm is missing
- Check with `npm --version`

**"Permission denied"**
- On Mac/Linux, use `sudo` for global installations
- Check file permissions
- Use `chmod` to fix permissions

**"Port already in use"**
- Kill the process using the port
- Use a different port
- Check what's running on the port

### Debug Tips

- Use `console.log()` for debugging
- Check the terminal for error messages
- Use Node.js inspector for debugging
- Read the official Node.js documentation

## Next Steps

Now that you understand Node.js fundamentals, you're ready for:

### **Immediate Next Step: Tutorial 4 - Firebase Functions**
Apply your Node.js knowledge to build secure, cloud-based applications that keep API keys safe on the server side.

### **Future Learning Path:**
1. **Web Frameworks**: Express.js, Koa, Fastify
2. **Database Integration**: MongoDB, PostgreSQL, MySQL
3. **Authentication**: JWT, OAuth, Passport.js
4. **Testing**: Jest, Mocha, Chai
5. **Deployment**: Heroku, AWS, Vercel
6. **Real-time**: Socket.io, WebSockets
7. **Microservices**: Docker, Kubernetes

## Resources

- [Node.js Official Documentation](https://nodejs.org/docs)
- [npm Documentation](https://docs.npmjs.com)
- [Express.js Framework](https://expressjs.com)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Node.js Design Patterns](https://nodejsdesignpatterns.com)

---

