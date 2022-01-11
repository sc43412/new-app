const search = document.getElementById('search');
const submit = document.getElementById('submit');
const Meal = document.getElementById('meals');
const single_meal = document.getElementsByClassName('single-meal');
const meal_heading = document.getElementById('result-heading');

const mealContainer = document.getElementById('meal-container');

// search  meals function
function searchMeal(e) {
    e.preventDefault();
    // clear single meal
    single_meal.innerHTML = "";

    // get search meal 
    //   console.log(search.value);
    const val = search.value;

    $.ajax({
        type: "GET",
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`,
        // url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`,
        error: function(error) {
            console.log("Error in fecting data from API", error); // if api fails it will show error to user
        },
        success: function(response) {

            show(response.meals); // sending response from ajax request to display all function
        }
    });


}



function show(data) {
    data.forEach(element => {
        showMeal(element);
    });
}

function showMeal(meal) {

    let mealItem = document.createElement('div'); // create one table row element and setting its inner html as json response
    mealItem.classList.add('meals');
    mealItem.innerHTML = (` 
                            <div class='meal'>
                            <a hr><img src='${meal.strMealThumb}' alt='${meal.strMeal}'></a>
                            <div class='meal-info' data-mealID='${meal.idMeal}'>
                            <h3>${meal.strMeal}</h3>
                            </div>
                            </div>
                            `)


    let div = document.createElement('div');
    div.innerHTML = "Open";
    a = document.createElement("a");
    a.classList.add('details-page');
    div.id = meal.idMeal;
    // anchor tag to redirect to details 
    a.setAttribute("href", "details.html");
    a.appendChild(div);
    div.setAttribute("onclick", "detailsClicked(this.id)");

    let button = document.createElement("button");
    button.innerHTML = "Favroite";
    button.classList.add('add-fav')
    button.id = meal.idMeal;
    button.setAttribute("onclick", "updateStorage(this.id)");

    mealItem.appendChild(a);
    mealItem.appendChild(button);
    // console.log(meal);


    mealContainer.appendChild(mealItem); // adding all details to existing table

}

// event listener for submit button
submit.addEventListener('submit', searchMeal);


function updateStorage(value) {
    let meals;
    meals = localStorage.getItem('meals') ? JSON.parse(localStorage.getItem('meals')) : []; // we created one array in a local storage
    meals.push(value);
    localStorage.setItem("meals", JSON.stringify(meals)); // adding meals in a array in string formate
}


function detailsClicked(id) {

    // storing to local 
    localStorage.setItem("id", id);
}