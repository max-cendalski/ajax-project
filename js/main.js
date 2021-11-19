var $form = document.querySelector('#form');
var $list = document.querySelector('#list');
var recipeName = '';
var calories = '';
var sugar = '';
var protein = '';
var carbs = '';
var recipeImage = '';
var amountOfServings = 0;

function renderEntry(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'column-full margin-top20 border-radius10');
  // liElement.setAttribute('data-entry', entry.entry.id);

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
  headerElement.textContent = recipeName;
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
}

$form.addEventListener('submit', handleFormSubmit);

/* var foodXhr = new XMLHttpRequest();
var name = 'banana pudding';
var caloriesRange = '100-200';
var diet = 'balanced';
foodXhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=' + name + '&app_id=e39dceb5&app_key=bffe580698b9b315c25ae296cfb28114&diet=' + diet + '&cuisineType=American&calories=' + caloriesRange + '&imageSize=SMALL&nutrients%5BCHOCDF%5D=10-600&nutrients%5BPROCNT%5D=0-7');
foodXhr.responseType = 'json';
foodXhr.addEventListener('load', function () {
  console.log('response statuts: ', foodXhr.status);
  console.log('response object', foodXhr.response);
  console.log('response object', foodXhr.response.hits[1]);
  console.log('recipes name: ', foodXhr.response.hits[1].recipe.label);
  console.log('recipes image: ', foodXhr.response.hits[1].recipe.image);
  console.log('recipes instruction: ', foodXhr.response.hits[1].recipe.url);
  console.log('recipes ingredients: ', foodXhr.response.hits[1].recipe.ingredients[0].text);
  console.log('recipes ingredients: ', foodXhr.response.hits[1].recipe.ingredients[1].text);
  console.log('recipes ingredients: ', foodXhr.response.hits[1].recipe.ingredients[2].text);
  console.log('TOTAL DAILY CALCIUM: ', Math.floor(foodXhr.response.hits[1].recipe.totalDaily.CA.quantity));
  console.log('TOTAL DAILY CALCIUM: ', foodXhr.response.hits[1].recipe.totalDaily.CA.unit);
  console.log('amount of servings: ', foodXhr.response.hits[1].recipe.yield);
  console.log('amount of calories: ', Math.floor(foodXhr.response.hits[1].recipe.calories));
  console.log('nutriton type: ', foodXhr.response.hits[1].recipe.totalNutrients.PROCNT.label);
  console.log('nutrition quantity: ', foodXhr.response.hits[1].recipe.totalNutrients.PROCNT.quantity);
  console.log('nutriton type: ', foodXhr.response.hits[1].recipe.totalNutrients.CHOCDF.label);
  console.log('nutrition quantity: ', foodXhr.response.hits[1].recipe.totalNutrients.CHOCDF.quantity);
  console.log('nutriton type: ', foodXhr.response.hits[1].recipe.totalNutrients.SUGAR.label);
  console.log('nutrition quantity :', foodXhr.response.hits[1].recipe.totalNutrients.SUGAR.quantity);
});
foodXhr.send(); */
