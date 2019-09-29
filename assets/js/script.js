/////////////////////////////////////////////INFORMATION AND SOURCE////////////////////////////////////////////////////////
//	Designed and created by: Mae Wang
//  API Source: https://ct-tacoapi.azurewebsites.net
//	
//	Assumptions and Protocols:
//		1. A taco is strictly defined as having 1 shell, 1 base layer, 1 mixin, 1 condiment, and 1 seasoning, at minimum.
//		2. No threshold limitations are added for stretch goal 3. Users are assumed to put however much they like. 
//		   No taco-lover should ever be limited!
//		3. Random taco mode gives a taco of exactly 1 shell, 1 base layer, 1 mixin, 1 condiment, and 1 seasoning.
//		4. To remove a submitted taco from the list, hover over a taco description and click on it. A confirmation pop-up will appear.
//		5. To add ingredients to a taco, hover over the selections under "Ingredients" on the right-hand side and click on an ingredient.
//		   To deselect an ingredient, re-click the selection again.
//		6. Navigate between buttons 'Make Random', 'Make My Own', and 'Generate Taco' accordingly.
//		7. 'Make Random' is for generating randomized tacos when the 'Generate Taco' button is pressed.
//		8. 'Make My Own' is for generating user-defined tacos when the 'Generate Taco' button is pressed. Options under 'Ingredients'
//		   must be clicked and validated to generate a taco.
//
//	Build Instructions:	
//		1. First, the layout of the HTML file was created with the appropriate divs, classes, and ids for hierarchy. 
//		2. Next, the CSS file was implemented with a clear design in mind. Here, the front-end was complete and was 
//		   slightly modified during the process of implementing the back-end.
//		3. Then, basic animations and small action listener interactions were implemented on buttons using JQuery. There was a minor preference 
//		   to use JavaScript on the submission button action listener function.
//		4. JavaScript was used for the rest of the process in script.js. JSON parsing and storing was implemented for future access.
//		5. The 'Make My Own' functionalities were implemented using multiple functions that interlinked with each other. Action listener responses were
//		   dealt with JQuery and JavaScript DOM methods.
//		6. The 'Make Random' functionalities were implemented using existing 'Make My Own' functions. Dictionaries/Objects were mainly used for data storage.
//		7. Lastly, deletion properties and bugs were fixed. Program was tested thoroughly for obvious bugs.
//		
////////////////////////////////////////// Variables and data lists ///////////////////////////////////////////////////////

// Global lists of selected items:
// Updates everytime an ingredient was selected or a taco is submitted.
var currItemsList = {
	shells: [],
	baseLayers: [],
	mixins: [],
	condiments: [],
	seasonings: []
};

// A collection of the entire JSON files in one location (for randomization).
var allItemsList = {
	shells: [],
	baseLayers: [],
	mixins: [],
	condiments: [],
	seasonings: []
};

// Randomized data for random tacos. Updates everytime a random taco is submitted.
var generatedList = {
		shells: [],
		baseLayers: [],
		mixins: [],
		condiments: [],
		seasonings: []
};

// Variable that update modes in JQuery.
var randomMode = true;

// Variable to make ids for submitted tacos.
var idCount = 0;

// Categories for ingredients.
var categories = ["shells", "baseLayers", "mixins", "condiments", "seasonings"];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// Clears ingredient lists and color markers after making a taco.
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
// Generates one random ingredient per section, makes the taco, and publishes it immediately.
function addRandomTaco() {
	for (key in allItemsList) {
		var arr = allItemsList[key];
		generatedList[key].push(arr[Math.floor(Math.random()*arr.length)]);
	}
	var newTaco = makeTaco(generatedList, "random-tacos");
};

// Generates a build-your-own-taco, assuming that the criteria of taco is fulfilled. Taco is published immediately.
function addUserTaco() {
	makeTaco(currItemsList, "user-made-tacos");
};

// Generic taco object maker. This function does the publishing.
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

// Generates the general taco sentence output.
function getTacoSentence(taco) {
	return "A taco consisting of: " + taco.shells + taco.baseLayers + taco.mixins + taco.condiments + taco.seasonings;
};

// Helper function for getTacoSentence(taco) by adding punctuation and returning a string of an ingredient category.
function stringify(arrOfIng) {
	var arrayLength = arrOfIng.length;

	if (arraysEqual(arrOfIng, currItemsList["seasonings"]) || arraysEqual(arrOfIng, generatedList["seasonings"])) {
		var builder = "";
		for (var i = 0; i < arrayLength - 1; i++) {
			builder += arrOfIng[i] + ", ";
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

// Validates the user's selections in ingredients and returns a boolean.
function checkValidTaco() {
	for (key in currItemsList) {
		if (currItemsList[key].length == 0) {
 			alert("Oops! Looks like you're missing certain important parts of a complete taco! Please add at least one of each of the ingredients!");
 			return false;
 		}
	}
	return true;
};

// Removes the taco with a tid (taco ID) from a list
function deleteTaco(tid) {
	document.getElementById(tid).remove();
};

// Returns a unique taco key tid
function getTacoID(taco){
  return taco.tid;
};

// Removes ingredient from the tracking list if the user deselects an ingredient item.
function removeIngredient(sect, ingName) {
	var partsArray = sect.split(' ');
	var section = partsArray[1];
	var index = currItemsList[section].indexOf(ingName);
	if (index > -1) {
  		currItemsList[section].splice(index, 1);
	}
};

// Adds ingredient to the tracking list if the user selects an ingredient item.
function addIngredient(sect, ingName) {
	var partsArray = sect.split(' ');
	var section = partsArray[1];
	currItemsList[section].push(ingName);
};

// Generic equals() function.
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

// Runs all ClickTime taco API url requests
categories.forEach(function (item, index) {
  getJSONfile('https://ct-tacoapi.azurewebsites.net/' + item, function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
}, item);
});

// Function to manage JSON url requests.
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


// JQuery basic animation functionality for the action buttons.
$(document).ready(function() {
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