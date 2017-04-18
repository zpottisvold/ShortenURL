function init() {
  document.getElementById("save").onclick = save_options

  restore_options();
  loadProviders();
}

function loadProviders() {
  var select = document.getElementById("providers");

  for (var i = 0; i <= providerlist.length - 1; i++) {
    var newOption = document.createElement("option");
    newOption.setAttribute("value", providerlist[i]);
    newOption.innerHTML = providerlist[i].replace("_", ".");

    select.appendChild(newOption);
  };
}

// Saves options to localStorage.
function save_options() {
  var element = document.getElementById("providers");
  var provider = element.options[element.selectedIndex].value;

  chrome.storage.local.set({'provider': provider});

  var container = document.getElementById("container");
  container.setAttribute("class", "flash");
  setTimeout(function() {
    container.removeAttribute("class");
  }, 500);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var provider = "";

  chrome.storage.local.get(['provider'], function (result) {
    provider = result.provider;

    if(provider != undefined) {
      var listOfProviders = document.getElementById("providers").options;
      var index = 0;
      for (var i = 0; i <= listOfProviders.length - 1; i++) {
        if(listOfProviders[i].value == provider)
          index = i;
      };
      select = document.getElementById("providers");
      select.selectedIndex = index;
    }
  });
}
var providerlist = ["b54_in", "bit_ly", "j_mp", "tinyurl_com"]

window.onload = init;
