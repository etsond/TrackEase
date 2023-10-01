// Initialize Firebase configuration
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

// Function to execute after successful sign-in
function onSignIn(user) {
  console.log('Logged in user:', user.displayName);
  // You can redirect or update the UI as needed.
}

// Add a click event listener to the Google Sign-In button
const googleSignInBtn = document.getElementById('google-signin-btn');

googleSignInBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      // Handle successful sign-in here
    })
    .catch((error) => {
      console.error('Google Sign-In Error:', error);
    });
});

// Function to execute after successful sign-in
function onSignIn(user) {
  console.log('Logged in user:', user.displayName);

  // Update user profile information
  document.getElementById('user-photo').src = user.photoURL || 'default-user-photo.jpg';
  document.getElementById('user-name').textContent = user.displayName;
  document.getElementById('user-email').textContent = user.email;

}




document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// Retrieve the issues from localStorage and display them on the page
function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem('issues'))
  let issuesList = document.getElementById('issuesList')

  issuesList.innerHTML = '';

  if (issues === null || issues === undefined) {
    return;
  }

  for (let i = 0; i < issues.length; i++) {
    let id = issues[i].id;
    let subject = issues[i].subject;
    let description = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;
    let statusColor = status == 'Closed' ? 'label-success' : 'label-info';

    issuesList.innerHTML +=
      '<div class="well">' +
      '<h6>Issue ID:' + id + '</h6>' +
      '<p><span class= "label ' + statusColor + ' ">' + status + '</span></p>' +
      '<h3>' + subject + '</h3>' +
      '<p>' + description + '</p>' +
      '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' + '<span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
      '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a> ' +
      '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a> ' +
      '<a href="#" class="btn btn-primary" onclick="editIssue(\'' + id + '\')">Edit</a>'
      + '</div>';
  }
}

// Save a new issue to localStorage and fetch & display issues on the page
function saveIssue(e) {
  let issueId = chance.guid();
  let issueSubject = document.getElementById('issueSubjInput').value;
  let issueDesc = document.getElementById('issueDescInput').value;
  let issueSeverity = document.getElementById('issueSeverityInput').value;
  let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  let issueStatus = 'Open';

  let issue = {
    id: issueId,
    subject: issueSubject,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') === null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

function editIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));
  let issueIndex = issues.findIndex(issue => issue.id === id);

  document.getElementById('issueSubjInput').value = issues[issueIndex].subject;
  document.getElementById('issueDescInput').value = issues[issueIndex].description;
  document.getElementById('issueSeverityInput').value = issues[issueIndex].severity;
  document.getElementById('issueAssignedToInput').value = issues[issueIndex].assignedTo;

  issues.splice(issueIndex, 1);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function setStatusClosed(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id) {
  let issues = JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id === id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// Initial fetch of issues when the page loads
fetchIssues();
