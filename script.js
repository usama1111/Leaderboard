// Function to create a new entry
function createRow(name, score) {
    const tbody = document.getElementById("leaderboard-body");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td></td>
        <td>${name}</td>
        <td>${score}</td>
        <td>
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    tbody.appendChild(newRow);

    // Re-rank the rows
    rankRows();
}

// Function to edit a leaderboard row
function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    // Replace the cell content with input fields for editing
    cells[1].innerHTML = '<input type="text" value="' + cells[1].textContent + '">';
    cells[2].innerHTML = '<input type="number" value="' + cells[2].textContent + '">';

    // Change button to save and cancel
    button.textContent = 'Save';
    button.onclick = function () {
        saveRow(this);
    };

    // Add cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.onclick = function () {
        cancelEdit(this);
    };

    row.querySelector('td:last-child').appendChild(cancelButton);
}

// Function to save an edited leaderboard row
function saveRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const newName = cells[1].querySelector('input').value;
    const newScore = cells[2].querySelector('input').value;

    // Update the cell content with edited values
    cells[1].textContent = newName;
    cells[2].textContent = newScore;

    // Change button back to edit
    button.textContent = 'Edit';
    button.onclick = function () {
        editRow(this);
    };

    // Remove cancel button
    row.querySelector('button:last-child').remove();

    // Re-rank the rows
    rankRows();
}

// Function to cancel editing a leaderboard row
function cancelEdit(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const originalName = cells[1].textContent;
    const originalScore = cells[2].textContent;

    // Restore the original cell content
    cells[1].textContent = originalName;
    cells[2].textContent = originalScore;

    // Change button back to edit
    row.querySelector('button:first-child').textContent = 'Edit';
    row.querySelector('button:first-child').onclick = function () {
        editRow(this);
    };

    // Remove cancel button
    button.remove();
}

// Function to delete a leaderboard row
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();

    // Re-rank the rows
    rankRows();
}

// Function to re-rank the rows based on score
function rankRows() {
    const tbody = document.getElementById("leaderboard-body");
    const rows = tbody.querySelectorAll("tr");

    // Convert rows to an array for sorting
    const rowsArray = Array.from(rows);

    // Sort the rows based on the score (descending order)
    rowsArray.sort((a, b) => {
        const scoreA = parseInt(a.querySelector("td:nth-child(3)").textContent);
        const scoreB = parseInt(b.querySelector("td:nth-child(3)").textContent);
        return scoreB - scoreA;
    });

    // Update the rank in each row
    rowsArray.forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
    });
}

// Handle form submission to create a new entry
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("create-name").value;
    const score = document.getElementById("create-score").value;

    if (name && score) {
        createRow(name, score);

        // Clear the form fields after creating
        document.getElementById("create-name").value = "";
        document.getElementById("create-score").value = "";
    }
});

// Function to open the create modal
document.getElementById("open-create-modal").addEventListener("click", function () {
    document.getElementById("create-modal").style.display = "block";
});

// Function to close the create modal
document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("create-modal").style.display = "none";
});

// Add an event listener to the logout button
document.getElementById("logout-button").addEventListener("click", function () {
    // Redirect to the login page (assuming login.html is in the same directory)
    window.location.href = "index.html";
});
