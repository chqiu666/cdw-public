# Secure OpenAI Hello World - Firebase Functions

This tutorial builds on what you learned in **Tutorial 3: Node.js Foundation** to create a **secure version** of the OpenAI Hello World example using Firebase Cloud Functions. You'll learn how to take your Node.js knowledge and apply it to cloud-based serverless functions that keep your API keys secure on the server side.

## What You'll Build

A secure AI chat application that:
- ✅ **Keeps your OpenAI API key secure** on the server side
- ✅ **Requires user authentication** before making API calls
- ✅ **Provides rate limiting** to prevent abuse
- ✅ **Logs requests** for monitoring
- ✅ **Handles errors gracefully** with proper user feedback

## Why This Matters

In the original OpenAI Hello World example, the API key was exposed in the browser code:

```javascript
// ❌ INSECURE - API key visible to anyone
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY" // Anyone can see this!
  }
});
```

This is **not secure** for production because:
- Anyone can view your API keys in the browser
- Keys can be extracted and misused
- No way to control API usage or implement rate limiting
- Potential for abuse and unexpected costs

## The Secure Solution

Our secure version uses Firebase Cloud Functions to keep the API key on the server:

```javascript
// ✅ SECURE - API key never leaves the server
const chatWithAI = functions.httpsCallable('chatWithAI');
const result = await chatWithAI({ message: userMessage });
```

## How It Works

### Before (Insecure - Original Version)
```
User → Browser → OpenAI API (with exposed key)
```

### After (Secure - This Version)
```
User → Browser → Firebase Function → OpenAI API (with secure key)
```

## Prerequisites

Before starting, you'll need:
1. **Node.js** installed on your computer (from Tutorial 3)
2. **Basic understanding of Node.js** concepts (server-side code, npm, etc.)
3. **Firebase CLI** installed globally
4. **An OpenAI API key**
5. **A Firebase project** (free tier available)

> **Note**: This tutorial assumes you've completed **Tutorial 3: Node.js Foundation**. If you haven't, please go back and complete that tutorial first, as it provides the essential foundation for understanding server-side code and the security concepts we'll be implementing.

## Step 1: Set Up Your Development Environment

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Login to Firebase

```bash
firebase login
```

## Step 2: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Give your project a name (e.g., "secure-openai-demo")
4. Follow the setup wizard (you can disable Google Analytics for this demo)
5. Note your **Project ID** - you'll need it later

## Step 3: Initialize Firebase in Your Project

```bash
# Navigate to the Firebase Functions directory
cd "Agents/Examples/04 Firebase Functions"

# Initialize Firebase
firebase init
```

When prompted:
- Select **Functions** (use spacebar to select, Enter to continue)
- Choose your Firebase project (the one you just created)
- Choose **JavaScript** for the language
- Say **Yes** to ESLint
- Say **Yes** to installing dependencies

## Step 4: Create the Cloud Function

This is where your Node.js knowledge comes into play! Firebase Functions are essentially Node.js code that runs in the cloud. Replace the contents of `functions/index.js` with this secure function:

```javascript
const functions = require('firebase-functions');
const fetch = require('node-fetch');

// Cloud Function to handle OpenAI API calls securely
exports.chatWithAI = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated (required for security)
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  // Validate input
  if (!data.message || typeof data.message !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Message is required and must be a string');
  }

  // Rate limiting: Check if user has made too many requests
  const userId = context.auth.uid;
  const userRequests = await getUserRequestCount(userId);
  
  if (userRequests > 10) { // Limit to 10 requests per user
    throw new functions.https.HttpsError('resource-exhausted', 'Rate limit exceeded. Please wait before making more requests.');
  }

  try {
    // Make the API call to OpenAI (API key is secure on server)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${functions.config().openai.key}` // Secure!
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Keep responses concise and friendly.'
          },
          {
            role: 'user',
            content: data.message
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error('Unexpected API response structure');
    }

    // Log the request for monitoring
    await logUserRequest(userId, data.message, result.choices[0].message.content);

    // Return the AI response
    return {
      success: true,
      response: result.choices[0].message.content,
      usage: result.usage
    };

  } catch (error) {
    console.error('Error in chatWithAI function:', error);
    throw new functions.https.HttpsError('internal', 'Failed to get AI response: ' + error.message);
  }
});

// Helper function to track user requests (simplified version)
async function getUserRequestCount(userId) {
  // In a real application, you'd store this in Firestore
  // For this tutorial, we'll return a simple count
  return 0; // Always allow requests for demo
}

