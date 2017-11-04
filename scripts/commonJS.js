function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
			    return decodeURIComponent(pair[1]);
			}
		}
		console.log('Query variable %s not found', variable);
}


function generatePhotoHtmlFromJson()
{	
	var photoJson;
	var returnString = "";
	returnString = returnString+"<div class=\"photoDashboardRow\" id=\"photoDashboardRow\">";
	
	returnString = returnString+"<div id=\"photoDashboardPhotoDiv\" class=\"photoDashboardPhotoDiv\" data-groups='[\"All\"]' itemCode=\"NEW\">"+
		"<a href=\"./view_product.html?productid=NEW&catagoery=NEW\" rel=\"external\">"+
		"<img src=\"images/add_item.png\" style=\"float:left;text-align:center;width:50%;height:50%;margin:40px;margin-left:55px\"/>" +
		"<div class=\"photoDashboardPhotoFooter\">Add Item</div></a>" +
		"</div>";
		
	var categories = readJSON("catagories");
	for(var j=0; j<categories.length; j++)
	{
		photoJson = readJSON(categories[j]);
		console.log("JSON read:"+JSON.stringify(photoJson));
		if(photoJson === "" || photoJson === undefined || photoJson == null)
		{
			console.log("Read failed for category:"+categories[i]);
			continue;
		}
		for(var i=0; i<photoJson.items.length; i++)
		{
			returnString = returnString+"<div id=\"photoDashboardPhotoDiv\" class=\"photoDashboardPhotoDiv\" data-groups='[\""+photoJson.catagory+"\",\""+photoJson.items[i].itemCode+"\",\"All\"]' itemCode=\""+photoJson.items[i].itemCode+"\">"+
			"<a href=\"./view_product.html?productid="+photoJson.items[i].itemCode+"&catagoery="+photoJson.catagory+"\" rel=\"external\">"+
			"<img src=\""+photoJson.items[i].photoUrl+"\" class=\"photoDashboardPhoto\"/>" +
			"<div class=\"photoDashboardPhotoFooter\">"+photoJson.items[i].itemName+"</div></a>" +
			"</div>";
		}
	}
			
	/*photoJson = readJSON("Slides");
	console.log("JSON read:"+photoJson);
	if(photoJson === "" || photoJson === undefined || photoJson == null)
	{
		console.log("Read failed.")
		return ;
	}
	for(var i=0; i<photoJson.items.length; i++)
	{
		returnString = returnString+"<div id=\"photoDashboardPhotoDiv\" class=\"photoDashboardPhotoDiv\" data-groups='[\""+photoJson.catagory+"\",\""+photoJson.items[i].itemCode+"\"]' itemCode=\""+photoJson.items[i].itemCode+"\">"+
		"<a href=\"./view_product.html?productid="+photoJson.items[i].itemCode+"&catagoery="+photoJson.catagory+"\" rel=\"external\">"+
		"<img src=\"images/"+photoJson.items[i].photoUrl+"\" class=\"photoDashboardPhoto\"/>" +
		"<div class=\"photoDashboardPhotoFooter\">"+photoJson.items[i].itemName+"</div></a>" +
		"</div>";
	}
	
	photoJson = readJSON("Swings");
	console.log("JSON read:"+photoJson);
	if(photoJson === "" || photoJson === undefined || photoJson == null)
	{
		console.log("Read failed.")
		return ;
	}
	for(var i=0; i<photoJson.items.length; i++)
	{
		returnString = returnString+"<div id=\"photoDashboardPhotoDiv\" class=\"photoDashboardPhotoDiv\" data-groups='[\""+photoJson.catagory+"\",\""+photoJson.items[i].itemCode+"\",\"All\"]' itemCode=\""+photoJson.items[i].itemCode+"\">"+
		"<a href=\"./view_product.html?productid="+photoJson.items[i].itemCode+"&catagoery="+photoJson.catagory+"\" rel=\"external\">"+
		"<img src=\"images/"+photoJson.items[i].photoUrl+"\" class=\"photoDashboardPhoto\"/>" +
		"<div class=\"photoDashboardPhotoFooter\">"+photoJson.items[i].itemName+"</div></a>" +
		"</div>";
	}*/
	
	returnString = returnString+"<div style=\"clear: both\"></div></div>";
	return returnString
}


function addAttributeToElement(attribute, value, element)
{
	// Create attribute tag
	var Attr = document.createAttribute(attribute);
	Attr.nodeValue = value;
	// Set attribute to element
	element.setAttributeNode(Attr);
	
	return element;
}

