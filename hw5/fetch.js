const searchButton = document.getElementById('search-button'); // Get the search button
const searchInput = document.getElementById('search-input'); // Get the input from the input field
const gallery = document.getElementById('gallery'); // Gallery div where all the cards appear

searchButton.addEventListener("click", () => {
    const username = searchInput.value.trim(); // Get the value from the search input
    if (username) { // If the input is not empty
        getRepos(username); // Fetch repositories for the entered username
    } 
});

function getRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=20`; // Use the username for the api url and limit results to 20

    fetch(apiUrl) // Fetch the api 
        .then((response) => { 
            if (!response.ok) { // If response is bad 
                throw new Error("Network response was not ok"); // Throw the error
            }
            return response.json(); 
        })
        .then((repoData) => {
            displayRepos(repoData); // Call a function to display the repositories
            console.log(repoData); // Log the api response for debugging
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function displayRepos(repos) { // This function builds the card by appending the api responses for each individual repo 
    repos.forEach((repo) => { // Loop through each repository in the api response
        const card = document.createElement('div'); // Create a new div for each repository
        card.classList.add("gallery-item"); // Add the card styling tok the div 

        const name = document.createElement('h1'); // Make an h1 for the repo name
        const link = document.createElement('a'); // Create a link for the repo
        link.href = repo.html_url; // Set the a href to the repo URL
        link.textContent = repo.name; // Set the text of the link to the repo name
        name.appendChild(link); // Append the link to the h1

        const description = document.createElement('p'); // Create a p for the repo description
        description.textContent = repo.description; // Set the p to the repo description from api

        const created = document.createElement("p"); // Create a p for the creation date
        created.textContent = "Created: " + new Date(repo.created_at).toDateString(); // Format and output the date using the api response
        
        const updated = document.createElement("p"); // Create a p for the updated date
        updated.textContent = "Updated: " + new Date(repo.updated_at).toDateString(); // Format and output the date using the api response

        const watchers = document.createElement("p"); // Create a p for the watcher count
        watchers.textContent = "Watchers: " + repo.watchers_count; // Output the number of watchers
 
        const languages = document.createElement("p"); // Create a p for the languages used
        // The languages.textContent is below

        // Fetch the languages using the header
        fetch(repo.languages_url) // languages_url is the url with the header that specifies for languages
            .then((response) => response.json()) // Parse the response
            .then((languageFetch) => { // Handle the data
                const languageList = Object.keys(languageFetch).join(", "); // Convert keys to a comma-separated string
                languages.textContent = "Languages: " + languageList; // Output the list
            })
        .catch((error) => {
            console.error("Error", error); // Log error in console
            languages.textContent = "Error"; // Tell the user there's a problem
            });

        const commits = document.createElement("p"); // Create a p for the commit count
        fetch(repo.commits_url.replace("{/sha}", "")) // Take /sha out of the url to use the api
            .then((response) => response.json()) // Parse data
            .then((commitsFetch) => { // Handle the data
                commits.textContent = "Commits: " + commitsFetch.length; // Print the number of commits
            })
            .catch((error) => {
                commits.textContent = "Error"; // Handle errors 
            });

        // Append all elements to the card
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(created);
        card.appendChild(updated);
        card.appendChild(watchers);
        card.appendChild(languages);
        card.appendChild(commits);

        gallery.appendChild(card); // Append the card to the gallery
    }
    );
}
        