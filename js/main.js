
var $form = document.querySelector('#form');
var $list = document.querySelector('#list');
var $views = document.querySelectorAll('.view');
var $addOptionButton = document.querySelector('.add-option-button');
var $nutritionChoice = document.querySelector('#nutrients-choice');
var $minMaxContainer = document.querySelector('.min-max-container');
var $detailedRecipeContainer = document.querySelector('#detailed-recipe-container');
var $favoriteIcon = document.querySelector('#favorite-icon');
var $favoriteList = document.querySelector('#favorite-list');
var $goToMainPageFromDetailed = document.querySelector('#go-to-main-page-detailed');
var $goToMainPageFromFavorites = document.querySelector('#go-to-main-page-favorites');
var $mainHeader = document.querySelector('#main-header');

var sugarCount = 0;
var proteinCount = 0;
var carbsCount = 0;
var selectNutritionName = '';
var favoriteIcon = null;
var deleteIcon = null;

function renderBasicRecipeInfo(data) {

  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'box-shadow5 column-width90 margin-top20 border-radius10');
  liElement.setAttribute('data-recipeId', data.recipeId);
  $list.appendChild(liElement);

  var mainRow = document.createElement('div');
  mainRow.setAttribute('class', 'row li-element flex-wrap');
  liElement.appendChild(mainRow);

  var imageContainer = document.createElement('div');
  imageContainer.setAttribute('class', 'column-width40 image-container');
  mainRow.appendChild(imageContainer);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', data.recipeImage);
  imageContainer.appendChild(imageElement);

  var columnWidth60 = document.createElement('div');
  columnWidth60.setAttribute('class', 'column-width60');
  mainRow.appendChild(columnWidth60);

  var headerContainer = document.createElement('div');
  headerContainer.setAttribute('class', 'header-container');
  columnWidth60.appendChild(headerContainer);

  var headerElement = document.createElement('h3');
  headerElement.textContent = data.recipeName.slice(0, 30);
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
  paragraphElCaloriesAPI.textContent = data.calories + 'kcal';
  innerColumnWidth60.appendChild(paragraphElCaloriesAPI);

  var paragraphElSugarAPI = document.createElement('p');
  paragraphElSugarAPI.textContent = data.sugar + 'g';
  innerColumnWidth60.appendChild(paragraphElSugarAPI);

  var paragraphElProteinAPI = document.createElement('p');
  paragraphElProteinAPI.textContent = data.protein + 'g';
  innerColumnWidth60.appendChild(paragraphElProteinAPI);

  var paragraphElCarbsAPI = document.createElement('p');
  paragraphElCarbsAPI.textContent = data.carbs + 'g';
  innerColumnWidth60.appendChild(paragraphElCarbsAPI);

  var paragraphElInfo = document.createElement('p');
  paragraphElInfo.textContent = '* all values are for one portion';
  paragraphElInfo.setAttribute('class', 'info-text-small');
  headerContainer.appendChild(paragraphElInfo);

  return liElement;
}

