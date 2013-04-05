// William Hamilton
// MIU 1302 Project 4
// JavaScript file	

$('#home').on('pageinit', function(){
	//code needed for home page goes here
	$("#clear").click (clearLocal)

	$("#displayData").click (getData)
});	

$('#addItem').on('pageinit', function(){

		var myForm = $('#addForm'),
			formerrorslink = $('#formerrorslink')

		;
		    myForm.validate({
			invalidHandler: function(form, validator) {
				formerrorslink.click();
				var content = '';
				for(var key in validator.submitted){
					var tag = $('label[for^="'+ key +'"]').not('.error');//loop thru fields that need to be validated
					var heading = tag.closest('fieldset').find('.ui-controlgroup-label');
					var divName = heading.length ? heading.text() : tag.text();
					content += '<li>'+ divName + '</li>';
				}; 
				$("#formerrors ul").html(content); // populates dialog page
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

$('#display').on('pageinit', function(){
	//code needed for display page goes here
	getData();
	
});	
//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function getData(){
		if(localStorage.length === 0){
			alert("There is no entry in Local Storage so default data was supplemented.");
			autoFillData();
		}
		
		//Write Data from L. Storage to browser
		var createDataList = document.createElement("ul");
		$('#display').append(makeList);
		for(var i=0, len=localStorage.length; i<len; i++){
			var createLi = document.createElement('li');
			var listLinks = document.createElement('li');
			createDataList.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			// Converts string in local storage back to an object using JSON.parse.
			var body = JSON.parse(value);
			var createDivList = document.createElement('ul');
			createLi.appendChild(createDivList);
			for(var a in body){
				var createDivli = document.createElement('li');
				createDivList.appendChild(createDivli);
				var optDivText = body[a][0]+" "+body[a][1];
				createDivli.innerHTML = optDivText;
				createDivList.appendChild(listLinks);
			}
			createLinks(localStorage.key(i), listLinks); // edit and delete links for info in local storage.
				
		}
};

function autofillData(){
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
	for(var n in object){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(object[n]))
	}	
};


var storeData = function(data, key){
	if(!key){
			var id = Math.floor(Math.random()*100000001); 
	}else{
			id = key;
	}
	var objItem				= {};
			objItem.fname	= ["First Name:", $('#enterfname').val()];
			objItem.lname	= ["Last Name:", $('#enterlname').val()];
			objItem.pword	= ["Password:", $('#enterpword').val()];
			objItem.cpword	= ["Confirm Password:", $('#confirmpword').val()];
			objItem.email	= ["Email:", $('#enteremail').val()];
			objItem.date	= ["Date:", $('#date').val()];
			objItem.ddwn	= ["Item:", $('#select-choice-0').val()];
			objItem.rooms	= ["Rooms:", $("input:checkbox[name=rooms]:checked").val()];
			objItem.price	= ["Price of Item:", $('pricerange').val()];
			objItem.notes	= ["Additional Notes:", $('formnotes').val()];
			
		//Save data: Stringify to convert object to string.
		localStorage.setItem(id, JSON.stringify(objItem));
		alert("Your Information has been Saved!");	
}; 


var	deleteItem = function (){
			
};
					
function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no information to clear!");
	}else{
		localStorage.clear();
		alert("All information has been cleared.");
		window.location.reload();
		return false;
	}	
};

