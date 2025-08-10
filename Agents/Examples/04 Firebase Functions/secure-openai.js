// Secure OpenAI Hello World Example - Using Firebase Functions
// This version keeps the API key secure on the server side

// Firebase configuration - Replace with your Firebase config
const firebaseConfig = {
  // Replace with your Firebase config from Firebase Console
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const functions = firebase.functions();

// DOM elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authStatus = document.getElementById('auth-status');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const output = document.getElementById('output');

// Authentication state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    authStatus.textContent = `Authenticated as ${user.email}`;
    authStatus.className = 'status-indicator status-authenticated';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    userInput.disabled = false;
    sendBtn.disabled = false;
    output.textContent = 'Ready to chat! Type a message and press Send.';
    output.className = '';
  } else {
    // User is signed out
    authStatus.textContent = 'Not authenticated';
    authStatus.className = 'status-indicator status-not-authenticated';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    userInput.disabled = true;
    sendBtn.disabled = true;
    output.textContent = 'Please login to start chatting with AI...';
    output.className = '';
  }
});

// Login with Google
loginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch((error) => {
    console.error('Login error:', error);
    output.textContent = 'Login failed: ' + error.message;
    output.className = 'error';
  });
});

// Logout
logoutBtn.addEventListener('click', () => {
  auth.signOut().catch((error) => {
    console.error('Logout error:', error);
  });
});

// Secure function to chat with OpenAI (replaces the original chatWithOpenAI function)
async function secureChatWithOpenAI(userMessage) {
  try {
    // Call the Firebase Cloud Function instead of making direct API calls
    const chatWithAI = functions.httpsCallable('chatWithAI');
    const result = await chatWithAI({ message: userMessage });
    
    // Return the AI response from the secure server
    return result.data.response;
  } catch (error) {
    console.error('Error calling Firebase function:', error);
    
    // Handle different types of errors
    if (error.code === 'functions/unauthenticated') {
      throw new Error('Please login to use this feature');
    } else if (error.code === 'functions/resource-exhausted') {
      throw new Error('Rate limit exceeded. Please wait before trying again.');
    } else if (error.code === 'functions/invalid-argument') {
      throw new Error('Invalid message. Please try again.');
    } else if (error.details) {
      throw new Error(error.details);
    } else {
      throw new Error('Failed to get AI response. Please try again.');
    }
  }
}

// Send message to AI (adapted from the original button click handler)
sendBtn.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Disable input and show loading
  userInput.disabled = true;
  sendBtn.disabled = true;
  output.textContent = 'Thinking...';
  output.className = '';

  try {
    // Use the secure function instead of the original chatWithOpenAI
    const aiResponse = await secureChatWithOpenAI(userMessage);
    output.textContent = aiResponse;
    output.className = 'success';

    // Clear input
    userInput.value = '';

  } catch (err) {
    output.textContent = 'Error: ' + (err.message || err);
    output.className = 'error';
  } finally {
    // Re-enable input
    userInput.disabled = false;
    sendBtn.disabled = false;
  }
});

// Handle Enter key (same as original)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !sendBtn.disabled) {
    sendBtn.click();
  }
});

// Optional: Add some helpful console messages for debugging
console.log('Secure OpenAI Hello World loaded');
console.log('Firebase initialized:', firebase.app().name);
console.log('Authentication required before making API calls'); 