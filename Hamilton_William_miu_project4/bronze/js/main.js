// William Hamilton
// MIU 1302 Project 3
// JavaScript file

// DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	
	// getElementById function.
	function getElem(x){
		var element = document.getElementById(x); // "getElem" function is used everytime the id "x" is passed through the function
		return element; //function value is returned to the DOM to be used again.
	}
	
	//Create new select field element and add options.
	function makeDropDown(){
		var formTag = document.getElementsByTagName("form"),//formTag is an array of all the form tags in HTML document.
			selLi = getElem("select"),//targets list item with "select" element.
			createSel = document.createElement("select");//creates new "select" element in HTML doc.
			createSel.setAttribute("id", "cats");//dynamically creates a new attribute called "cats".
		for(var i=0, j=furnGroups.length; i<j; i++){ //for loop grabs "furnGroups" array below and populates list with array elements.
			var createOpt = document.createElement("option");//dynamically creates new element "option" in HTML doc
			var optText = furnGroups[i];// variable "optText" will grab the value in the array and save it.
			createOpt.setAttribute("value", optText);// assigns attribute "value" to the new text.
			createOpt.innerHTML = optText;// takes text in array and puts it between new "option" tags.
			createSel.appendChild(createOpt);// attaches the "select" element and "option" tags to HTML doc.
		}
		selLi.appendChild(createSel);
	}
	
	
	// Get values for selected checkboxes.
	function getSelectedCheckboxes(){
		var cBoxes = document.forms[0].rooms;
		cacheValues = [];
		for(var i=0, j=cBoxes.length; i<j; i++){
			if (cBoxes[i].checked){
				var	cBoxValue = cBoxes[i].value;
				cacheValues.push(cBoxValue);
			}
		}
	}
	
		function tuningCommands(b){
		switch(b){
			case "on":
				getElem('designForm').style.display = "none";
				getElem('clearLink').style.display = "inline";
				getElem('showLink').style.display = "none";
				getElem('pushNew').style.display = "inline";
				break;
			case "off":
				getElem('designForm').style.display = "block";
				getElem('clearLink').style.display = "inline";
				getElem('showLink').style.display = "inline";
				getElem('pushNew').style.display = "none";
				getElem('items').style.display = "none";
				break;
			default:
				return false;
		}
	}	
	
	function cacheData(key){
		// If no key, it's a brand new item and a new key is needed
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			// Set id to existing key that is being changed so that it will overwrite the saved data.
			// Same key that has been passed from changeFinish listener to authorize function and passed here into cacheData function.
			id = key;
		}
		// Gather all form field values and store in object.
		// Object properties contain array with form label and input value.
		getSelectedCheckboxes(); // calls getSelectedCheckboxes function.
		var objItem			= {};
			objItem.fname	= ["First Name:", getElem('fname').value];
			objItem.lname	= ["Last Name:", getElem('lname').value];
			objItem.pword	= ["Password:", getElem('pword').value];
			objItem.cpword	= ["Confirm Password:", getElem('cpword').value];
			objItem.email	= ["Email:", getElem('email').value];
			objItem.ddwn	= ["Item:", getElem('cats').value];
			objItem.date	= ["Date:", getElem('startdate').value];
			objItem.rooms	= ["Rooms:", cacheValues];
			objItem.price	= ["Price of Item:", getElem('price').value];
			objItem.notes	= ["Additional Notes:", getElem('comments').value];
			
		//Save data: Stringify to convert object to string.
		localStorage.setItem(id, JSON.stringify(objItem));
		alert("Your Information has been Saved!");
	}
	
	

	
