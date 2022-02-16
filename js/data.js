/* exported data */

var data = {
  entries: [],
  view: 'homepage'
};

var previousDataJson = localStorage.getItem('favorite-recipes');
if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

function handleBeforUnload() {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('favorite-recipes', dataJSON);
  var lastView = window.location.hash;
  data.view = lastView;
}

window.addEventListener('beforeunload', handleBeforUnload);
