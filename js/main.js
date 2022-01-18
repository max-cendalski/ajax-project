var $form = document.querySelector('#form');
var $list = document.querySelector('#list');
var $addOptionButton = document.querySelector('.add-option-button');
var $nutritionChoice = document.querySelector('#nutrients-choice');
var $minMaxContainer = document.querySelector('.min-max-container');

var sugarCount = 0;
var proteinCount = 0;
var carbsCount = 0;

var selectNutritionName = '';
var recipeName = '';
var calories = '';
var sugar = '';
var protein = '';
var carbs = '';
var recipeImage = '';
var amountOfServings = 0;

function renderEntry(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'column-width90 margin-top20 border-radius10');

  var mainRow = document.createElement('div');
  mainRow.setAttribute('class', 'row li-element');
  liElement.appendChild(mainRow);

  var imageContainer = document.createElement('div');
  imageContainer.setAttribute('class', 'column-width40 image-container');
  mainRow.appendChild(imageContainer);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', recipeImage);
  imageContainer.appendChild(imageElement);

  var columnWidth60 = document.createElement('div');
  columnWidth60.setAttribute('class', 'column-width60');
  mainRow.appendChild(columnWidth60);

  var headerContainer = document.createElement('div');
  headerContainer.setAttribute('class', 'header-container');
  columnWidth60.appendChild(headerContainer);

  var headerElement = document.createElement('h3');
  headerElement.textContent = recipeName.slice(0, 40);
  headerContainer.appendChild(headerElement);

  var innerRow = document.createElement('div');
  innerRow.setAttribute('class', 'row');
  columnWidth60.appendChild(innerRow);

  var innerColumnWidth40 = document.createElement('div');
  innerColumnWidth40.setAttribute('class', 'column-width40');
  innerRow.appendChild(innerColumnWidth40);

  var paragraphElCalories = document.createElement('p');
  paragraphElCalories.textContent = 'Calories:';
  innerColumnWidth40.appendChild(paragraphElCalories);

  var paragraphElSugar = document.createElement('p');
  paragraphElSugar.textContent = 'Sugar:';
  innerColumnWidth40.appendChild(paragraphElSugar);

  var paragraphElProtein = document.createElement('p');
  paragraphElProtein.textContent = 'Protein:';
  innerColumnWidth40.appendChild(paragraphElProtein);

  var paragraphElCarbs = document.createElement('p');
  paragraphElCarbs.textContent = 'Carbs:';
  innerColumnWidth40.appendChild(paragraphElCarbs);

  var innerColumnWidth60 = document.createElement('div');
  innerColumnWidth60.setAttribute('class', 'column-width60');
  innerRow.appendChild(innerColumnWidth60);

  var paragraphElCaloriesAPI = document.createElement('p');
  paragraphElCaloriesAPI.textContent = calories;
  innerColumnWidth60.appendChild(paragraphElCaloriesAPI);

  var paragraphElSugarAPI = document.createElement('p');
  paragraphElSugarAPI.textContent = sugar;
  innerColumnWidth60.appendChild(paragraphElSugarAPI);

  var paragraphElProteinAPI = document.createElement('p');
  paragraphElProteinAPI.textContent = protein;
  innerColumnWidth60.appendChild(paragraphElProteinAPI);

  var paragraphElCarbsAPI = document.createElement('p');
  paragraphElCarbsAPI.textContent = carbs;
  innerColumnWidth60.appendChild(paragraphElCarbsAPI);

  return liElement;
}