function createElement(type, value)
{
	//console.log("type:"+type);
	// Create Element
	var Node = document.createElement(type);
	if(type === 'span' || type === 'SPAN')
	{
		// Create text tag to be added in element
		var NodeText = document.createTextNode(value);
		// Add text to element
		Node.appendChild(NodeText);
	}
	else if(type === 'img' || type === 'IMG')
	{
		// Add src
		Node.src = value;
	}
	else if(type === 'input' || type === 'INPUT')
	{	
		Node.value = value;
	}
	else if(type === 'select' || type === 'SELECT')
	{
		var option = null;
		var valuesJson = null;
		if(value === 'Material')
		{
			valuesJson = readJSON("materials");
			
			if(valuesJson === "" || valuesJson === undefined || valuesJson === null)
			{
				console.log("Read failed.")
				return ;
			}
			
			for(var i=0; i<valuesJson.items.length; i++)
			{
				option = createElement('option', valuesJson.items[i].MaterialName);
				Node.appendChild(option);
			}
		}
		else if(value === 'Catagoery')
		{
			valuesJson = readJSON("catagories");
			
			if(valuesJson === "" || valuesJson === undefined || valuesJson === null)
			{
				console.log("Read failed.")
				return ;
			}
			
			for(var i=0; i<valuesJson.length; i++)
			{
				option = createElement('option', valuesJson[i]);
				Node.appendChild(option);
			}
		}
	}
	else if(type === 'option' || type === 'OPTION')
	{	
		Node.value = Node.textContent = value;
	}
	else if(type === 'button' || type === 'BUTTON')
	{	
		Node = document.createElement('a');
		Node.innerHTML = 'Delete';
		addAttributeToElement('href', '#', Node);
		addAttributeToElement('data-role', 'button', Node);
		addAttributeToElement('data-iconpos', 'notext', Node);
		addAttributeToElement('data-icon', 'delete', Node);
		addAttributeToElement('data-inline', 'true', Node);
		addAttributeToElement('class', 'DeleteButton', Node);
		addAttributeToElement('onclick', 'removeRow(this);', Node);
	}
	
	// Return the created node
	return Node;
};


function readJSON(file)
{
	//console.log("In readerWriter.readJSON");
	//console.log(JSON.stringify(masterDataJson));
	if(typeof(Storage)!=="undefined")
	{
		if(localStorage.masterDataJson == undefined || localStorage.masterDataJson == null)
		{
			localStorage.masterDataJson = JSON.stringify(masterDataJson);
		}
		masterDataJson = JSON.parse(localStorage.masterDataJson);
		if(file === "All")
		{
			return masterDataJson;
		}
		else if(file === "Slides" || file === "Swings" || file === "Climbers" || file === "See Saws" || file === "Merry Go Round" || file === "Exercise Range" || file === "Garden Range" || file === "MultiPlaySystem" || file === "NEW")
		{
			return masterDataJson.Products[file];
		}
		else if(file === "materials")
		{
			return masterDataJson.Materials;
		}
		else if(file === "catagories")
		{
			return masterDataJson.Catagories;
		}
	}
	else
	{
		console.log("Sorry! No web storage support..");
	}
	
	return null;
};


function writeJSON(file, isStringified)
{
	// Write to local storage

	if(isStringified != null && isStringified === true)
	{
		localStorage.masterDataJson = file;
	}	
	else
	{
		localStorage.masterDataJson = JSON.stringify(file);
	}
	//console.log("Write Successfull. JSON:"+JSON.stringify(file));
	// Update in memory
	// Update in javascript database file	
};


function updateMasterDataJson(type, json)
{
	//console.log(JSON.stringify(json));
	if(type === "item")
	{
		if(masterDataJson.Products[json.catagory] == null)
		{
			var temp = { "catagory": json.catagory, "items": []};
			masterDataJson.Products[json.catagory] = temp;
		}
		masterDataJson.Products[json.catagory].items.unshift(json);
	}
	else if(type === "materials")
	{
		// Console.log("Item found");
		masterDataJson.Materials = json;
	}
	//console.log(JSON.stringify(masterDataJson));
};


