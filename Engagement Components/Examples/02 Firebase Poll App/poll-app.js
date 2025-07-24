// Firebase Poll App - Tutorial JavaScript
// This script demonstrates how to integrate Firebase Realtime Database with a simple web app
// It shows real-time data synchronization across multiple users

// Wait for the DOM (Document Object Model) to be fully loaded before running any code
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // STEP 1: FIREBASE CONFIGURATION
  // ========================================
  // Firebase configuration object - this connects your app to your Firebase project
  // You get these values from your Firebase Console (https://console.firebase.google.com)
  // 
  // To set up Firebase:
  // 1. Go to Firebase Console and create a new project
  // 2. Add a web app to your project
  // 3. Copy the config object that Firebase provides
  // 4. Replace the values below with your actual Firebase config
  
  const firebaseConfig = {
    // Your Firebase project configuration goes here
    // For this tutorial, we'll use a demo configuration
    // In a real app, you would replace these with your actual Firebase project settings
    apiKey: "AIzaSyAoNpIzorEZ0Fqt7dR8VDw9HsySx-SlTew",
    authDomain: "cdw-template.firebaseapp.com",
    projectId: "cdw-template",
    storageBucket: "cdw-template.firebasestorage.app",
    messagingSenderId: "509005864636",
    appId: "1:509005864636:web:c1cd463c6536a6ee523ab9",
    measurementId: "G-L18ETD4ENC"
  };

  // Initialize Firebase - this connects your app to Firebase services
  // firebase.initializeApp() sets up the connection using your configuration
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Firebase Realtime Database
  // This is like getting a "handle" to your database that you can use to read/write data
  const database = firebase.database();

  // ========================================
  // STEP 2: GET REFERENCES TO HTML ELEMENTS
  // ========================================
  // We need to get references to the HTML elements we want to update
  // This is like getting "handles" to the parts of the webpage we want to change
  
  const yesButton = document.getElementById('vote-yes');
  const noButton = document.getElementById('vote-no');
  const yesCount = document.getElementById('yes-count');
  const noCount = document.getElementById('no-count');
  const totalVotes = document.getElementById('total-votes');
  const connectionStatus = document.getElementById('connection-status');

  // ========================================
  // STEP 3: SET UP REAL-TIME DATABASE LISTENERS
  // ========================================
  // Firebase Realtime Database can automatically update your app when data changes
  // We use .on('value') to listen for any changes to our poll data
  
  // Listen for changes to the 'yes' votes in the database
  // This function runs every time the 'yes' vote count changes in Firebase
  database.ref('poll/yes').on('value', function(snapshot) {
    // snapshot.val() gets the current value from the database
    const count = snapshot.val() || 0; // If no value exists, default to 0
    
    // Update the display on our webpage
    yesCount.textContent = count;
    
    // Update the total votes display
    updateTotalVotes();
    
    console.log('Yes votes updated:', count); // For debugging
  });

  // Listen for changes to the 'no' votes in the database
  // This function runs every time the 'no' vote count changes in Firebase
  database.ref('poll/no').on('value', function(snapshot) {
    const count = snapshot.val() || 0; // If no value exists, default to 0
    
    // Update the display on our webpage
    noCount.textContent = count;
    
    // Update the total votes display
    updateTotalVotes();
    
    console.log('No votes updated:', count); // For debugging
  });

  // ========================================
  // STEP 4: SET UP BUTTON EVENT LISTENERS
  // ========================================
  // When users click the vote buttons, we need to update the database
  // Firebase will then automatically update all other connected users
  
  // Handle "Yes" vote button clicks
  yesButton.addEventListener('click', function() {
    console.log('Yes button clicked'); // For debugging
    
    // Get the current count from the database and increment it
    // We use .once('value') to get the current value once, then update it
    database.ref('poll/yes').once('value')
      .then(function(snapshot) {
        const currentCount = snapshot.val() || 0; // Current count, or 0 if none exists
        const newCount = currentCount + 1; // Add 1 to the current count
        
        // Update the database with the new count
        // This will trigger the .on('value') listener above, updating all connected users
        return database.ref('poll/yes').set(newCount);
      })
      .then(function() {
        console.log('Yes vote recorded successfully');
        showVoteConfirmation('Yes');
      })
      .catch(function(error) {
        console.error('Error recording vote:', error);
        showError('Failed to record vote. Please try again.');
      });
  });

  // Handle "No" vote button clicks
  noButton.addEventListener('click', function() {
    console.log('No button clicked'); // For debugging
    
    // Get the current count from the database and increment it
    database.ref('poll/no').once('value')
      .then(function(snapshot) {
        const currentCount = snapshot.val() || 0; // Current count, or 0 if none exists
        const newCount = currentCount + 1; // Add 1 to the current count
        
        // Update the database with the new count
        return database.ref('poll/no').set(newCount);
      })
      .then(function() {
        console.log('No vote recorded successfully');
        showVoteConfirmation('No');
      })
      .catch(function(error) {
        console.error('Error recording vote:', error);
        showError('Failed to record vote. Please try again.');
      });
  });

  // ========================================
  // STEP 5: HELPER FUNCTIONS
  // ========================================
  // These functions help us manage the user interface and provide feedback
  
  /**
   * updateTotalVotes Function
   * Purpose: Calculate and display the total number of votes
   * This function runs whenever either vote count changes
   */
  function updateTotalVotes() {
    // Get the current values from our display elements
    const yesVotes = parseInt(yesCount.textContent) || 0;
    const noVotes = parseInt(noCount.textContent) || 0;
    const total = yesVotes + noVotes;
    
    // Update the total display
    totalVotes.textContent = total;
  }

  /**
   * showVoteConfirmation Function
   * Purpose: Show a brief confirmation message when a vote is recorded
   * @param {string} vote - The vote that was recorded ('Yes' or 'No')
   */
  function showVoteConfirmation(vote) {
    // Create a temporary confirmation message
    const confirmation = document.createElement('div');
    confirmation.className = 'vote-confirmation';
    confirmation.textContent = `Thank you for voting "${vote}"!`;
    confirmation.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add the confirmation to the page
    document.body.appendChild(confirmation);
    
    // Remove the confirmation after 3 seconds
    setTimeout(function() {
      confirmation.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(function() {
        if (confirmation.parentNode) {
          confirmation.parentNode.removeChild(confirmation);
        }
      }, 300);
    }, 3000);
  }

  /**
   * showError Function
   * Purpose: Show an error message if something goes wrong
   * @param {string} message - The error message to display
   */
  function showError(message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 1000;
    `;
    
    document.body.appendChild(error);
    
    setTimeout(function() {
      if (error.parentNode) {
        error.parentNode.removeChild(error);
      }
    }, 5000);
  }

  // ========================================
  // STEP 6: CONNECTION STATUS MONITORING
  // ========================================
  // Firebase provides connection status information
  // This helps us know if we're connected to the database
  
  // Listen for connection state changes
  database.ref('.info/connected').on('value', function(snapshot) {
    const connected = snapshot.val();
    
    if (connected) {
      // We're connected to Firebase
      connectionStatus.innerHTML = '<p style="color: #4CAF50;">✅ Connected to Firebase</p>';
      console.log('Connected to Firebase');
    } else {
      // We're not connected to Firebase
      connectionStatus.innerHTML = '<p style="color: #f44336;">❌ Disconnected from Firebase</p>';
      console.log('Disconnected from Firebase');
    }
  });

  // ========================================
  // STEP 7: INITIALIZATION
  // ========================================
  // Set up any initial state when the page loads
  
  // Initialize vote counts to 0 if they don't exist in the database
  // This ensures we start with a clean slate
  database.ref('poll').once('value')
    .then(function(snapshot) {
      if (!snapshot.exists()) {
        // If no poll data exists, initialize it with zeros
        return database.ref('poll').set({
          yes: 0,
          no: 0
        });
      }
    })
    .then(function() {
      console.log('Poll initialized successfully');
    })
    .catch(function(error) {
      console.error('Error initializing poll:', error);
    });

  // Add CSS animations for the vote confirmation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  console.log('Firebase Poll App initialized successfully!');
  console.log('Tutorial: This app demonstrates real-time data synchronization with Firebase');
});

// ========================================
// FIREBASE TUTORIAL SUMMARY
// ========================================
/*
This tutorial demonstrates several key Firebase concepts:

1. CONFIGURATION: Setting up Firebase with your project credentials
2. DATABASE REFERENCE: Getting a handle to your Realtime Database
3. REAL-TIME LISTENERS: Using .on('value') to automatically update UI when data changes
4. DATA WRITING: Using .set() to save data to the database
5. DATA READING: Using .once('value') to read data once
6. ERROR HANDLING: Managing connection issues and errors
7. CONNECTION MONITORING: Checking if your app is connected to Firebase

Key Benefits of Firebase Realtime Database:
- Automatic synchronization across all connected users
- No server management required
- Real-time updates without page refreshes
- Built-in offline support
- Scalable and secure

To use this in your own project:
1. Create a Firebase project at https://console.firebase.google.com
2. Replace the firebaseConfig object with your actual project settings
3. Set up your database rules in the Firebase Console
4. Deploy your app to Firebase Hosting (optional but recommended)
*/ 