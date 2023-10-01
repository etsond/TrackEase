// Initialize Firebase configuration (same as in main.js)
const firebaseConfig = {
    apiKey: "AIzaSyAFN289x3r01LRFatbuWLQE67YqPjNbbKM",
  authDomain: "trackease-4f595.firebaseapp.com",
  projectId: "trackease-4f595",
  storageBucket: "trackease-4f595.appspot.com",
  messagingSenderId: "258159948655",
  appId: "1:258159948655:web:59774eb75f85e296f22e9a",
//   measurementId: "G-JD21GHZRJN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Add a click event listener to the Google Sign-In button
const googleSignInBtn = document.getElementById('google-signin-btn');

googleSignInBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Redirect or update UI after successful sign-in
            window.location.href = 'index.html'; // Redirect to main page
        })
        .catch((error) => {
            console.error('Google Sign-In Error:', error);
        });
});