function deleteFromMasterDataJson(type, json)
{
	//console.log("In commonJS.deleteFromMasterDataJson");
	var catagoery = json.catagory;
	if(type === "item")
	{
		var isFound = false;
		for(var i=0; i<masterDataJson.Products[catagoery].items.length; i++)
		{
			if(masterDataJson.Products[catagoery].items[i].itemCode === json.itemCode)
			{
				console.log("Item found");
				masterDataJson.Products[catagoery].items.splice(i,1);
				isFound = true;
				writeJSON(masterDataJson);
				break;
			}
		}
		console.log(JSON.stringify(masterDataJson));
		return isFound;
	}
};


function getChildValue(currentElement)
{
	if(currentElement == undefined) {
		return;
	}
	var value = null;
	if(currentElement.tagName === "DIV" || currentElement.tagName === "div")
	{
		if(currentElement.childNodes.length == 0) {
			return currentElement.text;
		} else if(currentElement.childNodes.length == 1){
			return getChildValue(currentElement.childNodes[0])
		} else if(currentElement.childNodes.length == 2){
			return getChildValue(currentElement.childNodes[1])
		}
//		if(currentElement.childNodes[1].tagName === "SPAN" || currentElement.childNodes[1].tagName === "SPAN")
//		{
//			value = currentElement.childNodes[1].innerHTML;
//		}
//		else if(currentElement.childNodes[1].tagName === "INPUT" || currentElement.childNodes[1].tagName === "input")
//		{
//			value = currentElement.childNodes[1].value;
//		}
//		else if(currentElement.childNodes[1].tagName === "SELECT" || currentElement.childNodes[1].tagName === "select")
//		{
//			value = currentElement.childNodes[1].value;
//		}
	}
	else if(currentElement.tagName === "TABLE" || currentElement.tagName === "table")
	{
		var table = {};
		for (var i = 0, row; row = currentElement.rows[i]; i++) {
			//iterate through rows
			//rows would be accessed using the "row" variable assigned in the for loop
			for (var j = 0, col; col = row.cells[j]; j++) {
			     //iterate through columns
			     //columns would be accessed using the "col" variable assigned in the for loop
			     value = getChildValue(col);
			     table[("0"+i)+j] = value;
			}  
		}
		value = table;
	}
	else if(currentElement.tagName === "TD" || currentElement.tagName === "td")
	{
		if(currentElement.childNodes[0].tagName === "SPAN" || currentElement.childNodes[0].tagName === "SPAN")
		{
			value = currentElement.childNodes[0].innerHTML;
		}
		else if(currentElement.childNodes[0].tagName === "INPUT" || currentElement.childNodes[0].tagName === "input")
		{
			value = currentElement.childNodes[0].value;
		}
		else if(currentElement.childNodes[0].tagName === "SELECT" || currentElement.childNodes[0].tagName === "select")
		{
			value =  currentElement.childNodes[0].options[currentElement.childNodes[0].selectedIndex].value;
		}
	}
	else if(currentElement.tagName === "SPAN" || currentElement.tagName === "span")
	{
		value = currentElement.innerHTML;
	}
	else if(currentElement.tagName === "INPUT" || currentElement.tagName === "input")
	{
		value = currentElement.value;
	}
	else if(currentElement.tagName === "SELECT" || currentElement.tagName === "select")
	{
		value = currentElement.options[currentElement.selectedIndex].value;
	}
	//console.log(value);
	return value;
}


function setValueOfElement(currentElement, value)
{
	if(currentElement.tagName === "TD" || currentElement.tagName === "td")
	{
		if(currentElement.childNodes[0].tagName === "SPAN" || currentElement.childNodes[0].tagName === "SPAN")
		{
			currentElement.childNodes[0].innerHTML = value;
		}
	}
}


function saveFormData()
{
	// Valiate Form
	var isValid = validateForm();
	if(!isValid)
	{
		return;
	}
	
	// Collect the data from the form
	var item = captureData();
	
	// Create JSON structure similar to our databse
	var itemJson = convertToJson(item);
	console.log(JSON.stringify(itemJson));

	if(item.saveTo === 'item' && item.oldCatagory !== 'NEW')
	{
		var oldItem = {};
		oldItem.itemCode = item.itemCode;
		oldItem.catagory = item.oldCatagory;
		deleteFromMasterDataJson('item', oldItem);
	}
	
	// Update our copy of masterDataJson
	updateMasterDataJson(item.saveTo,itemJson);
	
	// Save masterDataJson to database
	writeJSON(masterDataJson);
	
	if(item.saveTo === 'item' && item.oldCatagory !== 'NEW')
	{
		window.location.href = 'view_product.html?productid='+item.itemCode+'&catagoery='+item.itemCatagoery;
	}	
	
	return false;
}


