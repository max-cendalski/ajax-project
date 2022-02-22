/* exported data */

var data = {
  entries: [],
  basicSearchArray: [],
  detailRecipeObject: {}
};

var previousDataJson = localStorage.getItem('favorite-recipes');
if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

function handleBeforUnload() {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('favorite-recipes', dataJSON);
}

window.addEventListener('beforeunload', handleBeforUnload);