function renderRecipeDetailes(recipe) {

  var detailedLiElement = document.createElement('li');
  detailedLiElement.setAttribute('data-recipeid', recipe['data-recipeid']);
  detailedLiElement.setAttribute('class', ' row flex-column column-width95 border-bottom-green padding-bottom20');

  var imageAndLinksContainer = document.createElement('div');
  imageAndLinksContainer.setAttribute('class', 'column-width90 image-links-container');
  detailedLiElement.appendChild(imageAndLinksContainer);

  var imageContainer = document.createElement('div');
  imageContainer.setAttribute('class', 'detailed-image-container margin-top10');
  imageAndLinksContainer.appendChild(imageContainer);
  detailedLiElement.appendChild(imageAndLinksContainer);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'box-shadow5 border-radius5');
  imageElement.setAttribute('src', recipe.recipeImage);
  imageContainer.appendChild(imageElement);

  var linkElement = document.createElement('a');
  linkElement.setAttribute('class', 'box-shadow5 instruction-link margin-top10 border-radius5');
  linkElement.setAttribute('href', recipe.url);
  linkElement.textContent = 'Instruction';
  imageAndLinksContainer.appendChild(linkElement);

  // DETAILED NUTRITION SECTION

  var detailedNutritionContainer = document.createElement('div');
  detailedNutritionContainer.setAttribute('class', 'column-width90 border-radius-all margin-top10 ');
  detailedLiElement.appendChild(detailedNutritionContainer);

  var recipeHeader = document.createElement('div');
  recipeHeader.setAttribute('class', 'column-full border-bottom-grey padding-left10');
  detailedNutritionContainer.appendChild(recipeHeader);

  var recipeHeaderName = document.createElement('h2');
  recipeHeaderName.setAttribute('class', 'column-width95 inline-element padding-top5 padding-bottom10');
  recipeHeaderName.textContent = recipe.recipeName;
  recipeHeader.appendChild(recipeHeaderName);

  favoriteIcon = document.createElement('div');
  favoriteIcon.setAttribute('class', 'inline-element favorite-icon fas fa-star fa-sm column-width5 hidden');
  recipeHeader.appendChild(favoriteIcon);

  deleteIcon = document.createElement('div');
  deleteIcon.setAttribute('class', 'inline-element delete-icon fa-solid fa-trash-can fa-sm column-width5');
  recipeHeader.appendChild(deleteIcon);

  var headerTextContainer = document.createElement('div');
  headerTextContainer.setAttribute('class', 'column-full row');
  recipeHeader.appendChild(headerTextContainer);

  var headerTextContainerLeft = document.createElement('p');
  headerTextContainerLeft.textContent = 'Nutrition Information';
  headerTextContainerLeft.setAttribute('class', 'column-width50 nutrition-text-small');
  headerTextContainer.appendChild(headerTextContainerLeft);

  var headerTextContainerRight = document.createElement('p');
  headerTextContainerRight.textContent = '% Daily Value';
  headerTextContainerRight.setAttribute('class', 'column-width50 nutrition-text-small');
  headerTextContainer.appendChild(headerTextContainerRight);

  // BASIC NUTRITION SECTION

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
  paragraphElCalories.setAttribute('class', 'value-text-thick padding-top10');
  paragraphElCalories.textContent = 'Calories:';
  nutritionBasicNames.appendChild(paragraphElCalories);

  var paragraphElSugar = document.createElement('p');
  paragraphElSugar.setAttribute('class', 'value-text-thick padding-top10');
  paragraphElSugar.textContent = 'Sugar:';
  nutritionBasicNames.appendChild(paragraphElSugar);

  var paragraphElProtein = document.createElement('p');
  paragraphElProtein.setAttribute('class', 'value-text-thick padding-top10');
  paragraphElProtein.textContent = 'Protein:';
  nutritionBasicNames.appendChild(paragraphElProtein);

  var paragraphElCarbs = document.createElement('p');
  paragraphElCarbs.setAttribute('class', 'value-text-thick padding-top10');
  paragraphElCarbs.textContent = 'Carbs:';
  nutritionBasicNames.appendChild(paragraphElCarbs);

  var nutritionBasicLeftValues = document.createElement('div');
  nutritionBasicLeftValues.setAttribute('class', 'column-width50');
  nutritionLeftContainer.appendChild(nutritionBasicLeftValues);

  var paragraphElCaloriesAPI = document.createElement('p');
  paragraphElCaloriesAPI.textContent = recipe.calories + 'kcal';
  paragraphElCaloriesAPI.setAttribute('class', 'padding-top10');
  nutritionBasicLeftValues.appendChild(paragraphElCaloriesAPI);

  var paragraphElSugarAPI = document.createElement('p');
  paragraphElSugarAPI.textContent = recipe.sugar + 'g';
  paragraphElSugarAPI.setAttribute('class', 'padding-top10');
  nutritionBasicLeftValues.appendChild(paragraphElSugarAPI);

  var paragraphElProteinAPI = document.createElement('p');
  paragraphElProteinAPI.textContent = recipe.protein + 'g';
  paragraphElProteinAPI.setAttribute('class', 'padding-top10');
  nutritionBasicLeftValues.appendChild(paragraphElProteinAPI);

  var paragraphElCarbsAPI = document.createElement('p');
  paragraphElCarbsAPI.textContent = recipe.carbs + 'g';
  paragraphElCarbsAPI.setAttribute('class', 'padding-top10');
  nutritionBasicLeftValues.appendChild(paragraphElCarbsAPI);

  var nutritionRightContainer = document.createElement('div');
  nutritionRightContainer.setAttribute('class', 'row column-width50');
  basicAndDetailsContainer.appendChild(nutritionRightContainer);

  // VITAMIN NAMES SECTION

  var $vitaminNamesContainer = document.createElement('div');
  $vitaminNamesContainer.setAttribute('class', 'column-width50');
  nutritionRightContainer.appendChild($vitaminNamesContainer);

  var vitaminNames = ['Cholesterol', 'Calcium', 'Iron', 'Potassium', 'Magnesium', 'Sodium', 'VitaminE', 'VitaminB6', 'VitaminD', 'Zinc'];
  vitaminNames.forEach(name => {
    var item = document.createElement('p');
    item.setAttribute('class', 'value-text-thick value-text-small padding-top5');
    item.textContent = name;
    $vitaminNamesContainer.appendChild(item);
  });

  // DAILY VITAMIN VALUES SECTION

  var vitaminDailyValues = [recipe.cholesterol, recipe.calcium, recipe.iron, recipe.potassium, recipe.magnesium, recipe.sodium, recipe.vitaminE, recipe.vitaminB6, recipe.vitaminD, recipe.zinc];
  var $vitaminDailyValuesContainer = document.createElement('div');
  $vitaminDailyValuesContainer.setAttribute('class', 'column-width50');

  vitaminDailyValues.forEach(item => {
    var value = document.createElement('p');
    value.setAttribute('class', 'value-text-thick value-text-small padding-top5');
    value.textContent = item + '%';
    $vitaminDailyValuesContainer.appendChild(value);
  });

  nutritionRightContainer.appendChild($vitaminDailyValuesContainer);

  // INGREDIENTS SECTION

  var ingredientsSection = document.createElement('div');
  ingredientsSection.setAttribute('class', 'border-top-grey column-full padding-left10 margin-top10');
  detailedNutritionContainer.appendChild(ingredientsSection);

  var ingredientsSectionText = document.createElement('h4');
  ingredientsSectionText.setAttribute('class', 'padding-top-bottom5');
  ingredientsSectionText.textContent = 'Ingredients';
  ingredientsSection.appendChild(ingredientsSectionText);

  var ingredientsListContainer = document.createElement('div');
  ingredientsListContainer.setAttribute('class', 'border-top-grey column-full');
  detailedNutritionContainer.appendChild(ingredientsListContainer);

  recipe.ingredients.forEach((item, index) => {
    var text = document.createElement('p');
    text.setAttribute('class', 'ingredients padding-top5 padding-left10');
    text.textContent = `${index + 1}) ${item}`;
    ingredientsListContainer.appendChild(text);
  });
  return detailedLiElement;
}

