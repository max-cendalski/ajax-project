/* exported data */

var data = {
  view: 'favorites',
  entries: []
};

function handleBeforUnload() {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('favorite-recipes', dataJSON);
}

window.addEventListener('beforeunload', handleBeforUnload);
