import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAeBVUIY8N3MTCVsANNh5nVzjGsVM7c3hc",
  authDomain: "sketchbook-likes.firebaseapp.com",
  databaseURL: "https://sketchbook-likes-default-rtdb.firebaseio.com",
  projectId: "sketchbook-likes",
  storageBucket: "sketchbook-likes.firebasestorage.app",
  messagingSenderId: "192312926341",
  appId: "1:192312926341:web:3e81d31a96ff4596fa49ec"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {

  const likesRef = ref(db, "likes");

  // Display likes
  onValue(likesRef, (snapshot) => {
    const count = snapshot.val() || 0;

    document.getElementById("like-count").textContent =
      `${count} likes`;
  });

  // Like button
  document.getElementById("like-btn").addEventListener("click", () => {

    console.log("clicked!");

    runTransaction(likesRef, (currentLikes) => {
      return (currentLikes || 0) + 1;
    });

  });

});