switchingViews(window.location.hash);

window.addEventListener('hashchange', function (event) {
  switchingViews(window.location.hash);
  data.view = window.location.hash;
});

function handleFormSubmit(event) {
  var minCalories = 1;
  var maxCalories = 999;

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
    window.location.hash = 'basic-search-view';
    $list.replaceChildren();
    for (var i = 0; i < foodXhr.response.hits.length; i++) {
      var recipeIdString = foodXhr.response.hits[i].recipe.uri;
      var recipeIdHashPosition = recipeIdString.indexOf('#');
      var recipeId = recipeIdString.slice(recipeIdHashPosition + 1);
      var recipeName = foodXhr.response.hits[i].recipe.label;
      var recipeImage = foodXhr.response.hits[i].recipe.image;
      var amountOfServings = foodXhr.response.hits[i].recipe.yield;
      var calories = Math.floor(foodXhr.response.hits[i].recipe.calories / amountOfServings);
      var sugar = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.SUGAR.quantity / amountOfServings);
      var protein = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.PROCNT.quantity / amountOfServings);
      var carbs = Math.floor(foodXhr.response.hits[i].recipe.totalNutrients.CHOCDF.quantity / amountOfServings);
      var resultObject = {
        recipeId,
        recipeName,
        recipeImage,
        calories,
        sugar,
        protein,
        carbs,
        resultObject
      };
      var result = renderBasicRecipeInfo(resultObject);
      $list.appendChild(result);
    }
    if (!foodXhr.response.hits[0]) {
      $list.replaceChildren();
      var noResults = document.createElement('h1');
      noResults.textContent = 'No Recipes Found';
      $list.appendChild(noResults);
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
  $detailedRecipeContainer.replaceChildren();
  $goToMainPageFromDetailed.replaceChildren();
  var dataIdAttribute = event.target.closest('li').getAttribute('data-recipeid');
  switchingViews('detailed-search-view');
  var foodXhr = new XMLHttpRequest();

  var goBackLinkContainer = document.createElement('div');
  goBackLinkContainer.setAttribute('class', 'row column-full');
  var goBack = document.createElement('a');
  goBack.textContent = 'Go Back To Search Result';
  goBack.setAttribute('class', ' box-shadow5 go-back-button');
  goBackLinkContainer.appendChild(goBack);
  $goToMainPageFromDetailed.appendChild(goBackLinkContainer);

  goBack.addEventListener('click', function () {
    window.location.hash = 'basic-search-view';
    $goToMainPageFromDetailed.replaceChildren();
  });
  if (event.target.tagName === 'IMG') {
    $form.className = 'hidden';
    window.location.hash = 'detailed-search-view';
    foodXhr.open('GET', `https://api.edamam.com/api/recipes/v2/%23${dataIdAttribute}?type=public&app_id=e39dceb5&app_key=2ec338c917039673fcf16a477b215f32`);
    foodXhr.responseType = 'json';
    foodXhr.addEventListener('load', function () {
      var ingredients = [];
      var recipeImage = foodXhr.response.recipe.image;
      var amountOfServings = foodXhr.response.recipe.yield;
      var recipeName = foodXhr.response.recipe.label.slice(0, 30);
      var calories = Math.floor((foodXhr.response.recipe.calories) / amountOfServings);
      var sugar = Math.floor((foodXhr.response.recipe.totalNutrients.SUGAR.quantity) / amountOfServings);
      var protein = Math.floor((foodXhr.response.recipe.totalNutrients.PROCNT.quantity) / amountOfServings);
      var carbs = Math.floor((foodXhr.response.recipe.totalNutrients.CHOCDF.quantity) / amountOfServings);
      var cholesterol = Math.floor((foodXhr.response.recipe.totalDaily.CHOLE.quantity) / amountOfServings);
      var calcium = Math.floor((foodXhr.response.recipe.totalDaily.CA.quantity) / amountOfServings);
      var iron = Math.floor((foodXhr.response.recipe.totalDaily.FE.quantity) / amountOfServings);
      var potassium = Math.floor((foodXhr.response.recipe.totalDaily.K.quantity) / amountOfServings);
      var magnesium = Math.floor((foodXhr.response.recipe.totalDaily.MG.quantity) / amountOfServings);
      var sodium = Math.floor((foodXhr.response.recipe.totalDaily.NA.quantity) / amountOfServings);
      var vitaminE = Math.floor((foodXhr.response.recipe.totalDaily.TOCPHA.quantity) / amountOfServings);
      var vitaminB6 = Math.floor((foodXhr.response.recipe.totalDaily.VITB6A.quantity) / amountOfServings);
      var vitaminD = Math.floor((foodXhr.response.recipe.totalDaily.VITD.quantity) / amountOfServings);
      var zinc = Math.floor((foodXhr.response.recipe.totalDaily.ZN.quantity) / amountOfServings);
      var url = foodXhr.response.recipe.url;
      foodXhr.response.recipe.ingredients.forEach(item => {
        ingredients.push(item.text);
      });
      var detailedRecipeObject = {
        'data-recipeid': dataIdAttribute,
        recipeName,
        recipeImage,
        calories,
        sugar,
        protein,
        carbs,
        amountOfServings,
        cholesterol,
        calcium,
        iron,
        potassium,
        magnesium,
        sodium,
        vitaminE,
        vitaminB6,
        vitaminD,
        zinc,
        url,
        ingredients
      };

      var result = renderRecipeDetailes(detailedRecipeObject);
      $detailedRecipeContainer.appendChild(result);
      var $addToFavorites = document.querySelector('.favorite-icon');
      $addToFavorites.addEventListener('click', handleFavorites);
      deleteIcon.setAttribute('class', 'hidden');
      favoriteIcon.classList.remove('hidden');

      function handleFavorites(event) {
        event.preventDefault();
        if (data.entries.length === 0) {
          data.entries.push(detailedRecipeObject);
          var result = renderRecipeDetailes(detailedRecipeObject);
          $favoriteList.replaceChildren();
          $favoriteList.appendChild(result);
        }
        if (data.entries.some(recipe => recipe['data-recipeid'] === dataIdAttribute)) {
          $detailedRecipeContainer.replaceChildren();
          var infoContainer = document.createElement('div');
          infoContainer.setAttribute('class', 'column-full text-centered margin-top20');
          var infoText = document.createElement('h2');
          infoText.setAttribute('class', 'column-width95 margin-top20');
          infoText.textContent = 'Recipe already added to favorites';
          infoContainer.appendChild(infoText);
          $detailedRecipeContainer.appendChild(infoContainer);
        } else {
          data.entries.push(detailedRecipeObject);
          result = renderRecipeDetailes(detailedRecipeObject);
          $favoriteList.appendChild(result);
        }
      }
    }
    );
  }
  foodXhr.send();
}

