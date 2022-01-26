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
  innerColumnWidth40.setAttribute('class', 'column-width50 padding-left5');
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
      calories = Math.floor(foodXhr.response.recipe.calories / amountOfServings);
      sugar = Math.floor(foodXhr.response.recipe.totalNutrients.SUGAR.quantity / amountOfServings);
      protein = Math.floor(foodXhr.response.recipe.totalNutrients.PROCNT.quantity / amountOfServings);
      carbs = Math.floor(foodXhr.response.recipe.totalNutrients.CHOCDF.quantity / amountOfServings);
      var cholesterol = Math.floor(foodXhr.response.recipe.totalDaily.CHOLE.quantity) / amountOfServings;
      var calcium = Math.floor(foodXhr.response.recipe.totalDaily.CA.quantity) / amountOfServings;
      var iron = Math.floor(foodXhr.response.recipe.totalDaily.FE.quantity) / amountOfServings;
      var potassium = Math.floor(foodXhr.response.recipe.totalDaily.K.quantity) / amountOfServings;
      var magnesium = Math.floor(foodXhr.response.recipe.totalDaily.MG.quantity) / amountOfServings;
      var sodium = Math.floor(foodXhr.response.recipe.totalDaily.NA.quantity) / amountOfServings;
      var vitaminE = Math.floor(foodXhr.response.recipe.totalDaily.TOCPHA.quantity) / amountOfServings;
      var vitaminB6 = Math.floor(foodXhr.response.recipe.totalDaily.VITB6A.quantity) / amountOfServings;
      var vitaminD = Math.floor(foodXhr.response.recipe.totalDaily.VITD.quantity) / amountOfServings;
      var zinc = Math.floor(foodXhr.response.recipe.totalDaily.ZN.quantity) / amountOfServings;
      var ingredients = [];
      console.log('cholesterol', cholesterol);
      console.log('calcium', calcium);
      console.log('iron', iron);
      console.log('potassium', potassium);

      console.log('magnesium', magnesium);

      console.log('sodium', sodium);

      console.log('vitE', vitaminE);

      console.log('vitB6', vitaminB6);
      console.log('vitD', vitaminD);
      console.log('zinc', zinc);

      var imageContainer = document.createElement('div');
      imageContainer.setAttribute('class', 'row column-width90 margin-top10');
      $detailedRecipeContainer.appendChild(imageContainer);

      var imageElement = document.createElement('img');
      imageElement.setAttribute('class', 'detailed-view-image border-radius5');
      imageElement.setAttribute('src', foodXhr.response.recipe.image);
      imageContainer.appendChild(imageElement);

      var linkElement = document.createElement('a');
      linkElement.setAttribute('class', 'instruction-link margin-top10 border-radius5');
      linkElement.setAttribute('href', foodXhr.response.recipe.url);
      linkElement.textContent = 'Instruction';
      $detailedRecipeContainer.appendChild(linkElement);

      // detailed info
      var detailedNutritionContainer = document.createElement('div');
      detailedNutritionContainer.setAttribute('class', 'row row-column column-width90 border-radius-all margin-top10');
      $detailedRecipeContainer.appendChild(detailedNutritionContainer);

      var recipeHeader = document.createElement('div');
      recipeHeader.setAttribute('class', 'column-width95');
      detailedNutritionContainer.appendChild(recipeHeader);

      var headerRecipeName = document.createElement('h2');
      headerRecipeName.setAttribute('class', 'padding-bottom10');
      headerRecipeName.textContent = recipeName;
      recipeHeader.appendChild(headerRecipeName);

      var headerTextContainer = document.createElement('div');
      headerTextContainer.setAttribute('class', 'column-width95 row border-bottom-grey');
      recipeHeader.appendChild(headerTextContainer);

      var headerTextContainerLeft = document.createElement('p');
      headerTextContainerLeft.textContent = 'Nutrition Information';
      headerTextContainerLeft.setAttribute('class', 'column-width50 nutrition-text-small');
      headerTextContainer.appendChild(headerTextContainerLeft);

      var headerTextContainerRight = document.createElement('p');
      headerTextContainerRight.textContent = '% Daily Value';
      headerTextContainerRight.setAttribute('class', 'column-width50 nutrition-text-small');
      headerTextContainer.appendChild(headerTextContainerRight);
      // BASIC NUTRITION DETAILS

      var basicAndDetailsContainer = document.createElement('div');
      basicAndDetailsContainer.setAttribute('class', 'row column-width95');

      var nutritionLeftContainer = document.createElement('div');
      nutritionLeftContainer.setAttribute('class', 'row column-width50');
      detailedNutritionContainer.appendChild(basicAndDetailsContainer);

      var nutritionBasicNames = document.createElement('div');
      nutritionBasicNames.setAttribute('class', 'column-width50');
      nutritionLeftContainer.appendChild(nutritionBasicNames);
      basicAndDetailsContainer.appendChild(nutritionLeftContainer);

      var paragraphElCalories = document.createElement('p');
      paragraphElCalories.setAttribute('class', 'value-text-thick');
      paragraphElCalories.textContent = 'Calories:';
      nutritionBasicNames.appendChild(paragraphElCalories);

      var paragraphElSugar = document.createElement('p');
      paragraphElSugar.setAttribute('class', 'value-text-thick');
      paragraphElSugar.textContent = 'Sugar:';
      nutritionBasicNames.appendChild(paragraphElSugar);

      var paragraphElProtein = document.createElement('p');
      paragraphElProtein.setAttribute('class', 'value-text-thick');
      paragraphElProtein.textContent = 'Protein:';
      nutritionBasicNames.appendChild(paragraphElProtein);

      var paragraphElCarbs = document.createElement('p');
      paragraphElCarbs.setAttribute('class', 'value-text-thick');
      paragraphElCarbs.textContent = 'Carbs:';
      nutritionBasicNames.appendChild(paragraphElCarbs);
      // BASIC VALUES LEFT
      var nutritionBasicLeftValues = document.createElement('div');
      nutritionBasicLeftValues.setAttribute('class', 'column-width50');
      nutritionLeftContainer.appendChild(nutritionBasicLeftValues);

      var paragraphElCaloriesAPI = document.createElement('p');
      paragraphElCaloriesAPI.textContent = calories + 'kcal';
      nutritionBasicLeftValues.appendChild(paragraphElCaloriesAPI);

      var paragraphElSugarAPI = document.createElement('p');
      paragraphElSugarAPI.textContent = sugar + 'g';
      nutritionBasicLeftValues.appendChild(paragraphElSugarAPI);

      var paragraphElProteinAPI = document.createElement('p');
      paragraphElProteinAPI.textContent = protein + 'g';
      nutritionBasicLeftValues.appendChild(paragraphElProteinAPI);

      var paragraphElCarbsAPI = document.createElement('p');
      paragraphElCarbsAPI.textContent = carbs + 'g';
      nutritionBasicLeftValues.appendChild(paragraphElCarbsAPI);

      var nutritionRightContainer = document.createElement('div');
      nutritionRightContainer.setAttribute('class', 'row column-width50');
      basicAndDetailsContainer.appendChild(nutritionRightContainer);

      // MINERAL VALUES
      var mineralNames = document.createElement('div');
      mineralNames.setAttribute('class', 'column-width50');
      nutritionRightContainer.appendChild(mineralNames);
      // MINERAL NAMES
      var paragraphElCholesterol = document.createElement('p');
      paragraphElCholesterol.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElCholesterol.textContent = 'Cholesterol:';
      mineralNames.appendChild(paragraphElCholesterol);

      var paragraphElCalcium = document.createElement('p');
      paragraphElCalcium.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElCalcium.textContent = 'Calcium:';
      mineralNames.appendChild(paragraphElCalcium);

      var paragraphElIron = document.createElement('p');
      paragraphElIron.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElIron.textContent = 'Iron:';
      mineralNames.appendChild(paragraphElIron);

      var paragraphElPotassium = document.createElement('p');
      paragraphElPotassium.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElPotassium.textContent = 'Potassium:';
      mineralNames.appendChild(paragraphElPotassium);

      var paragraphElMagnesium = document.createElement('p');
      paragraphElMagnesium.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElMagnesium.textContent = 'Magnesium:';
      mineralNames.appendChild(paragraphElMagnesium);

      var paragraphElSodium = document.createElement('p');
      paragraphElSodium.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElSodium.textContent = 'Sodium:';
      mineralNames.appendChild(paragraphElSodium);

      var paragraphElVitaminE = document.createElement('p');
      paragraphElVitaminE.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElVitaminE.textContent = 'Vitamin E:';
      mineralNames.appendChild(paragraphElVitaminE);

      var paragraphElVitaminB6 = document.createElement('p');
      paragraphElVitaminB6.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElVitaminB6.textContent = 'Vitamin B6:';
      mineralNames.appendChild(paragraphElVitaminB6);

      var paragraphElVitaminD = document.createElement('p');
      paragraphElVitaminD.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElVitaminD.textContent = 'Vitamin D:';
      mineralNames.appendChild(paragraphElVitaminD);

      var paragraphElZinc = document.createElement('p');
      paragraphElZinc.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElZinc.textContent = 'Zinc:';
      mineralNames.appendChild(paragraphElZinc);
      // MINERAL DAILY VALUES

      var mineralDailyValues = document.createElement('div');
      mineralDailyValues.setAttribute('class', 'column-width50');

      // basicAndDetailsContainer.appendChild(nutritionRightContainer);

      var paragraphElCholesterolDailyValue = document.createElement('p');
      paragraphElCholesterolDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElCholesterolDailyValue.textContent = cholesterol + '%';
      mineralDailyValues.appendChild(paragraphElCholesterolDailyValue);

      var paragraphElCalciumDailyValue = document.createElement('p');
      paragraphElCalciumDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElCalciumDailyValue.textContent = calcium + '%';
      mineralDailyValues.appendChild(paragraphElCalciumDailyValue);

      var paragraphElIronDailyValue = document.createElement('p');
      paragraphElIronDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElIronDailyValue.textContent = iron + '%';
      mineralDailyValues.appendChild(paragraphElIronDailyValue);

      var paragraphElPotassiumDailyValue = document.createElement('p');
      paragraphElPotassiumDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElPotassiumDailyValue.textContent = potassium + '%';
      mineralDailyValues.appendChild(paragraphElPotassiumDailyValue);

      var paragraphElMagnesiumDailyValue = document.createElement('p');
      paragraphElMagnesiumDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElMagnesiumDailyValue.textContent = magnesium + '%';
      mineralDailyValues.appendChild(paragraphElMagnesiumDailyValue);

      var paragraphElSodiumDailyValue = document.createElement('p');
      paragraphElSodiumDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElSodiumDailyValue.textContent = sodium + '%';
      mineralDailyValues.appendChild(paragraphElSodiumDailyValue);

      var paragraphElVitaminEDailyValue = document.createElement('p');
      paragraphElVitaminEDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElVitaminEDailyValue.textContent = vitaminE + '%';
      mineralDailyValues.appendChild(paragraphElVitaminEDailyValue);

      var paragraphElVitaminB6DailyValue = document.createElement('p');
      paragraphElVitaminB6DailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElVitaminB6DailyValue.textContent = vitaminB6 + '%';
      mineralDailyValues.appendChild(paragraphElVitaminB6DailyValue);

      var paragraphElVitaminDDailyValue = document.createElement('p');
      paragraphElVitaminDDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElVitaminDDailyValue.textContent = vitaminD + '%';
      mineralDailyValues.appendChild(paragraphElVitaminDDailyValue);

      var paragraphElZincDailyValue = document.createElement('p');
      paragraphElZincDailyValue.setAttribute('class', 'value-text-thick value-text-small');
      paragraphElZincDailyValue.textContent = zinc + '%';
      mineralDailyValues.appendChild(paragraphElZincDailyValue);

      nutritionRightContainer.appendChild(mineralDailyValues);
    }
    );
  }
  foodXhr.send();

}

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
/*
 var cholesterol = Math.floor(foodXhr.response.recipe.totalDaily.CHOLE.quantity) / amountOfServings;
      var calcium = Math.floor(foodXhr.response.recipe.totalDaily.CA.quantity) / amountOfServings;
      var iron = Math.floor(foodXhr.response.recipe.totalDaily.FE.quantity) / amountOfServings;
      var potassium = Math.floor(foodXhr.response.recipe.totalDaily.K.quantity) / amountOfServings;
      var magnesium = Math.floor(foodXhr.response.recipe.totalDaily.MG.quantity) / amountOfServings;
      var sodium = Math.floor(foodXhr.response.recipe.totalDaily.NA.quantity) / amountOfServings;
      var vitaminE = Math.floor(foodXhr.response.recipe.totalDaily.TOCPHA.quantity) / amountOfServings;
      var vitaminB6 = Math.floor(foodXhr.response.recipe.totalDaily.VITB6A.quantity) / amountOfServings;
      var vitaminD = Math.floor(foodXhr.response.recipe.totalDaily.VITD.quantity) / amountOfServings;
      var zinc = Math.floor(foodXhr.response.recipe.to */