function handleFormSubmit(event) {
  event.preventDefault();
  var foodXhr = new XMLHttpRequest();
  var searchRecipe = event.target.search.value;

  if (!event.target.minCalories.value) {
    var minCalories = 0;
  } else {
    minCalories = event.target.minCalories.value;
  }
  if (!event.target.maxCalories.value) {
    var maxCalories = 999;
  } else {
    maxCalories = event.target.maxCalories.value;
  }

  foodXhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=' + searchRecipe + `&app_id=e39dceb5&app_key=2ec338c917039673fcf16a477b215f32&diet=balanced&cuisineType=American&calories=${minCalories}-${maxCalories}&nutrients%5BCHOCDF%5D=0-900`);
  foodXhr.responseType = 'json';
  foodXhr.addEventListener('load', function () {

    for (var i = 0; i < foodXhr.response.hits.length; i++) {
      recipeName = foodXhr.response.hits[i].recipe.label;
      recipeImage = foodXhr.response.hits[i].recipe.image;
      amountOfServings = foodXhr.response.hits[i].recipe.yield;
      calories = Math.floor(foodXhr.response.hits[i].recipe.calories / amountOfServings);
      sugar = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.SUGAR.quantity / amountOfServings);
      protein = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.PROCNT.quantity / amountOfServings);
      carbs = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.CHOCDF.quantity / amountOfServings);
      var result = renderEntry(foodXhr.response.hits[i]);

      $list.appendChild(result);
    }
  });
  foodXhr.send();
}

function createMinMaxNutritionBox(value) {
  var $optionContainer = document.createElement('div');
  $optionContainer.setAttribute('class', 'calories-container');
  var $minOption = document.createElement('input');
  var $maxOption = document.createElement('input');
  var $optionLabel = document.createElement('label');
  $optionLabel.textContent = value.charAt(0).toUpperCase() + value.slice(1);
  $minOption.setAttribute('class', 'min-value width20 margin-right20');
  $minOption.setAttribute('placeholder', 'MIN');
  $minOption.setAttribute('type', 'number');
  $maxOption.setAttribute('class', 'max-value width20 margin-right20');
  $maxOption.setAttribute('placeholder', 'MAX');
  $maxOption.setAttribute('type', 'number');

  $minMaxContainer.appendChild($optionContainer);
  $optionContainer.appendChild($minOption);
  $optionContainer.appendChild($maxOption);
  $optionContainer.appendChild($optionLabel);
}

function handleAddOptionButton(event) {
  event.preventDefault();
  if (selectNutritionName === 'calories') return;
  if (selectNutritionName === 'sugar' && sugarCount < 1) {
    sugarCount++;
    createMinMaxNutritionBox('sugar');
  } if (selectNutritionName === 'protein' && proteinCount < 1) {
    proteinCount++;
    createMinMaxNutritionBox('protein');
  } if (selectNutritionName === 'carbs' && carbsCount < 1) {
    carbsCount++;
    createMinMaxNutritionBox('carbs');
  }
}

function handleNutritionChoice(event) {
  event.preventDefault();
  selectNutritionName = event.target.value;
}

$nutritionChoice.addEventListener('click', handleNutritionChoice);
$form.addEventListener('submit', handleFormSubmit);
$addOptionButton.addEventListener('click', handleAddOptionButton);

/* function handleFormSubmit(event) {
  event.preventDefault();
  var foodXhr = new XMLHttpRequest();
  var searchRecipe = event.target.search.value;
  foodXhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=' + searchRecipe + '&app_id=e39dceb5&app_key=2ec338c917039673fcf16a477b215f32&diet=balanced&cuisineType=American');
  foodXhr.responseType = 'json';
  foodXhr.addEventListener('load', function () {

    for (var i = 0; i < foodXhr.response.hits.length; i++) {
      recipeName = foodXhr.response.hits[i].recipe.label;
      recipeImage = foodXhr.response.hits[i].recipe.image;
      amountOfServings = foodXhr.response.hits[i].recipe.yield;
      calories = Math.floor(foodXhr.response.hits[i].recipe.calories / amountOfServings);
      sugar = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.SUGAR.quantity / amountOfServings);
      protein = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.PROCNT.quantity / amountOfServings);
      carbs = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.CHOCDF.quantity / amountOfServings);
      var result = renderEntry(foodXhr.response.hits[i]);

      $list.appendChild(result);
    }
  });
  foodXhr.send();
} */
