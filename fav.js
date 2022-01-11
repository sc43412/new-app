const mealContainer = document.querySelector('#container');
console.log(mealContainer);
var apiurl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function displayStorage() {
    let mealsItems = localStorage.getItem("meals");
    if (mealsItems) {
        let storageItems = JSON.parse(localStorage.getItem('meals'));
        storageItems.forEach(id => {
            searchMeal(id);
        });
    }
}



// this funcion make the request to OMDB api and get the response and appned the result on screen
function searchMeal(id) {

    // clear single meal
    // single_meal.innerHTML = "";
    var newurl = apiurl + id;
    // $.ajax({

    //     type: "GET",
    //     url: newurl,
    //     error: function(error) {
    //         console.log("Error in fecting data from API", error); // if api fails it will show error to user
    //     },
    //     success: function(response) {
    //         show(response.meals); // sending response from ajax request to display all function
    //     }
    // });
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', newurl);
    xhrRequest.send();
    // var data = JSON.parse(xhrRequest.response);

    xhrRequest.onload = function() {
        var data = JSON.parse(xhrRequest.response);
        console.log(data);
        for (meal of data.meals) {
            showMeal(meal);
        }
    };


}


// function show(data) {
//     data.forEach(element) => {
//         showMeal(element);
//     };
// }

function showMeal(meal) {

    let mealItem = document.createElement('div'); // create one table row element and setting its inner html as json response
    mealItem.classList.add('meals');
    mealItem.id = meal.idMeal;
    mealItem.innerHTML = (`
                            <div class='meal'>
                            <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
                            <div class='meal-info' data-mealID='${meal.idMeal}'>
                            <h3>${meal.strMeal}</h3>
                            </div>
                            </div>
                            `)

    let button = document.createElement("button");
    button.innerHTML = "Remove";
    button.classList.add('add-fav')
    button.id = meal.idMeal;
    button.setAttribute("onclick", "removeMovie(this.id)");


    mealItem.appendChild(button);
    console.log(meal);


    mealContainer.appendChild(mealItem); // adding all details to existing table

}


// we will call displayStorage function when page is reloaded
document.addEventListener("DOMContentLoaded", displayStorage);


//this functions removes movies from favourits dynamically
function removeMovie(id) {

    for (let i = mealContainer.childNodes.length - 1; i >= 0; i--) {
        if (mealContainer.childNodes[i].id === id) {
            mealContainer.removeChild(mealContainer.childNodes[i]);
            editStorage(id); // it will remove meal from loacal storage
            displayStorage() // remaining meal will be loaded on page
        }

    }
}

// this function removes movies from local storage
function editStorage(meal) {
    console.log(meal);
    let meals = JSON.parse(localStorage.getItem('meals')); //get deleted meal from local storage
    let index = meals.indexOf(meal);
    meals.splice(index, 1);
    localStorage.removeItem('meals');

    localStorage.setItem('meals', JSON.stringify(meals)); // it will restore remaining items in local storage

}