function makeEditable(currentElement)
{
	//console.log("In view_product.makeEditable");
	
	var parent = currentElement.parentNode;
	//console.log(currentElement);
	//console.log(parent);
	//console.log(currentElement.firstChild.value);
	
	var element = null;
	
	var id = currentElement.getAttribute("id");
	
	if(id !== null && id === 'viewProductCatagoeryValue' || id === 'viewProductMaterialName' )
	{
		if(id === 'viewProductMaterialName')
		{
			element = createElement('select', 'Material');
		}
		else if(id === 'viewProductCatagoeryValue')
		{
			element = createElement('select', 'Catagoery');
		}
		if(id !== "")
		{
			addAttributeToElement('id', id, element);
		}
		
		// Code to retain the selected value. E.G. if it was slides previously then slelected option should be slides
		for (var i=0; i<element.length; i++)
		{
			if(element.options[i].value === currentElement.innerHTML)
			{
				addAttributeToElement('selected', 'selected', element.options[i]);
			}
		}
		addAttributeToElement('onmouseout', 'makeNonEditable(this);', element);
		addAttributeToElement('onblur', 'makeNonEditable(this);', element);
		addAttributeToElement('elementType', currentElement.tagName, element);
		//addAttributeToElement('isConvertable', currentElement.getAttribute("isConvertable"), element);
		addAttributeToElement('id', currentElement.getAttribute("id"), element);
		//addAttributeToElement('onclick', 'toggleConvertable(this);', element);
		if(currentElement.getAttribute("name") !== "")
		{
			addAttributeToElement('name', currentElement.getAttribute("name"), element);
		}
		if(currentElement.getAttribute("class") !== "")
		{
			addAttributeToElement('class', currentElement.getAttribute("class"), element);
		}
	}
	else
	{
		element = createElement('input', currentElement.innerHTML);
		if(id !== "")
		{
			addAttributeToElement('id', id, element);
		}
		// Set attributes to element
		addAttributeToElement('onmouseout', 'makeNonEditable(this);', element);
		addAttributeToElement('elementType', currentElement.tagName, element);
		addAttributeToElement('onblur', 'makeNonEditable(this);', element);
		if(currentElement.getAttribute("name") !== "")
		{
			addAttributeToElement('name', currentElement.getAttribute("name"), element);
		}
		if(currentElement.getAttribute("class") !== "")
		{
			addAttributeToElement('class', currentElement.getAttribute("class"), element);
		}
	}
	
	parent.removeChild(currentElement);
	parent.appendChild(element);
} 


