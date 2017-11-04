$(document).on("pageinit", "#material", function()
{
	console.log("In material.pageinit");

	var table = document.getElementById("rimsMaterialTable");

	var materialJson = readJSON("materials");
	if(materialJson === null || materialJson === undefined)
	{
		console.log("Read failed.")
		return ;
	}
	
	for(var i=0; i<materialJson.items.length; i++)
	{
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		
		var cell0 = row.insertCell(0);
		var deleteButton = createElement('button', 'delete');
		$(deleteButton).button();
		cell0.appendChild(deleteButton);
		addAttributeToElement('width', '32px', cell0);
				
		var cell1 = row.insertCell(1);
		var materialNameSpan = createElement('span', materialJson.items[i].MaterialName);
		// Set attribute onmouseover to header
		addAttributeToElement('onmouseover', 'makeEditable(this);', materialNameSpan);
//		addAttributeToElement('onclick', 'toggleConvertable(this);', materialNameSpan);
		addAttributeToElement('name', 'materialNameSpan', materialNameSpan);
		addAttributeToElement('class', 'width33', cell1);
		cell1.appendChild(materialNameSpan);
	
		
		var cell2 = row.insertCell(2);
		var materialUnitPriceSpan = createElement('span',  materialJson.items[i].UnitPrice);
		addAttributeToElement('onmouseover', 'makeEditable(this);', materialUnitPriceSpan);
//		addAttributeToElement('onclick', 'toggleConvertable(this);', materialUnitPriceSpan);
		addAttributeToElement('name', 'materialUnitPriceSpan', materialUnitPriceSpan);
//		addAttributeToElement('id', 'materialPriceSpan', materialUnitPriceSpan);
		addAttributeToElement('class', 'width33', cell2);
		cell2.appendChild(materialUnitPriceSpan);
		
		var cell3 = row.insertCell(3);
		var materialUnitSpan = createElement('span',  materialJson.items[i].Unit);
		addAttributeToElement('onmouseover', 'makeEditable(this);', materialUnitSpan);
///		addAttributeToElement('onclick', 'toggleConvertable(this);', materialUnitSpan);
		addAttributeToElement('name', 'materialUnitSpan', materialUnitSpan);
		cell3.appendChild(materialUnitSpan);
	}
});


function addMaterial()
{
	var table = document.getElementById("rimsMaterialTable");
	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var cell0 = row.insertCell(0);
	var deleteButton = createElement('button', 'delete');
	$(deleteButton).button();
	cell0.appendChild(deleteButton);
	addAttributeToElement('width', '32px', cell0);
		
	var cell1 = row.insertCell(1);
	var materialNameSpan = createElement('span', "Name");
	// Set attribute onmouseover to header
	addAttributeToElement('onmouseover', 'makeEditable(this);', materialNameSpan);
	addAttributeToElement('onclick', 'toggleConvertable(this);', materialNameSpan);
	addAttributeToElement('class', 'width33', cell1);
	cell1.appendChild(materialNameSpan);

	var cell2 = row.insertCell(2);
	var materialPriceSpan = createElement('span', "Value");
	addAttributeToElement('onmouseover', 'makeEditable(this);', materialPriceSpan);
	addAttributeToElement('name', 'materialUnitPriceSpan', materialPriceSpan);
	addAttributeToElement('class', 'width33', cell2);
	cell2.appendChild(materialPriceSpan);
	
	var cell3 = row.insertCell(3);
	var materialValueSpan = createElement('span', "Value");
	addAttributeToElement('onmouseover', 'makeEditable(this);', materialValueSpan);
	cell3.appendChild(materialValueSpan);
	
	makeEditable(materialNameSpan);
} 


function captureData()
{
	var item = {};
	item.saveTo = "materials";
	item.materials = getChildValue(document.getElementById("rimsMaterialTable"));
	return item;
}


function convertToJson(currentElement)
{
	var itemJson = {};
	itemJson = { 
			"items"	:
			[
			]
		  };
	
	var totalMaterials = null;
	for(prop in currentElement.materials) {
		totalMaterials++;
	}
	
	for(var i=0; i<(totalMaterials/4);i++)
	{
		var mat = {};
		var materialName;
		var materialUnit;
		var UnitPrice;
		
		for(var j = 0; j<4; j++)
		{
			
			if(j == 1)
			{
				materialName = currentElement.materials[("0"+i)+j];
			}
			else if(j == 2)
			{
				UnitPrice = currentElement.materials[("0"+i)+j];
			}
			else if(j == 3)
			{
				materialUnit = currentElement.materials[("0"+i)+j];
			}
		}
		//itemJson.Materials.push(mat);
		
		itemJson.items.push({
			"MaterialName" : materialName,
			"Unit" : materialUnit,
			"UnitPrice" : UnitPrice
		});
	}
	
	return itemJson;
}


function validateForm()
{
	var element;
	var table = document.getElementsByName("materialUnitPriceSpan");
	for(var i=0; i < table.length; i++)
	{
		element = table[i];
		var isValid = validateElement(element, 'notEmptyNumeric');
		setErrorState(table[i], isValid);
		if(!isValid)
		{
			return false;
		}
	}
	
	table = document.getElementsByName("materialNameSpan");
	for(var i=0; i < table.length; i++)
	{
		element = table[i];
		var isValid = validateElement(element, 'notEmpty');
		setErrorState(table[i], isValid);
		if(!isValid)
		{
			return false;
		}
	}
	
	table = document.getElementsByName("materialUnitSpan");
	for(var i=0; i < table.length; i++)
	{
		element = table[i];
		var isValid = validateElement(element, 'notEmpty');
		setErrorState(table[i], isValid);
		if(!isValid)
		{
			return false;
		}
	}
	return true;
}


function removeRow(currentElement)
{
	var currentRowIndex = currentElement.parentNode.parentNode.rowIndex;
	document.getElementById("rimsMaterialTable").deleteRow(currentRowIndex);
}
