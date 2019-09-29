# TacoAssembly
A random and build-your-own taco assembler, using JSON API of various taco ingredients.


Designed and created by: Mae Wang
API Source: https://ct-tacoapi.azurewebsites.net
	
Assumptions and Protocols:
1. A taco is strictly defined as having 1 shell, 1 base layer, 1 mixin, 1 condiment, and 1 seasoning, at minimum.
2. No threshold limitations are added for stretch goal 3. Users are assumed to put however much they like. No taco-lover should ever be limited!
3. Random taco mode gives a taco of exactly 1 shell, 1 base layer, 1 mixin, 1 condiment, and 1 seasoning.
4. To remove a submitted taco from the list, hover over a taco description and click on it. A confirmation pop-up will appear.
5. To add ingredients to a taco, hover over the selections under "Ingredients" on the right-hand side and click on an ingredient. To deselect an ingredient, re-click the selection again.
6. Navigate between buttons 'Make Random', 'Make My Own', and 'Generate Taco' accordingly.
7. 'Make Random' is for generating randomized tacos when the 'Generate Taco' button is pressed.
8. 'Make My Own' is for generating user-defined tacos when the 'Generate Taco' button is pressed. Options under 'Ingredients' must be clicked and validated to generate a taco.

Build Instructions:	
1. First, the layout of the HTML file was created with the appropriate divs, classes, and ids for hierarchy. 
2. Next, the CSS file was implemented with a clear design in mind. Here, the front-end was complete and was slightly modified during the process of implementing the back-end.
3. Then, basic animations and small action listener interactions were implemented on buttons using JQuery. There was a minor preference to use JavaScript on the submission button action listener function.
4. JavaScript was used for the rest of the process in script.js. JSON parsing and storing was implemented for future access.
5. The 'Make My Own' functionalities were implemented using multiple functions that interlinked with each other. Action listener responses were dealt with JQuery and JavaScript DOM methods.
6. The 'Make Random' functionalities were implemented using existing 'Make My Own' functions. Dictionaries/Objects were mainly used for data storage.
7. Lastly, deletion properties and bugs were fixed. Program was tested thoroughly for obvious bugs.
		
