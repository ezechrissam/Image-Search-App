const accesskey = "v2hpbDk5-0CEWJfr7cx_bL84bwdCByNc9r9hEIpcFbI";

const formEl =  document.querySelector("form");
const inputEl = document.getElementById("search-input")
const searchResultContainer = document.querySelector(".search-result-container");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    // Retrieve input value and construct the API URL
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page${page}&query=${inputData}&client_id=${accesskey}`

    // Fetch data from the Unsplash API
    const response = await fetch(url)
    const data = await response.json()

    // Extract results and update the search result container
    const results = data.results

    if(page === 1){
        searchResultContainer.innerHTML = "";
    }

     results.map((result) => {
        // Create elements for each search result
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html 
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        // Append elements to the search result container
        imageWrapper.appendChild(image

)
        imageWrapper.appendChild(imageLink)
        searchResultContainer.appendChild(imageWrapper)
     });

     // Increment page for next search
     page++

    // Show the "Show More" button if there are more pages
    if(page > 1){
        showMore.style.display = "block";
    }
}

// Event listener for the search form submission
formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1;
    searchImages()
});

// Event listener for the "Show More" button click
showMore.addEventListener('click', () => {
    searchImages()
});
  