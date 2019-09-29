/// Variables and data ///
// Global list of selected items: updates everytime a taco is submitted 
var currItemsList = {
	shells: [],
	baseLayers: [],
	mixins: [],
	condiments: [],
	seasonings: []
};

var allItemsList = {
	shells: [],
	baseLayers: [],
	mixins: [],
	condiments: [],
	seasonings: []
};

var generatedList = {
		shells: [],
		baseLayers: [],
		mixins: [],
		condiments: [],
		seasonings: []
};

// Variable that update modes in JQuery.
var randomMode = true;
// Variable to make ids for made tacos.
var idCount = 0;

// Categories for ingredients.
var categories = ["shells", "baseLayers", "mixins", "condiments", "seasonings"];

// When submit button is clicked, add taco!
window.onload = function() {
	document.getElementById("submit-button").onclick = function() {
		if (!randomMode) {
			if (checkValidTaco()) {
				addUserTaco();
				clearItemsList();	
			}
		} else {
			addRandomTaco();
			clearItemsList();
		}
	}
};

//Clears ingredient list after making a taco.
function clearItemsList() {
	currItemsList = {
		shells: [],
		baseLayers: [],
		mixins: [],
		condiments: [],
		seasonings: []
	}

	generatedList = {
		shells: [],
		baseLayers: [],
		mixins: [],
		condiments: [],
		seasonings: []
	}

	var elements = document.getElementsByClassName("item");
	for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = "#A4FCA0";
	}
};

function addRandomTaco() {
	for (key in allItemsList) {
		var arr = allItemsList[key];
		generatedList[key].push(arr[Math.floor(Math.random()*arr.length)]);
	}

	var newTaco = makeTaco(generatedList, "random-tacos");
};

//Assuming that the criteria of taco is fulfilled. Add to tacoIdDict
function addUserTaco() {
	makeTaco(currItemsList, "user-made-tacos");
};

// Generic taco object maker.
function makeTaco(itemsList, category) {
	idCounter = idCount;
	const taco = {
		tid: idCount,
		shells: stringify(itemsList["shells"]),
		baseLayers: stringify(itemsList["baseLayers"]),
		mixins: stringify(itemsList["mixins"]),
		condiments: stringify(itemsList["condiments"]),
		seasonings: stringify(itemsList["seasonings"])
	};

	var lst = document.getElementById(category);
	var container = document.createElement("li");
	container.setAttribute("id", getTacoID(taco)); //item.slug + index
	container.setAttribute("class", "taco");;
	var itemName = document.createTextNode(getTacoSentence(taco));
	var br = document.createElement("br");
		
	container.appendChild(itemName);
	lst.appendChild(container);
	container.style.cssText = 'font-size: 70%; font-weight: bold; margin: 10px; text-align: left;';

	idCount += 1;
	return taco;
};

function getTacoSentence(taco) {
	return "A taco consisting of: " + taco.shells + taco.baseLayers + taco.mixins + taco.condiments + taco.seasonings;
};

function stringify(arrOfIng) {
	var arrayLength = arrOfIng.length;

	if (arraysEqual(arrOfIng, currItemsList["seasonings"]) || arraysEqual(arrOfIng, generatedList["seasonings"])) {
		var builder = "";
		for (var i = 0; i < arrayLength - 1; i++) {
			builder += arrOfIng["seasonings"][i] + ", ";
		}
		builder += "and " + arrOfIng[arrayLength - 1] + ".";
	} else {
		var builder = "";
		for (var i = 0; i < arrayLength; i++) {
			builder += arrOfIng[i] + ", "
		}
	}	
	return builder;
};

function stringifyLast(arrayLength, arrOfIng, lst) {
	var builder = "";
		for (var i = 0; i < arrayLength - 1; i++) {
			builder += arrOfIng["seasonings"][i] + ", ";
		}
		builder += "and " + arrOfIng["seasonings"][arrayLength - 1] + ".";
}

function checkValidTaco() {
	for (key in currItemsList) {
		if (currItemsList[key].length == 0) {
 			alert("Oops! Looks like you're missing certain important parts of a complete taco! Please add at least one of each of the ingredients!");
 			return false;
 		}
	}
	return true;
};

function deleteTaco(tid) {
	document.getElementById(tid).remove();
}

// some unique taco key
function getTacoID(taco){
  return taco.tid;
};

function removeIngredient(sect, ingName) {
	var partsArray = sect.split(' ');
	var section = partsArray[1];
	var index = currItemsList[section].indexOf(ingName);
	if (index > -1) {
  		currItemsList[section].splice(index, 1);
	}
};

function addIngredient(sect, ingName) {
	var partsArray = sect.split(' ');
	var section = partsArray[1];
	currItemsList[section].push(ingName);
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

categories.forEach(function (item, index) {
  getJSONfile('https://ct-tacoapi.azurewebsites.net/' + item, function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
}, item);
});

// Function to manage JSON url requests
function getJSONfile(url, callback, category) {
	var request = new XMLHttpRequest()
	request.open('GET', url, true);
	request.onload = function() {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			// Loop through the array of dictionaries
			data.forEach(function (item, index) {
				var lst = document.getElementById(category);
				var container = document.createElement("li");
				container.setAttribute("class", "item " + category); //item.slug + index
				container.setAttribute("id", item.name);
				var itemName = document.createTextNode(item.name);
				var br = document.createElement("br");
 				
    			container.appendChild(itemName);
    			lst.appendChild(container);
				container.style.cssText = 'font-size: 70%; font-weight: bold; padding: 5px;';

				allItemsList[category].push(item.name);
	 		});
		} else {
			console.log('error');
		}
	}
	request.send()
};


//JQuery basic animation functionality for the action buttons.
$(document).ready(function() {
 	$("#error-displayer").hide();
 	$("#activity-container-right").hide();
 	$("#activity-container-left").css("width", "100%");


 	console.log("Elementary, my dear.");

 	// Clicking on an ingredient!
 	$(document).on("click", '.item', function() {
    	//console.log("Clicked an item!");
    	if ($(this).css('background-color') == 'rgb(255, 155, 0)') {
            $(this).css('background-color', '#A4FCA0');
            removeIngredient($(this).attr('class'), $(this).attr('id'));
        } else {
    		$(this).css("background-color", 'rgb(255, 155, 0)');
    		addIngredient($(this).attr('class'), $(this).attr('id'));
    	}
	});

	// Clicking on generated taco!
 	$(document).on("click", '.taco', function() {
    	//console.log("Clicked a taco!");
    	if (confirm('You are about to delete a delicious taco! Delete it anyway?')) {
    		deleteTaco($(this).attr('id')); //based on tid
		}
	});

 	// Random Mode ON
 	$("#button1").click(function(){
 		$("#activity-container-left").hide();
 		$("#activity-container-right").hide();
 		$("#activity-container-left").css("width", "100%");
 		$("#activity-container-left").fadeIn(1000);
 		randomMode = true;
 	});

 	// Make Your Own Taco ON
 	$("#button2").click(function(){
 		$("#activity-container-left").hide();
 		$("#activity-container-left").css("width", "65%");
 		$("#activity-container-right").css("width", "35%");
 		$("#activity-container-left").fadeIn(1000);
 		$("#activity-container-right").fadeIn(1000);
 		randomMode = false;
 	});
 });