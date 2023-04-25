document.getElementById('issueInputForm').addEventListener('submit',saveIssue)



// retrieve the  issues from localstorage and display it on page
function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'))
    let issuesList = document.getElementById('issuesList')

    issuesList.innerHTML = '';
// check if issues array is null or underfine

if(issues === null || issues === undefined){
    return;
}


// iterates over the getIssues 
    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id
        let subject = issues[i].subject
        let description = issues[i].description
        let severity = issues[i].severity
        let assignedTo = issues[i].assignedTo
        let status = issues[i].status
        let statusColor = status == "Closed" ? 'label-success' : 'label-info'

        // add the issues to the html element
        issuesList.innerHTML += 
        '<div class="well">' +
        '<h6>Issue ID:' + id + '</h6>' +
        '<p><span class= "label ' + statusColor + ' ">' + status + '</span></p>' +
        '<h3>' + subject + '</h3>' +
        '<p>' + description + '</p>' + 
        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' ' + '<span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> ' +
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> ' +
        '<a href="#" class="btn btn-primary" onclick="editIssue(\''+id+'\')">Edit</a>'
        + '</div>'
    }
}

// save a new localstorage and fecth & display issue on page
// first grab the value of issue sub,description,severity and assigned to filed
function saveIssue(e) {
    // generate new ID
    let issueId = chance.guid()
    let issueSubject = document.getElementById('issueSubjInput').value
    let issueDesc = document.getElementById('issueDescInput').value
    let issueSeverity = document.getElementById('issueSeverityInput').value
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value
    let issueStatus = 'Open'

    // issue obj then push into issue arr stored in local storage
    let issue = {
        id: issueId,
        subject: issueSubject,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
// if no issue arr is found, new arr is created and the new issue push into it
    if(localStorage.getItem('issues')===null) {
        let issues = []
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    }

    // input field is reset
    document.getElementById('issueInputForm').reset();

    // calling fect to display all issues on page
    fetchIssues()
// prevent form from being submitted and page reloading
    e.preventDefault()
}

// allow user to edit an issue
function editIssue(id) {
    // get the issue from arr from local storage
    let issues = JSON.parse(localStorage.getItem('issues'))
    // find the indexof the issue with respect to its ID
    let issueIndex = issues.findIndex(issue => issue.id === id)

    // updating the values of the input files with the current details
    document.getElementById('issueSubjInput').value = issues[issueIndex].subject
    document.getElementById('issueDescInput').value = issues[issueIndex].description
    document.getElementById('issueSeverityInput').value = issues[issueIndex].severity
    document.getElementById('issueAssignedToInput').value = issues[issueIndex].assignedTo

    // remo issue from issues arr
    issues.splice(issueIndex, 1)
    // save the updated issue arr to local storage
    localStorage.setItem('issues', JSON.stringify(issues))
    // call fetch issues function to update page
    fetchIssues()
}

// allowed user to mark issue as closed
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i=0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues[i].status = "Closed"
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()
}

// allow user to delete issue
function deleteIssue (id) {
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i=0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues.splice(i,1)
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()

}

// template from Claire Bourdon
// added edit features
// added more styles
// add a feature that required the user to input a 