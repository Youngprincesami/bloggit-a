// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3sJmMS4j6p4UuVwu9Mev9bJicqMtACVA",
  authDomain: "bloggit-2e2b6.firebaseapp.com",
  projectId: "bloggit-2e2b6",
  storageBucket: "bloggit-2e2b6.firebasestorage.app",
  messagingSenderId: "917948571527",
  appId: "1:917948571527:web:2d896f77fcac9042ae3d22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the post ID using the file name
const postId = window.location.pathname.split("/").pop().split(".")[0];

// Render the comment section HTML
export function renderCommentSection() {
  let html = `
    <section style="padding: 8px;" class="general-border">
      <h4>Drop a Comment</h4>
      <form id="commentForm">
          <label for="username">Name (optional):</label>
          <input
          type="text"
          id="username"
          name="username"
          placeholder="Your name"
          />
          <label for="comment">Comment:</label>
          <textarea
          id="comment"
          name="comment"
          placeholder="Your comment"
          required
          ></textarea>
          <button type="submit">Post Comment</button>
      </form>
      <br>
      
      <div>
        <h4>Comments</h4>
        <div id="commentsList">
          <!-- Comments will appear here -->
        </div>
      </div>
    </section>`;
  return html;
}

document.getElementById("commentSection").innerHTML = renderCommentSection();

// Function to add a new comment
export async function addComment() {
  const usernameElem = document.getElementById("username");
  const userName = usernameElem.value || "Anonymous";
  const commentsInput = document.getElementById("comment");
  const commentText = commentsInput.value;

  if (commentText.trim() === "") return; // Prevent empty comments

  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    await addDoc(commentsRef, {
      userName,
      text: commentText,
      timestamp: serverTimestamp(),
      likes: 0 // Initialize the like count to 0
    });
    usernameElem.value = ""; // clear the input
    commentsInput.value = ""; // Clear the input
    fetchComments(); // Reload comments to show the new one
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
}

// Function to fetch and display comments
export async function fetchComments() {
  const commentsSection = document.getElementById("commentsList");
  commentsSection.innerHTML = ""; // Clear previous comments

  const commentsRef = collection(db, "posts", postId, "comments");
  const commentsQuery = query(commentsRef, orderBy("timestamp"));

  try {
    const querySnapshot = await getDocs(commentsQuery);
    querySnapshot.forEach((doc) => {
      const comment = doc.data();
      const likesCount = Number(comment.likes) >= 0 ? comment.likes : 0;
      console.log("asdfasjkhdfa ", comment);

      // Create the comment display
      const commentElement = document.createElement("div");

      const commentContent = `
        <p class="user-name"><strong>${comment.userName}</strong>:</p>
        <p class="comment-content">${comment.text}</p>
        <p class="comment-date"><small>${new Date(
          comment.timestamp.seconds * 1000
        ).toLocaleString()}</small></p>

        <div class="reactions">
          <div>
            <svg
              id="heart-icon-${doc.id}"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              style="cursor: pointer; transition: fill 0.3s;">
              <path
                id="heart-path-${doc.id}"
                d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"
                fill="#aaa"
              />
            </svg>
            <span class="like-number" id="like-number-${
              doc.id
            }">${likesCount}</span>
          </div>
        </div>
      `;
      commentElement.innerHTML = commentContent;
      commentsSection.appendChild(commentElement);

      // Attach click event listener for the heart icon
      document
        .getElementById(`heart-icon-${doc.id}`)
        .addEventListener("click", () => likeComment(doc.id));
    });
  } catch (error) {
    console.error("Error fetching comments: ", error);
  }
}

// Function to handle like/unlike actions
async function likeComment(commentId) {
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  const likedComments = JSON.parse(localStorage.getItem("likedComments")) || {};

  try {
    // Check if the comment has already been liked
    if (likedComments[commentId]) {
      // Unlike the comment (decrement likes)
      await updateLike(commentRef, -1);
      delete likedComments[commentId]; // Remove from likedComments in localStorage
    } else {
      // Like the comment (increment likes)
      await updateLike(commentRef, 1);
      likedComments[commentId] = true; // Mark as liked in localStorage
    }

    // Update localStorage
    localStorage.setItem("likedComments", JSON.stringify(likedComments));
  } catch (error) {
    console.error("Error updating likes: ", error);
  }
}

// Function to update the like count in Firestore and on the page
async function updateLike(commentRef, delta) {
  try {
    // Get the current like count
    const commentSnapshot = await getDoc(commentRef);
    if (commentSnapshot.exists()) {
      const currentLikes = commentSnapshot.data().likes || 0;

      // Update like count
      const newLikes = currentLikes + delta;
      await updateDoc(commentRef, { likes: newLikes });

      // Update the displayed like count on the page
      document.getElementById(`like-number-${commentRef.id}`).textContent =
        newLikes;
    }
  } catch (error) {
    console.error("Error updating like count: ", error);
  }
}

// Load comments when the page loads
window.onload = fetchComments;

// Attach event listener to comment form
document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addComment();
});