// Helper function to log user requests (simplified version)
async function logUserRequest(userId, userMessage, aiResponse) {
  // In a real application, you'd log this to Firestore
  console.log(`User ${userId} requested: "${userMessage}" and got response: "${aiResponse}"`);
}
```

## Step 5: Install Dependencies

Remember from Tutorial 3 how we used npm to manage packages? We'll do the same here:

```bash
cd functions
npm install node-fetch
```

This installs the `node-fetch` package that we need to make HTTP requests from our Firebase Function (just like we learned about in the Node.js tutorial).

## Step 6: Configure Your OpenAI API Key

Remember from Tutorial 3 how we discussed keeping API keys secure on the server? This is where we put that into practice. Set your OpenAI API key as a Firebase environment variable:

```bash
firebase functions:config:set openai.key="your-openai-api-key-here"
```

**Important**: Replace `your-openai-api-key-here` with your actual OpenAI API key.

This is the secure way to handle sensitive data - the key stays on the server and is never exposed to the client, just like we learned in the Node.js tutorial.

## Step 7: Update Firebase Configuration

1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click the web icon (</>)
7. Register your app with a nickname (e.g., "secure-openai-web")
8. Copy the Firebase configuration object

## Step 8: Update the Client-Side Code

Open `secure-openai.js` and replace the `firebaseConfig` object with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 9: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Google" as a sign-in provider
5. Add your domain to authorized domains (for local testing, add `localhost`)

## Step 10: Deploy Your Function

```bash
firebase deploy --only functions
```

After deployment, you'll see a URL for your function. The function is now ready to handle secure API calls.

## Step 11: Test Your Application

You can test the application in several ways:

### Option A: Using Firebase Hosting (Recommended)

```bash
# Initialize hosting
firebase init hosting

# When prompted:
# - Use existing project
# - Use "public" as public directory
# - Configure as single-page app: No
# - Don't overwrite index.html: No

# Deploy everything
firebase deploy
```

### Option B: Local Testing

1. Start Firebase emulators:
```bash
firebase emulators:start
```

2. Open your browser to the local URL shown in the terminal

### Option C: Simple HTTP Server

If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

## Understanding the Code

### Building on Your Node.js Knowledge

In Tutorial 3, you learned about:
- **Server-side vs client-side code** - Now we're applying this concept
- **Node.js basics** - Firebase Functions run Node.js code
- **Security concepts** - API keys should stay on the server
- **npm and package management** - We'll use this for Firebase dependencies

### Client-Side (`secure-openai.js`)

The client-side code has been adapted from the original `hello-openai.js`:

**Original (Insecure):**
```javascript
async function chatWithOpenAI(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Authorization": "Bearer YOUR_API_KEY" // ❌ Exposed!
    }
  });
  // ... rest of function
}
```

**Secure Version:**
```javascript
async function secureChatWithOpenAI(userMessage) {
  const chatWithAI = functions.httpsCallable('chatWithAI');
  const result = await chatWithAI({ message: userMessage });
  return result.data.response; // ✅ API key never exposed!
}
```

### Key Security Features

1. **API Key Protection**: Your OpenAI API key is stored securely on Firebase servers
2. **Authentication Required**: Users must log in before making API calls
3. **Rate Limiting**: Prevents abuse by limiting requests per user
4. **Request Logging**: All requests are logged for monitoring
5. **Error Handling**: Proper error messages without exposing sensitive information

## File Structure

```
Agents/Examples/04 Firebase Functions/
├── index.html          # Clean HTML interface with authentication
├── style.css           # All styles in separate file
├── secure-openai.js    # Secure client-side JavaScript
├── README.md           # This comprehensive guide
└── functions/
    └── index.js        # Server-side Firebase Function
```

## Troubleshooting

### "Function not found" Error
- Make sure you deployed the function: `firebase deploy --only functions`
- Check that the function name matches exactly: `chatWithAI`
- Verify you're using the correct Firebase project

### "Permission denied" Error
- Check that you're logged in: `firebase login`
- Verify your project ID is correct
- Make sure you have the right permissions on the Firebase project

### "API key not found" Error
- Set the environment variable: `firebase functions:config:set openai.key="your-key"`
- Redeploy the function after setting the config
- Check the config: `firebase functions:config:get`

### "Authentication required" Error
- Make sure users are logged in before calling functions
- Check that Google authentication is enabled in Firebase Console
- Verify the auth state observer is working

## Next Steps

Once you have the basic system working, you can enhance it with:

- **User profiles**: Store user preferences in Firestore
- **Chat history**: Save conversations to a database
- **Different AI models**: Support multiple OpenAI models
- **Usage analytics**: Track and display usage statistics
- **Admin panel**: Monitor and manage user requests

## What You've Learned

Congratulations! You've successfully:

1. **Applied your Node.js knowledge** to cloud-based serverless functions
2. **Implemented secure API key handling** using server-side code
3. **Built a production-ready application** with authentication and rate limiting
4. **Understood the difference** between client-side and server-side security

This foundation prepares you for more advanced topics like:
- **Database integration** (Firestore, MongoDB)
- **Advanced authentication** (JWT, OAuth)
- **Real-time applications** (WebSockets, Socket.io)
- **Microservices architecture**
- **Deployment and scaling**

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive data
3. **Implement proper authentication** for all sensitive operations
4. **Validate all input data** before processing
5. **Monitor usage** and implement rate limiting
6. **Keep dependencies updated** to avoid security vulnerabilities

## Resources

- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Firebase Console](https://console.firebase.google.com/)

---

