/// Variables and data///
//Global list of selected items: updates everytime a taco is submitted 
var currItemsList = {
	shells: [],
	baseLayers: [],
	mixins: [],
	condiments: [],
	seasonings: []
};

//Variable that update modes in JQuery.
var randomMode = true;
var idCount = 0;

//tacoID to taco object dictionary
var tacoIdDict = {};

window.onload = function() {
	document.getElementById("submit-button").onclick = function() {
		if (randomMode) {
			checkValidTaco();
			addUserTaco();
			clearItemsList();
		} else {
			addRandomTaco();
		}
	}
}

function clearItemsList() {
	currItemsList = {
		shells: [],
		baseLayers: [],
		mixins: [],
		condiments: [],
		seasonings: []
	}
}


function addRandomTaco() {
	var randList = {
		shells: [],
		baseLayers: [],
		mixins: [],
		condiments: [],
		seasonings: []
	};
	var newTaco = makeTaco(randList, randomMode);
	tacoIdDict[newTaco[id]] = newTaco;
}

function addUserTaco() {
	makeTaco(currItemsList, randomMode);
}


//generic taco maker
function makeTaco(itemsList, isRandomMode) {
	idCounter = idCount;
	const taco = {
		id: idCount.toString(),
		shells: getArrItems(itemsList[shells]),
		baseLayers: getArrItems(itemsList[baseLayers]),
		mixins: getArrItems(itemsList[mixins]),
		condiments: getArrItems(itemsList[condiments]),
		seasonings: getArrItems(itemsList[seasonings])
	};
	idCount += 1;
	return taco;
};

function checkValidTaco(itemsList) {
	for(var key in Object.keys(dict)){
 		var value = dict[key];
 	}
};

function getArrItems(){

};


function getTacoID(taco){
  // some unique taco key
  return taco[id];
};

//tacoIdDict[key(obj1)] = obj1;
//tacoIdDict[key(obj2)] = obj2;
var categories = ["shells", "baseLayers", "mixins", "condiments", "seasonings"];

categories.forEach(function (item, index) {
  getJSONfile('https://ct-tacoapi.azurewebsites.net/' + item, function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
}, item);
});

//function to manage JSON url requests
function getJSONfile(url, callback, category) {
	var request = new XMLHttpRequest()
	request.open('GET', url, true);
	request.onload = function() {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			data.forEach(function (item, index) {
				console.log(item, index);
				//loop through the array of dictionaries
				var lst = document.getElementById(category);
				var container = document.createElement("li");
				var itemName = document.createTextNode(item.name);
				var br = document.createElement("br");
 				
    			container.appendChild(itemName);
    			lst.appendChild(container);
				container.style.cssText = 'font-size: 70%; font-weight: bold; margin: 5px;';
	 		});
		} else {
			console.log('error');
		}
	}
	request.send()
};

	// console.log('GETTING JSON FILES');
 //    var request = new XMLHttpRequest();
 //    request.open('GET', url, true);
 //    request.responseType = 'json';
 //    request.onload = function() {
 //    	var data = JSON.parse(this.response);
 //    	data.forEach(function (item, index) {
 //  				console.log(item, index);
	// 		});
 //    	if (request.status >= 200 && request.status < 400) {
    		

 //    		// data.forEach(movie => {
 //    		// 	console.log(movie.title)
 //    		// })
 //    	} else {
 //    		console.log('error');
 //    	}

	    // var status = request.status;
	    // if (status === 200) {
	    // 	callback(null, request.response);
	    // } else {
	    // 	callback(status, request.response);
	    // }
    //};
    //request.send();




//JQuery basic animation functionality for the action buttons.
$(document).ready(function() {
 	$("#error-displayer").hide();
 	$("#activity-container-right").hide();
 	$("#activity-container-left").css("width", "100%");


 	console.log("Elementary, my dear.");

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
 		$("#activity-container-left").css("width", "50%");
 		$("#activity-container-left").fadeIn(1000);
 		$("#activity-container-right").fadeIn(1000);
 		randomMode = false;
 	});
 });