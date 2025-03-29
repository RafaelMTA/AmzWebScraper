//DOM Elements
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const productStatus = document.querySelector("#product-status");
const productsItemContainer = document.querySelector("#product-container");

// Wait for DOM to be fully loaded and add the scrape data function to the search button
document.addEventListener('DOMContentLoaded', () => {   
    searchButton.addEventListener('click', () => {
        scrapeData(searchInput.value);
    });
}); 

async function scrapeData(query){
    //In case the user don`t input any value, inform the user that the query is required
    if (!query) {
        showStatus('Please enter a query', 'error');
        return;
    }

    //Inform the user that the data is still loading
    //disables the button so that the user cannot mistakenly make multiple requests, it will be available again after the request
    showStatus('Loading Data, please wait...', 'warning');
    searchButton.disabled = true;
    
    try{
        //Needs to encode the query before sending to the server
        const response = await fetch(`/api/scraper?keyword=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
        });

        if (!response.ok) {
            //Inform the user if the request failed(Ie. Amazon blocking the request)
            if(response.status === 503){ 
                showStatus('Error on Search, please try again in a few minutes...', 'error');
            }else{
                showStatus('Error on Search', 'error');
            }           
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //Fetched Products
        const data = await response.json();

        //Check if the result is not empty 
        if(!data || (Array.isArray(data) && data.length === 0)) 
        {
            productsItemContainer.innerHTML = '<p>No results found</p>';
            return;  
        }
        else 
        {
            data.map(item => {
                renderProductItems(item); 
            });         
        }     
    }catch (error) {
        console.error('Error during scraping:', error);
        throw error;
    }finally{
        searchButton.disabled = false;
    }
}

//Get the Product Card HTML and add it to the product item container
function renderProductItems(item){
    productsItemContainer.innerHTML += CardHTML(item);
}

//Render the star rating for the product items
//Requires Font-Awesome reference in main .HTML file
function renderStarsRating(rating){
    const starContainer = document.createElement("span");
    starContainer.classList.add("product-rating");

    starContainer.innerHTML = "";

    // Calculate full stars, half stars, and empty stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star', 'yellow');
        starContainer.appendChild(star);
    }

    // Render half star if needed
    if (hasHalfStar) {
        const halfStar = document.createElement('i');
        halfStar.classList.add('fa-solid', 'fa-star-half-stroke', 'yellow');
        starContainer.appendChild(halfStar);
    }

    // Render empty stars
    for (let i = 0; i < emptyStars; i++) {
        const emptyStar = document.createElement('i');
        emptyStar.classList.add('fa-regular', 'fa-star', 'yellow');
        starContainer.appendChild(emptyStar);
    }

    return starContainer.innerHTML;
}

//Display a message to the user, reference the search result
function showStatus(message, type) {
    productStatus.className = '';
    productStatus.textContent = message;
    productStatus.classList.add(type);
    productStatus.classList.add("fade-in");
    //The message will dissapear after the a set timeout   
    setTimeout(function() {
        productStatus.className = '';
        productStatus.classList.add(type);
        productStatus.classList.add("fade-out");
    }, 2000);
}

//Reusable Card Template, will render each product
//Due to long product names, the overflow text will be hidden. The user can still see the full title by scrolling on it
const CardHTML = (data) => {
    return(`
    <div class="card-container fade-in">
        <div class="card">
            <div class="card-head">   
                <div class="product-detail">
                    <h2>${data.title?? ""}</h2> 
                </div>
            <img src="${data.imageUrl ?? ""}" alt="product" class="product-img">
            </div>
            <div class="card-body">
                <div class="product-desc">      
                    <span class="product-rating">${renderStarsRating(data.rating ?? 0)}</span>
                    <span class="product-rating-text">(${data.rating ?? 0})</span>
                </div>
                <div class="product-properties">     
                    <span class="product-review">${data.reviewCount ? `Reviews: ${data.reviewCount}` : "No reviews"}</span>
                </div>
            </div>
        </div>
    </div>    
    `);
}