function switchingViews(newHash) {
  var route = newHash.startsWith('#') ? newHash.replace('#', '') : newHash;
  if (route === '') return;
  if (route === 'homepage' || route === 'basic-search-view') {
    $form.className = 'view';
  }
  if (route === 'favorites' || route === 'detailed-search-view') {
    $form.className = 'hidden';
  }
  for (var viewIndex = 0; viewIndex < $views.length; viewIndex++) {
    if ($views[viewIndex].getAttribute('data-view') !== route) {
      $views[viewIndex].className = 'hidden';
    } else {
      $views[viewIndex].className = 'view';
    }
  }
}

window.addEventListener('DOMContentLoaded', event => {
  if (data.entries.length === 0) {
    var noFavorites = document.createElement('h1');
    noFavorites.textContent = 'No Favorite Recipes';
    $favoriteList.replaceChildren();
    $favoriteList.appendChild(noFavorites);
  }

  var goBackLinkContainer = document.createElement('div');
  goBackLinkContainer.setAttribute('class', 'row column-full');
  var goBack = document.createElement('a');
  goBack.textContent = 'Go Back To Main Page';
  goBack.setAttribute('class', ' box-shadow5 go-back-button');
  goBackLinkContainer.appendChild(goBack);
  $goToMainPageFromFavorites.appendChild(goBackLinkContainer);

  for (var i = 0; i < data.entries.length; i++) {
    var resultObject = {
      recipeImage: data.entries[i].recipeImage,
      'data-recipeid': data.entries[i]['data-recipeid'],
      recipeName: data.entries[i].recipeName,
      calories: data.entries[i].calories,
      sugar: data.entries[i].sugar,
      carbs: data.entries[i].carbs,
      cholesterol: data.entries[i].cholesterol,
      iron: data.entries[i].iron,
      magnesium: data.entries[i].magnesium,
      potassium: data.entries[i].potassium,
      calcium: data.entries[i].calcium,
      protein: data.entries[i].protein,
      sodium: data.entries[i].sodium,
      url: data.entries[i].url,
      vitaminB6: data.entries[i].vitaminB6,
      vitaminD: data.entries[i].vitaminD,
      vitaminE: data.entries[i].vitaminE,
      zinc: data.entries[i].zinc,
      ingredients: data.entries[i].ingredients
    };
    var result = renderRecipeDetailes(resultObject);
    $favoriteList.appendChild(result);
  }

  var $deleteIcon = document.querySelector('#favorite-list');
  $deleteIcon.addEventListener('click', function (event) {
    if (event.target.tagName === 'DIV') {
      var dataIdAttribute = event.target.closest('li').getAttribute('data-recipeid');
      var objectToRemove = data.entries.findIndex(recipe => recipe['data-recipeid'] === dataIdAttribute);
      data.entries.splice(objectToRemove, 1);
      var renderedObjects = document.querySelectorAll('li');
      for (var j = 0; j < renderedObjects.length; j++) {
        if (renderedObjects[j].dataset.recipeid === dataIdAttribute) {
          renderedObjects[j].remove();
        }
      }
      renderedObjects[objectToRemove].remove();
    }
  });

  goBack.addEventListener('click', function () {
    window.location.hash = 'homepage';
  });
});

$favoriteIcon.addEventListener('click', function () {
  event.preventDefault();
  window.location.hash = 'favorites';
});

$mainHeader.addEventListener('click', function () {
  event.preventDefault();
  window.location.hash = 'homepage';
});

$nutritionChoice.addEventListener('click', handleNutritionChoice);
$form.addEventListener('submit', handleFormSubmit);
$addOptionButton.addEventListener('click', handleAddOptionButton);
$list.addEventListener('click', handleImageClick);