// Extract data from Local Storage and display it through the browser.
	function obtainData(){
		if(document.getElementById('items')){
			document.getElementById('items').innerHTML = "";
			var createDiv = document.getElementById('items') 
		}else{
			var createDiv = document.createElement('div');
			createDiv.setAttribute("id", "items");
		}
		
		tuningCommands("on");
		if(localStorage.length === 0){
			alert("There is no entry in Local Storage so default data was supplemented.");
			selfData();
		}
	
		var createDataList = document.createElement("ul");
		createDiv.appendChild(createDataList);
		document.body.appendChild(createDiv);
		getElem('items').style.display = "block"; // safety
		for(var i=0, j=localStorage.length; i<j; i++){
			var createLi = document.createElement('li');
			var listLinks = document.createElement('li');
			createDataList.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			// Converts string in local storage back to an object using JSON.parse.
			var body = JSON.parse(value);
			var createDivList = document.createElement('ul');
			createLi.appendChild(createDivList);
			obtainImg(body.ddwn[1], createDivList);
			for(var a in body){
				var createDivli = document.createElement('li');
				createDivList.appendChild(createDivli);
				var optDivText = body[a][0]+" "+body[a][1];
				createDivli.innerHTML = optDivText;
				createDivList.appendChild(listLinks);
			}
			createLinks(localStorage.key(i), listLinks); // edit and delete links for info in local storage.
		}
	}
	
	// Grab the right icon for the corresponding category.
	function obtainImg(iconName, createDivList){
		var listImg = document.createElement('li');
		createDivList.appendChild(listImg);
		var dynImg = document.createElement('img');
		var sourceImg = dynImg.setAttribute("src", "img/"+ iconName + ".png");
		listImg.appendChild(dynImg);
	}
	
	function selfData(){
		var object = {
			"item1": {
				"fname": ["First Name:", "John"],
				"lname": ["Last Name:", "Doe"],
				"pword": ["Password:", "open123"],
				"cpword": ["Confirm Password:", "open123"],
				"email": ["Email:", "heythere@fullsail.edu"],
				"ddwn": ["Item:", "Furniture"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Dining Room"],
				"price": ["Price of Item:", "650"],
				"notes": ["Additional Notes:", "this dining table would look great in the house!"]
			},
			"item2": {
				"fname": ["First Name:", "Jill"],
				"lname": ["Last Name:", "Doe"],
				"pword": ["Password:", "close123"],
				"cpword": ["Confirm Password:", "close123"],
				"email": ["Email:", "address123@yahoo.com"],
				"ddwn": ["Item:", "Bedding"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bedroom"],
				"price": ["Price of Item:", "320"],
				"notes": ["Additional Notes:", "This mattress is so comfortable!"]
			},
			"item3": {
				"fname": ["First Name:", "Bob"],
				"lname": ["Last Name:", "Smith"],
				"pword": ["Password:", "123reopen"],
				"cpword": ["Confirm Password:", "123reopen"],
				"email": ["Email:", "myhouse@aol.com"],
				"ddwn": ["Item:", "Fabric"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Living Room"],
				"price": ["Price of Item:", "190"],
				"notes": ["Additional Notes:", "Beautiful table lamp!"]
			},
			"item4": {
				"fname": ["First Name:", "Jane"],
				"lname": ["Last Name:", "Johnson"],
				"pword": ["Password:", "123reopen"],
				"cpword": ["Confirm Password:", "123reopen"],
				"email": ["Email:", "myhouse@aol.com"],
				"ddwn": ["Item:", "Lighting"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bathroom"],
				"price": ["Price of Item:", "250"],
				"notes": ["Additional Notes:", "Great deal on some wall lighting!"]
			},
			"item5": {
				"fname": ["First Name:", "Jim"],
				"lname": ["Last Name:", "Johnson"],
				"pword": ["Password:", "456closed"],
				"cpword": ["Confirm Password:", "456closed"],
				"email": ["Email:", "countrycottage@lycos.com"],
				"ddwn": ["Item:", "Flooring"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Kitchen"],
				"price": ["Price of Item:", "20"],
				"notes": ["Additional Notes:", "Ceramic tile flooring deal"]
			},
			"item6": {
				"fname": ["First Name:", "Phil"],
				"lname": ["Last Name:", "Donahue"],
				"pword": ["Password:", "OffDair"],
				"cpword": ["Confirm Password:", "OffDair"],
				"email": ["Email:", "studioloft@godaddy.com"],
				"ddwn": ["Item:", "Appliance"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Kitchen"],
				"price": ["Price of Item:", "999"],
				"notes": ["Additional Notes:", "Gas range on sale!"]
			},
			"item7": {
				"fname": ["First Name:", "Bill"],
				"lname": ["Last Name:", "Young"],
				"pword": ["Password:", "password"],
				"cpword": ["Confirm Password:", "password"],
				"email": ["Email:", "younggun@aol.com"],
				"ddwn": ["Item:", "Fabric"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Dining Room"],
				"price": ["Price of Item:", "300"],
				"notes": ["Additional Notes:", "Nice tough fabric for outdoors!"]
			},
			"item8": {
				"fname": ["First Name:", "Carl"],
				"lname": ["Last Name:", "Brown"],
				"pword": ["Password:", "goahead34"],
				"cpword": ["Confirm Password:", "goahead34"],
				"email": ["Email:", "guybrown@yahoo.com"],
				"ddwn": ["Item:", "Appliance"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Kitchen"],
				"price": ["Price of Item:", "699"],
				"notes": ["Additional Notes:", "This fridge is the right size."]
			},
			"item9": {
				"fname": ["First Name:", "Tracy"],
				"lname": ["Last Name:", "Kendrick"],
				"pword": ["Password:", "tkendrick"],
				"cpword": ["Confirm Password:", "tkendrick"],
				"email": ["Email:", "tkendrick@aol.com"],
				"ddwn": ["Item:", "Lighting"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Living Room"],
				"price": ["Price of Item:", "190"],
				"notes": ["Additional Notes:", "Nice lamp for my nightstand!"]
			},
			"item10": {
				"fname": ["First Name:", "Billy"],
				"lname": ["Last Name:", "Morris"],
				"pword": ["Password:", "bmorris"],
				"cpword": ["Confirm Password:", "bmorris"],
				"email": ["Email:", "bmorris@lycos.com"],
				"ddwn": ["Item:", "Furniture"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bedroom"],
				"price": ["Price of Item:", "699"],
				"notes": ["Additional Notes:", "Found a nice chest!"]
			},
			"item11": {
				"fname": ["First Name:", "Bonnie"],
				"lname": ["Last Name:", "Hargrove"],
				"pword": ["Password:", "bhar123"],
				"cpword": ["Confirm Password:", "bhar123"],
				"email": ["Email:", "savartist@lycos.com"],
				"ddwn": ["Item:", "Flooring"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bathroom"],
				"price": ["Price of Item:", "20"],
				"notes": ["Additional Notes:", "Ceramic tile flooring deal"]
			},
			"item12": {
				"fname": ["First Name:", "Infinger"],
				"lname": ["Last Name:", "Bobby"],
				"pword": ["Password:", "furn1st"],
				"cpword": ["Confirm Password:", "furn1st"],
				"email": ["Email:", "binfinger@godaddy.com"],
				"ddwn": ["Item:", "Bedding"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bedroom"],
				"price": ["Price of Item:", "225"],
				"notes": ["Additional Notes:", "Nice comforter set on sale!"]
			},
			"item13": {
				"fname": ["First Name:", "Morris"],
				"lname": ["Last Name:", "Sokol"],
				"pword": ["Password:", "downtown"],
				"cpword": ["Confirm Password:", "downtown"],
				"email": ["Email:", "worththetrip@godaddy.com"],
				"ddwn": ["Item:", "Appliance"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Kitchen"],
				"price": ["Price of Item:", "499"],
				"notes": ["Additional Notes:", "New dishwasher on sale!"]
			},
			"item14": {
				"fname": ["First Name:", "Steve"],
				"lname": ["Last Name:", "Buscemi"],
				"pword": ["Password:", "rdogs456"],
				"cpword": ["Confirm Password:", "rdogs456"],
				"email": ["Email:", "mrpink@aol.com"],
				"ddwn": ["Item:", "Fabric"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bedroom"],
				"price": ["Price of Item:", "199"],
				"notes": ["Additional Notes:", "Nice fabric for drapes!"]
			},
			"item15": {
				"fname": ["First Name:", "Michael"],
				"lname": ["Last Name:", "Madsen"],
				"pword": ["Password:", "stuck987"],
				"cpword": ["Confirm Password:", "stuck987"],
				"email": ["Email:", "mrblue@yahoo.com"],
				"ddwn": ["Item:", "Furniture"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Dining Room"],
				"price": ["Price of Item:", "425"],
				"notes": ["Additional Notes:", "This dining table seats eight."]
			},
			"item16": {
				"fname": ["First Name:", "Mitch"],
				"lname": ["Last Name:", "McConnell"],
				"pword": ["Password:", "macdeal654"],
				"cpword": ["Confirm Password:", "macdeal654"],
				"email": ["Email:", "mcconnelltrains@aol.com"],
				"ddwn": ["Item:", "Lighting"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Living Room"],
				"price": ["Price of Item:", "125"],
				"notes": ["Additional Notes:", "This floor lamp will work in my study!"]
			},
			"item17": {
				"fname": ["First Name:", "Roger"],
				"lname": ["Last Name:", "Fox"],
				"pword": ["Password:", "rfox345"],
				"cpword": ["Confirm Password:", "rfox345"],
				"email": ["Email:", "rfox345@lycos.com"],
				"ddwn": ["Item:", "Flooring"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Bedroom"],
				"price": ["Price of Item:", "15"],
				"notes": ["Additional Notes:", "This carpet is a great deal!"]
			},
			"item18": {
				"fname": ["First Name:", "Vince"],
				"lname": ["Last Name:", "Ackard"],
				"pword": ["Password:", "vackard321"],
				"cpword": ["Confirm Password:", "vackard321"],
				"email": ["Email:", "vackardrep@lycos.com"],
				"ddwn": ["Item:", "Furniture"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Living Room"],
				"price": ["Price of Item:", "599"],
				"notes": ["Additional Notes:", "Found a nice leather recliner!"]
			},
			"item19": {
				"fname": ["First Name:", "Brad"],
				"lname": ["Last Name:", "Bowman"],
				"pword": ["Password:", "bowman123"],
				"cpword": ["Confirm Password:", "bowman123"],
				"email": ["Email:", "bbowman@godaddy.com"],
				"ddwn": ["Item:", "Fabric"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Living Room"],
				"price": ["Price of Item:", "325"],
				"notes": ["Additional Notes:", "This fabric would look great on a chair!"]
			},
			"item20": {
				"fname": ["First Name:", "Connie"],
				"lname": ["Last Name:", "Smith"],
				"pword": ["Password:", "csmith456"],
				"cpword": ["Confirm Password:", "csmith456"],
				"email": ["Email:", "csmith456@godaddy.com"],
				"ddwn": ["Item:", "Lighting"],
				"date": ["Date:", "2013-01-31"],
				"rooms": ["Rooms:", "Kitchen"],
				"price": ["Price of Item:", "50"],
				"notes": ["Additional Notes:", "Found some fixtures for the lights over the sink."]
			}
		};
	

		// Dynamically populate local storage
		// The true JSON OBJECT data needed for this function to work is coming from var object		
		// Store JSON OBJECT into local storage
		for(var n in object){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(object[n]));
		}
	}
	
	// Create item links
	function createLinks(key, listLinks){ // Create links for each stored bit of info when you display the data.
		var changeLink = document.createElement('a');
		changeLink.href = "#";
		changeLink.key = key;
		var changeText = "Change Item";
		changeLink.addEventListener("click", changeInfo);
		changeLink.innerHTML = changeText;
		listLinks.appendChild(changeLink);
		
		// line break
		var lineBreak = document.createElement('br');
		listLinks.appendChild(lineBreak);
		
		var removeButton = document.createElement('a');
		removeButton.href = "#";
		removeButton.key = key;
		var removeText = "Delete Item";
		removeButton.addEventListener("click", removeInfo);
		removeButton.innerHTML = removeText;
		listLinks.appendChild(removeButton);
	} 

	function changeInfo(){
		// capture data from item in Local Storage.
		var val = localStorage.getItem(this.key);
		var newObject = JSON.parse(val);
		
		// Show form
		tuningCommands("off");
		
		// reproduce the form fields with localStorage values that are in use.
		getElem('fname').value = newObject.fname[1];
		getElem('lname').value = newObject.lname[1];
		getElem('pword').value = newObject.pword[1];
		getElem('cpword').value = newObject.cpword[1];
		getElem('email').value = newObject.email[1];
		getElem('cats').value = newObject.ddwn[1];
		getElem('startdate').value = newObject.date[1];
		var cBoxes = document.forms[0].rooms;
		for(var i=0, j=cBoxes.length; i<j; i++){
			for (k=0, l=newObject.rooms[1].length; k<l; k++){
				if (cBoxes[i].value === newObject.rooms[1][k]){
					cBoxes[i].setAttribute("checked", "checked");
				}
			}
		}
		getElem('price').value = newObject.price[1];
		getElem('comments').value = newObject.notes[1];
		
		// Delete the initial listener from "Finished" button.
		saveData.removeEventListener("click", cacheData);
		getElem('button').value	= "Save Changes";
		var changeFinish = getElem('button');
		
		// Save key in this function as property of changeFinish action so it can be used when once the edited data is saved.
		changeFinish.addEventListener("click", authorize);
		changeFinish.key = this.key;
			
	}
	
	function removeInfo(){
		var question = confirm("Are you sure you want to remove this item?");
		if(question){
			localStorage.removeItem(this.key);
			alert("The item was removed!");
			window.location.reload();
		}else{
			alert("The item was NOT removed!");
			return false;
		}
	}
	
	function removeLocal(){
		if(localStorage.length === 0){
			alert("No choices to clear!");
		}else{
			localStorage.clear();
			alert("All choices have been deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function authorize(c){
		// Name elements that need to be checked.
		var accessFname = getElem('fname');
		var accessLname = getElem('lname');
		var accessEmail = getElem('email');
		var accessCats = getElem('cats');	
		
		//Reset errors
		messErr.innerHTML = " ";
		accessFname.style.border = "1px solid black";
		accessLname.style.border = "1px solid black";
		accessEmail.style.border = "1px solid black";
		accessCats.style.border = "1px solid black";
			
		//Error message
		var messArray = [];
		//Check Validation
		if(accessFname.value === " "){
			var errFname = "Please enter a first name.";
			accessFname.style.border = "1px solid red";
			messArray.push(errFname);
		}
		
		if(accessLname.value === " "){
			var errLname = "Please enter a last name.";
			accessLname.style.border = "1px solid red";
			messArray.push(errLname);
		}
		
		// Email Validation
		var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!(regEx.exec(accessEmail.value))){
			var errEmail = "Please enter a valid email address.";
			accessEmail.style.border = "1px solid red";
			messArray.push(errEmail);
		}
		
		// Category Validation
		if(accessCats.value === "--Choose A Type of Home Furnishing--"){
			var errCats = "Please choose a category.";
			accessCats.style.border = "1px solid red";
			messArray.push(errCats);
		}
		
		// If errors exist, display on the screen.
		if(messArray.length >= 1){
			for(var i=0, j=messArray.length; i<j; i++){
				var newTxt = document.createElement('li');
				newTxt.innerHTML = messArray[i];
				messErr.appendChild(newTxt);
			}
			c.preventDefault();
			return false; // safety
		}else{
			// Everything is ok so save the data. Send key value from obtainData function, but remember this key value was passed through changeFinish listener.
			cacheData(this.key);
		}
	}
	//Variable defaults
	var furnGroups = ["--Choose A Type of Home Furnishing--", "Furniture", "Bedding", "Fabric", "Lighting", "Flooring", "Appliance"], 
		cacheValues,
		messErr = getElem('errors'); //store values for dropdown menu in an array and dynamically create it in JavaScript.
	makeDropDown(); // calls the drop-down menu function.
	
	
	//Set Link & Submit Click Events
	
	var showLink = getElem("showLink");//targets Display Data link on HTML doc.
	showLink.addEventListener("click", obtainData);//listens for a "click" event to execute a getData function
	var removeLink = getElem('clearLink');//targets Clear Stored Data link on HTML doc
	removeLink.addEventListener("click", removeLocal);//listens for a "click" event to execute removeLocal function
	var saveData = getElem('button');//targets "Finished!" link on HTML doc
	saveData.addEventListener("click", authorize);//listens for a "click" event to execute cacheData function
});