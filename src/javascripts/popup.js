function shortenURL(f) {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var longUrl = encodeURIComponent(tabs[0].url);
    apiKey = "83830B51C0B1H08CG8C0";
    apiUrl = "http://tiny-url.info/api/v1/create";

    provider = "tinyurl_com";
    chrome.storage.local.get(['provider'], function (result) {
      if(result.provider != undefined)
        provider = result.provider;
        var URL = apiUrl + "?apikey=" + apiKey + "&format=text&provider=" + provider + "&url=" + longUrl;
        console.log(URL);
        sendRequest(URL, f);
    });
  });

}

function sendRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function addDiv(value) {
  var container = document.getElementById("container");
  var newDiv = document.createElement("div");

  newDiv.innerHTML = value;
  newDiv.style.position = "absolute";

  container.appendChild(newDiv);
  return newDiv;
}

window.onload = function() {
  var callback = function(url) {
    document.getElementById("shorturl").innerHTML = url;

    var newDiv = addDiv('<input type="text" id="copytxt" />');
    var field = document.getElementById("copytxt");

    field.value = url;
    field.select();
    document.execCommand("Copy");

    container.removeChild(newDiv);

    document.getElementById("status").innerHTML = "copied";
  }
  shortenURL(callback);
}