function makeNonEditable(currentElement)
{
	//console.log("In view_product.makeNonEditable");
	//console.log("isConvertable recieved:"+currentElement.getAttribute("isConvertable"));
	//console.log("Document.activeElement.nodeName:"+document.activeElement.nodeName);
	var parent = currentElement.parentNode;
	
	if(document.activeElement.nodeName === 'INPUT' || document.activeElement.nodeName === 'SELECT')
	{
		return;
	}
	
	if(getChildValue(parent) === "")
	{
		addAttributeToElement('placeholder', 'Please enter value', currentElement);
		return;
	}
	
	var parent = currentElement.parentNode;
	// Create H2 header tag
	var dlHeader = createElement(currentElement.getAttribute("elementType"), currentElement.value);
	addAttributeToElement('onmouseover', 'makeEditable(this);', dlHeader);
	if(currentElement.getAttribute("name") !== "")
	{
		addAttributeToElement('name', currentElement.getAttribute("name"), dlHeader);
	}
	if(currentElement.getAttribute("class") !== "")
	{
		addAttributeToElement('class', currentElement.getAttribute("class"), dlHeader);
	}
	addAttributeToElement('id', currentElement.getAttribute("id"), dlHeader);
	//addAttributeToElement('isConvertable', currentElement.getAttribute("isConvertable"), dlHeader);
	
	// If current element which is being made nonEditable is select box, make sure to add convertTo attribute to 'select'
	// This is used to track elements that should be converted to select box
	if(currentElement.tagName === "select" || currentElement.tagName === "SELECT")
	{
		// If user is just hovering out of select box this will return false.
		// If this method is called on click of select, this will return true as element will have focus
		// In that case, do not make element editable. Return from here.
		//if(($(currentElement).is(':focus')) || (currentElement.getAttribute("isConvertable")) === "false")
		//{
		//	return;
		//}
		if(currentElement.getAttribute("id") === 'viewProductMaterialName')
		{
			var unit = getUnitForMaterial(currentElement.value)
			if(parent !== null)
			{
				var rowParent = parent.parentNode;
				var cell = rowParent.cells[3];
				setValueOfElement(cell, unit);
				//cell.firstChild.innerHTML = unit;
				var unitPrice = getUnitPriceForMaterial(currentElement.value);
	
//				rowParent.cells[3].firstChild.innerHTML = unitPrice;
				setValueOfElement(rowParent.cells[4], unitPrice);
				
				// Calculate total cost
				// Get Quantity
				var quantity = getChildValue(rowParent.cells[2]);
				//rowParent.cells[1].firstChild.innerHTML;
				if(isNaN(quantity))
				{
					quantity = 0;
				}
				var totalCost = quantity * unitPrice;
				// Set total cost in last cell
				setValueOfElement(rowParent.cells[5], totalCost);
				CalculateAndSetTotalCost();
			}
		}
	}
	
	if(currentElement.getAttribute("name") === "viewProductMaterialValue")
	{
		if(parent !== null)
		{
			// Get parent row
			var rowParent = parent.parentNode;
			// Get unit price cell
			var cell = rowParent.cells[4];
			// Get value of cell
			var unitPrice = cell.firstChild.innerHTML;
			// Calculate total cost
			var quantity = getChildValue(rowParent.cells[2])
			//var quantity = rowParent.cells[1].firstChild.innerHTML;
			if(isNaN(quantity))
			{
				quantity = 0;
			}
			var totalCost = quantity * unitPrice;
			// Set total cost in last cell
			setValueOfElement(rowParent.cells[5], totalCost.toFixed(2));
//			rowParent.cells[4].firstChild.innerHTML = totalCost;
			CalculateAndSetTotalCost();
		}
	}
	
	if(currentElement.getAttribute("id") === "profitValue" || currentElement.getAttribute("id") === "dealerProfitValue" || currentElement.getAttribute("id") === "labourValue")
	{
		CalculateAndSetTotalCost();
	}
	
	if(parent !== null)
	{
		parent.removeChild(currentElement);
		parent.appendChild(dlHeader);
	}
}

function validateElement(currentElement, validationRule)
{
	//console.log("In commonJS.validateElement");
	var value = getChildValue(currentElement)
	//console.log(value);
	
	if(validationRule === 'notEmptyNumeric')
	{
		if(value === "")
		{
			return false;
		}
		if(isNaN(value))
		{
			return false;
		}
	}
	if(validationRule === 'notEmpty')
	{
		if(value === "")
		{
			return false;
		}
	}
	if(validationRule === 'Numeric')
	{
		if(isNaN(value))
		{
			return false;
		}
	}
	if(validationRule === 'catagoery')
	{
		if(value !== "Slides" && value !== "Swings" && value !== "Climbers" && value !== "See Saws" && value !== "Merry Go Round" && value !== "Exercise Range" && value !== "Garden Range" && value !== "MultiPlaySystem")
		{
			return false;
		}
	}
	return true;
}


function getUnitForMaterial(currentMaterial)
{
	var unit = null;
	var materialJson = readJSON("materials");
	if(materialJson === null || materialJson === undefined)
	{
		console.log("Read failed.")
		return ;
	}

	for(var i=0; i<materialJson.items.length; i++)
	{
		if(materialJson.items[i].MaterialName === currentMaterial)
		{
			unit = materialJson.items[i].Unit;
		}
	}
	if(unit == null || unit === undefined || unit === "")
	{
		unit = "Units";
	}
	return unit;
}


function getUnitPriceForMaterial(currentMaterial)
{
	var unit = null;
	var materialJson = readJSON("materials");
	if(materialJson === null || materialJson === undefined)
	{
		console.log("Read failed.")
		return ;
	}

	for(var i=0; i<materialJson.items.length; i++)
	{
		if(materialJson.items[i].MaterialName === currentMaterial)
		{
			unit = materialJson.items[i].UnitPrice;
		}
	}
	// If unit price returned is null or anthing else in case material is deleted then set it to zero
	if(unit == null || unit === undefined || unit === "")
	{
		unit = 0;
	}
	return unit;
}


function setErrorState(currentElement, isValid)
{
	if(!isValid)
	{
		console.log("Invalid value found");
		currentElement.style.backgroundColor = "#FF0000";
	}
	else
	{
		currentElement.style.backgroundColor = "inherit";
	}
}





