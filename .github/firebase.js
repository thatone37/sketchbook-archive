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
  
  // Setup each sketchbook's likes
  const sketchbooks = [
    { id: "cat", name: "cat-sketches" },
    { id: "maka", name: "maka-sketch" },
    { id: "lynx", name: "lynxagon7" }
  ];

  sketchbooks.forEach(({ id, name }) => {
    const likesRef = ref(db, `likes/${name}`);

    // Display likes
    onValue(likesRef, (snapshot) => {
      const count = snapshot.val() || 0;
      document.getElementById(`like-count-${id}`).textContent = `${count} likes`;
    });

    // Like button
    document.getElementById(`like-btn-${id}`).addEventListener("click", () => {
      console.log(`Clicked ${name}!`);
      runTransaction(likesRef, (currentLikes) => {
        return (currentLikes || 0) + 1;
      });
    });
  });
});

