var $form = document.querySelector('#form');
var $list = document.querySelector('#list');
var $addOptionButton = document.querySelector('.add-option-button');
var $nutritionChoice = document.querySelector('#nutrients-choice');
var $minMaxContainer = document.querySelector('.min-max-container');
var $detailedRecipeContainer = document.querySelector('#detailed-recipe-container');

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
var recipeId = '';

function renderEntry(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'column-width90 margin-top20 border-radius10');
  liElement.setAttribute('data-recipeId', recipeId);
  $list.appendChild(liElement);

  var mainRow = document.createElement('div');
  mainRow.setAttribute('class', 'row li-element flex-wrap');
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
  headerElement.textContent = recipeName.slice(0, 30);
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
var minCalories = 1;
var maxCalories = 999;

function handleFormSubmit(event) {

  event.preventDefault();
  var foodXhr = new XMLHttpRequest();
  var searchRecipe = event.target.search.value;

  !event.target.minCalories.value ? minCalories = 0 : minCalories = event.target.minCalories.value;
  !event.target.maxCalories.value ? maxCalories = 999 : maxCalories = event.target.maxCalories.value;

  if (sugarCount === 0) {
    var minSugar = 1;
    var maxSugar = 99;
  } else {
    if (!event.target.minSugar.value) {
      minSugar = 1;
    } else {
      minSugar = event.target.minSugar.value;
    }
    if (!event.target.maxSugar.value) {
      maxSugar = 99;
    } else {
      maxSugar = event.target.maxSugar.value;
    }
  }

  if (proteinCount === 0) {
    var minProtein = 1;
    var maxProtein = 99;
  } else {
    if (!event.target.minProtein.value) {
      minProtein = 1;
    } else {
      minProtein = event.target.minProtein.value;
    }
    if (!event.target.maxProtein.value) {
      maxProtein = 99;
    } else {
      maxProtein = event.target.maxProtein.value;
    }
  }

  if (carbsCount === 0) {
    var minCarbs = 1;
    var maxCarbs = 99;
  } else {
    if (!event.target.minCarbs.value) {
      minCarbs = 1;
    } else {
      minCarbs = event.target.minCarbs.value;
    }
    if (!event.target.maxCarbs.value) {
      maxCarbs = 99;
    } else {
      maxCarbs = event.target.maxCarbs.value;
    }
  }

  foodXhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=' + searchRecipe + `&app_id=e39dceb5&app_key=2ec338c917039673fcf16a477b215f32&diet=balanced&cuisineType=American&calories=${minCalories}-${maxCalories}&nutrients%5BSUGAR%5D=${minSugar}-${maxSugar}&nutrients%5BPROCNT%5D=${minProtein}-${maxProtein}&nutrients%5BCHOCDF%5D=${minCarbs}-${maxCarbs}`);
  foodXhr.responseType = 'json';

  foodXhr.addEventListener('load', function () {
    if (foodXhr.status !== 200) {
      alert('No Results!');
    }
    $list.replaceChildren();
    for (var i = 0; i < foodXhr.response.hits.length; i++) {
      var recipeIdString = foodXhr.response.hits[i].recipe.uri;
      var recipeIdHashPosition = recipeIdString.indexOf('#');
      recipeId = recipeIdString.slice(recipeIdHashPosition + 1);
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
  $minOption.setAttribute('class', 'min-value width20 margin-right20 text-centered border-radius-all');
  $minOption.setAttribute('placeholder', 'MIN');
  var minValue = `min${value.charAt(0).toUpperCase() + value.slice(1)}`;
  $minOption.setAttribute('name', minValue);
  $minOption.setAttribute('type', 'number');
  var maxValue = `max${value.charAt(0).toUpperCase() + value.slice(1)}`;
  $maxOption.setAttribute('name', maxValue);
  $maxOption.setAttribute('class', 'max-value width20 margin-right20 text-centered border-radius-all');
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

function handleImageClick(event) {
  event.preventDefault();
  var dataIdAttribute = event.target.closest('li').getAttribute('data-recipeId');
  switchingViews('detailed-search-view');
  var foodXhr = new XMLHttpRequest();
  if (event.target.tagName === 'IMG') {
    foodXhr.open('GET', `https://api.edamam.com/api/recipes/v2/%23${dataIdAttribute}?type=public&app_id=e39dceb5&app_key=2ec338c917039673fcf16a477b215f32`);
    foodXhr.responseType = 'json';
    foodXhr.addEventListener('load', function () {
      console.log('foodxhr.response', foodXhr.response.recipe);
      var amountOfServings = foodXhr.response.recipe.yield;
      var recipeName = foodXhr.response.recipe.label.slice(0, 30);
      var cholesterol = Math.floor(foodXhr.response.recipe.totalDaily.CHOLE.quantity) / amountOfServings;
      var calcium = Math.floor(foodXhr.response.recipe.totalDaily.CA) / amountOfServings;
      var iron = Math.floor(foodXhr.response.recipe.totalDaily.FE) / amountOfServings;
      var potassium = Math.floor(foodXhr.response.recipe.totalDaily.K) / amountOfServings;
      var magnesium = Math.floor(foodXhr.response.recipe.totalDaily.MG) / amountOfServings;
      var sodium = Math.floor(foodXhr.response.recipe.totalDaily.NA) / amountOfServings;
      var vitaminE = Math.floor(foodXhr.response.recipe.totalDaily.TOCPHA) / amountOfServings;
      var vitaminB6 = Math.floor(foodXhr.response.recipe.totalDaily.VITB6A) / amountOfServings;
      var vitaminD = Math.floor(foodXhr.response.recipe.totalDaily.VITD) / amountOfServings;
      var zinc = Math.floor(foodXhr.response.recipe.totalDaily.ZN) / amountOfServings;
      var ingredients = [];
      console.log('cholesterol', cholesterol);

      var imageContainer = document.createElement('div');
      imageContainer.setAttribute('class', 'column-width90 row margin-top10');
      $detailedRecipeContainer.appendChild(imageContainer);

      var imageElement = document.createElement('img');
      imageElement.setAttribute('class', 'border-radius5');
      imageElement.setAttribute('src', foodXhr.response.recipe.image);
      imageContainer.appendChild(imageElement);

      var linkElement = document.createElement('a');
      linkElement.setAttribute('class', 'instruction-link margin-top10 border-radius5 column-width60');
      linkElement.setAttribute('href', foodXhr.response.recipe.url);
      linkElement.textContent = 'Instruction';
      $detailedRecipeContainer.appendChild(linkElement);

      // detailed info
      var detailedNutritionContainer = document.createElement('div');
      detailedNutritionContainer.setAttribute('class', ' row column-width90 border-radius10 margin-top10');
      $detailedRecipeContainer.appendChild(detailedNutritionContainer);

      var recipeHeader = document.createElement('div');
      recipeHeader.setAttribute('class', 'column-full');
      detailedNutritionContainer.appendChild(recipeHeader);

      var headerRecipeName = document.createElement('h2');
      headerRecipeName.setAttribute('class', 'column-width90 border-bottom-grey');
      headerRecipeName.textContent = recipeName;
      recipeHeader.appendChild(headerRecipeName);

      var headerTextContainer = document.createElement('div');
      headerTextContainer.setAttribute('class', 'column-width90 row border-bottom-grey');
      recipeHeader.appendChild(headerTextContainer);

      var headerTextContainerLeft = document.createElement('p');
      headerTextContainerLeft.textContent = 'Nutrition Information';
      headerTextContainerLeft.setAttribute('class', 'column-width45 nutrition-text-small');
      headerTextContainer.appendChild(headerTextContainerLeft);

      var headerTextContainerRight = document.createElement('p');
      headerTextContainerRight.textContent = '% Daily Value';
      headerTextContainerRight.setAttribute('class', 'column-width45 nutrition-text-small');
      headerTextContainer.appendChild(headerTextContainerRight);

      console.log('recipe name', foodXhr.response.recipe.label);
    }
    );
  }
  foodXhr.send();

}

/* var imageContainer = document.createElement('div');
imageContainer.setAttribute('class', 'column-width40 image-container');
mainRow.appendChild(imageContainer);
 */
function switchingViews(viewName) {
  var $viewList = document.querySelectorAll('.view');
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === viewName) {
      $viewList[i].className = 'view';
    } else {
      $viewList[i].className = 'view hidden ';
    }
  }
}

$nutritionChoice.addEventListener('click', handleNutritionChoice);
$form.addEventListener('submit', handleFormSubmit);
$addOptionButton.addEventListener('click', handleAddOptionButton);
$list.addEventListener('click', handleImageClick);

/* var recipeIdString = foodXhr.response.hits[i].recipe.uri;
      var recipeIdHashPosition = recipeIdString.indexOf('#');
      recipeId = recipeIdString.slice(recipeIdHashPosition + 1);
      recipeName = foodXhr.response.hits[i].recipe.label;
      recipeImage = foodXhr.response.hits[i].recipe.image; */
