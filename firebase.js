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

//ADD YOUR SKETCHBOOKS HERE!!! FUTURE MAKA ITS RIGHT HERE PLEASEE and dont forget the comma!! thats important as well!!! lala
const sketchbooks = [
  { id: "cat", name: "cat-sketches" },
  { id: "maka", name: "maka-sketch" },
  { id: "lynx", name: "lynxagon7" },
  { id: "rae", name: "rae-sketches" },
  { id: "mario", name: "mario-sketches" },
  { id: "insect", name: "insect-sketches" },
   { id: "cory", name: "cory-sketches" },
  { id: "insect", name: "lynn-sketches" }
 
];

sketchbooks.forEach(({ id, name }) => {
  const likesRef = ref(db, `likes/${name}`);
  const likedKey = `liked_${name}`; //important or something, idk

  // find elements
  const likeBtn = document.getElementById(`like-btn-${id}`);
  const likeCountEl = document.getElementById(`like-count-${id}`);

  // If the elements for this sketchbook aren't present on the page, skip it safely
  if (!likeBtn || !likeCountEl) {
    console.warn(`Skipping ${name}: missing elements (likeBtn=${!!likeBtn}, likeCount=${!!likeCountEl})`);
    return;
  }

  // display likes
  onValue(likesRef, (snapshot) => {
    const count = snapshot.val() || 0;
    likeCountEl.textContent = `${count} likes`;
  });

  // checks if they already liked it
  if (localStorage.getItem(likedKey)) {
    likeBtn.disabled = true;
    likeBtn.style.opacity = "0.5";
    likeBtn.style.cursor = "not-allowed";
  }

  likeBtn.addEventListener("click", () => {
    if (localStorage.getItem(likedKey)) {
      console.log(`Already liked ${name}!`);
      return;
    }

    console.log(`Clicked ${name}!`);
    runTransaction(likesRef, (currentLikes) => {
      return (currentLikes || 0) + 1;
    });

    // mark as liked
    localStorage.setItem(likedKey, "true");
    likeBtn.disabled = true;
    likeBtn.style.opacity = "0.5";
    likeBtn.style.cursor = "not-allowed";
  });
});
