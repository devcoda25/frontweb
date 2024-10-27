importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')
// // Initialize the Firebase app in the service worker by passing the generated config 

const firebaseConfig = {
  apiKey: "AIzaSyCgx0KYA5aKVgWcXCjb8-q38lKvad9bELk",
  authDomain: "konzo-paper.firebaseapp.com",
  projectId: "konzo-paper",
  storageBucket: "konzo-paper.appspot.com",
  messagingSenderId: "480277029864",
  appId: "1:480277029864:web:96fce7f8378c802e36ba5d",
  measurementId: "G-9VMTY72P2K"
};



firebase?.initializeApp(firebaseConfig)


// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
  // console.log('Hello world from the Service Worker :call_me_hand:');
});

// Handle background messages
self.addEventListener('push', function (event) {
  const payload = event.data.json();
  const notificationTitle = payload.notification.body;
  const notificationOptions = {
    body: payload.notification.body,
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});