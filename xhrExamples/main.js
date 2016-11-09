function onProductIdsLoaded(data) {
    productLookup = data;
    var presentationProductSelect = document.querySelector('.presentation-product');
    Object.keys(productLookup).forEach(function(product){
        var option = document.createElement('option');
        option.value = productLookup[product];
        option.innerHTML = product;
        presentationProductSelect.appendChild(option);
    });
}

function getJson1(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            console.log(JSON.parse(xhr.responseText))
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}

function getJson2(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', url, true);
    xhr.addEventListener("load", function() {
        if (xhr.status < 400) {
            console.log(JSON.parse(xhr.responseText));
            callback(JSON.parse(xhr.responseText));
        }
        else {
            callback(null, new Error("Request failed: " + xhr.statusText));
        }
        
    });
    xhr.addEventListener("error", function() {
        callback(null, new Error("Network error"));
    });
    xhr.send(null);
}

function get(url) {
  return new Promise(function(succeed, fail) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open("GET", url, true);
    xhr.addEventListener("load", function() {
      if (xhr.status < 400) {
        succeed(xhr.responseText);
      }
      else {
          fail(new Error("Request failed: " + xhr.statusText));
      }
    });
    xhr.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    xhr.send(null);
  });
}

function getJSON(url) {
  return get(url).then(function(data) {
        onProductIdsLoaded(JSON.parse(data));
    }, function(error) {
        console.log("Failed to fetch data.txt: " + error);
    });
}

getJSON('./productCatalog.json');
