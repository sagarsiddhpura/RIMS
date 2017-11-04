$(document).on("pageinit", "#view_product", function()
{
	console.log("In view_product.pageinit");
	
	var productId = getQueryVariable('productid');
	//console.log("Requested Product:"+productId);
	var catagoery = getQueryVariable('catagoery');
	//console.log("Requested catagoery:"+catagoery);
	
	var photoJson = readJSON(catagoery);
	//console.log("JSON read:"+JSON.stringify(photoJson));
	if(photoJson === null || photoJson === undefined)
	{
		console.log("Read failed.");
		alert("The item you are looking is not found in database.");
		window.location.href = 'index.html';
		return ;
	}
	
	for(var i=0; i<photoJson.items.length; i++)
	{
		if(photoJson.items[i].itemCode === productId)
		{
			console.log("JSON read:"+JSON.stringify(photoJson.items[i]));
			//console.log("Item Found");
			// Load the data
			
			// Create header tag
			var HeaderNode = createElement('span', photoJson.items[i].itemName);
			// Set attribute onmouseover to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', HeaderNode);
			//addAttributeToElement('isConvertable', 'true', HeaderNode);
			// Add to page
			document.getElementById("rimsViewProductTitle").appendChild(HeaderNode);
			
			// Create itemcode tag
			var itemCode = createElement('span', photoJson.items[i].itemCode);
			// Set attribute onmouseover to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', itemCode);
			//addAttributeToElement('isConvertable', 'true', itemCode);
			// Add to page
			document.getElementById("rimsViewProductItemCode").appendChild(itemCode);
		
			// Create catagoery tag
			var itemCatagoery = createElement('span', photoJson.items[i].catagory);
			// Set attributes to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', itemCatagoery);
			addAttributeToElement('id', 'viewProductCatagoeryValue', itemCatagoery);
			//addAttributeToElement('isConvertable', 'true', itemCatagoery);
			//addAttributeToElement('onclick', 'toggleConvertable(this);', itemCatagoery);
			addAttributeToElement('class', 'width50', itemCatagoery);
			// Add to page
			document.getElementById("rimsViewProductCatagoery").appendChild(itemCatagoery);
		
			var picPath = photoJson.items[i].photoUrl;
			if(picPath == "" || picPath == null) 
			{
				picPath = "images\\";
			}
			var pic = createElement('img', picPath);
			document.getElementById("rimsViewProductImage").appendChild(pic);
		
			// Create image span tag
			var itemPicturePath = createElement('span', picPath);
			// Set attributes to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', itemPicturePath);
			document.getElementById("rimsViewProductImagePath").appendChild(itemPicturePath);
			
			var table = document.getElementById("MaterialTable");
			
			photoJson.items[i].Materials.sort(function(a, b){return a.MaterialName.localeCompare(b.MaterialName)});
			//console.log(JSON.stringify(photoJson));
			for(var j=0; (photoJson.items[i].Materials !== undefined) && (j<photoJson.items[i].Materials.length); j++)
			{ 
				var rowCount = table.rows.length;
				var row = table.insertRow(rowCount);
				if(j%2 == 0) {
					addAttributeToElement('style', 'background:lavender', row);
				}
	 
				var cell0 = row.insertCell(0);
				var deleteButton = createElement('button', 'delete');
				$(deleteButton).button();
				cell0.appendChild(deleteButton);
				addAttributeToElement('width', '32px', cell0);
				//addAttributeToElement('onclick', 'removeRow(this);', deleteButton);
				
				var cell1 = row.insertCell(1);
				var materialNameSpan = createElement('span', photoJson.items[i].Materials[j].MaterialName);
				// Set attribute onmouseover to element
				addAttributeToElement('onmouseover', 'makeEditable(this);', materialNameSpan);
				addAttributeToElement('id', 'viewProductMaterialName', materialNameSpan);
				cell1.appendChild(materialNameSpan);
				addAttributeToElement('class', 'width25', cell1);
						
				var quantity = photoJson.items[i].Materials[j].Value;
				if(quantity == null || quantity === undefined || quantity === "")
				{
					quantity = 0;
				}
				var cell2 = row.insertCell(2);
				
				var materialValueSpan = createElement('span', quantity);
				addAttributeToElement('onmouseover', 'makeEditable(this);', materialValueSpan);
				addAttributeToElement('name', 'viewProductMaterialValue', materialValueSpan);
				addAttributeToElement('class', 'width20', cell2);
				cell2.appendChild(materialValueSpan);
				
				var cell3 = row.insertCell(3);
				var materialUnitSpan = createElement('span', getUnitForMaterial(photoJson.items[i].Materials[j].MaterialName));
				addAttributeToElement('class', 'width20', cell3);
				cell3.appendChild(materialUnitSpan);
				
				var cell4 = row.insertCell(4);
				var materialUnitPriceSpan = createElement('span', getUnitPriceForMaterial(photoJson.items[i].Materials[j].MaterialName));
				addAttributeToElement('class', 'width20', cell4);
				cell4.appendChild(materialUnitPriceSpan);
				
				var cost = quantity * getUnitPriceForMaterial(photoJson.items[i].Materials[j].MaterialName);
				var cell4 = row.insertCell(5);
				var materialCostSpan = createElement('span', cost.toFixed(2));
				addAttributeToElement('name', 'viewProductTotalCost', materialCostSpan);
				addAttributeToElement('style', 'text-align: right;', materialCostSpan);
				cell4.appendChild(materialCostSpan);
			}
			
			// Create labour tag
			var labourValue = photoJson.items[i].labour;
			if(isNaN(labourValue))
			{
				labourValue = 0;
			}	
			var labour = createElement('span', labourValue);
			// Set attribute onmouseover to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', labour);
			addAttributeToElement('id', 'labourValue', labour);
			// Add to page
			document.getElementById("labourValueTd").appendChild(labour);
			
			// Create profit tag
			var profitValue = photoJson.items[i].profit;
			if(isNaN(profitValue))
			{
				profitValue = 0;
			}	
			var profit = createElement('span', profitValue);
			// Set attribute onmouseover to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', profit);
			addAttributeToElement('id', 'profitValue', profit);
			// Add to page
			document.getElementById("profitValueTd").appendChild(profit);
			
			// Create dealerProfit tag
			var dealerProfitValue = photoJson.items[i].dealerProfit;
			if(isNaN(dealerProfitValue))
			{
				dealerProfitValue = 0;
			}	
			var dealerProfit = createElement('span', dealerProfitValue);
			// Set attribute onmouseover to element
			addAttributeToElement('onmouseover', 'makeEditable(this);', dealerProfit);
			addAttributeToElement('id', 'dealerProfitValue', dealerProfit);
			// Add to page
			document.getElementById("dealerProfitValueTd").appendChild(dealerProfit);
			
			CalculateAndSetTotalCost();
						
		}
	}
});


function toggleConvertable(currentElement)
{
	console.log("In view_product.toggleConvertable");
	// This will be called only when user has selected an option from dropdown. So remove focus from current element
	// As makeNonEditable will not convert it to span if it still has focus.
	
	var isConvertable = currentElement.getAttribute("isConvertable");
	console.log("isConvertable recieved:"+isConvertable);
	if(isConvertable == "true")
	{
		addAttributeToElement('isConvertable', "false", currentElement);
	}
	else
	{
		addAttributeToElement('isConvertable', "true", currentElement);
		currentElement.blur();
		makeNonEditable(currentElement);
	}
} 


function addMaterial()
{
	var table = document.getElementById("MaterialTable");
	var row = table.insertRow(0);
	var rowCount = table.rows.length;
	if(rowCount%2 == 1) {
		addAttributeToElement('style', 'background:lavender', row);
	}
	
	var materialJson = readJSON("materials");
	if(materialJson === null || materialJson === undefined)
	{
		console.log("Read failed.")
		alert("The item you are looking is not found in database.");
		return ;
	}
	
	if(materialJson.items[0].MaterialName)
	{
		var cell0 = row.insertCell(0);
		var deleteButton = createElement('button', 'delete');
		$(deleteButton).button();
		cell0.appendChild(deleteButton);
		addAttributeToElement('width', '32px', cell0);

		var cell1 = row.insertCell(1);		
		var materialNameSpan = createElement('span', materialJson.items[0].MaterialName);
		// Set attribute onmouseover to header
		addAttributeToElement('onmouseover', 'makeEditable(this);', materialNameSpan);
		addAttributeToElement('id', 'viewProductMaterialName', materialNameSpan);
		//addAttributeToElement('onclick', 'toggleConvertable(this);', materialNameSpan);
		cell1.appendChild(materialNameSpan);
		addAttributeToElement('class', 'width25', cell1);
	
		var cell2 = row.insertCell(2);
		var materialValueSpan = createElement('span', "0");
		addAttributeToElement('name', 'viewProductMaterialValue', materialValueSpan);
		addAttributeToElement('onmouseover', 'makeEditable(this);', materialValueSpan);
		addAttributeToElement('class', 'width20', cell2);
		cell2.appendChild(materialValueSpan);
		
		makeEditable(materialValueSpan);
		
		var cell3 = row.insertCell(3);
		var unit = getUnitForMaterial(materialJson.items[0].MaterialName)
		var materialUnitSpan = createElement('span', unit);
		addAttributeToElement('class', 'width20', cell3);
		cell3.appendChild(materialUnitSpan);
		
		var cell4 = row.insertCell(4);
		var materialUnitPriceSpan = createElement('span', getUnitPriceForMaterial(materialJson.items[0].MaterialName));
		addAttributeToElement('class', 'width20', cell4);
		cell4.appendChild(materialUnitPriceSpan);
		
		var cell5 = row.insertCell(5);
		var cost = 0;
		var TotalCostSpan = createElement('span', cost.toFixed(2));
		addAttributeToElement('name', 'viewProductTotalCost', TotalCostSpan);
		addAttributeToElement('style', 'text-align: right;', TotalCostSpan);
		cell5.appendChild(TotalCostSpan);
	}
} 


function captureData()
{
	var item = {};
	item.saveTo = "item";
	item.itemName = getChildValue(document.getElementById("rimsViewProductTitle"));
	item.imagePath = getChildValue(document.getElementById("rimsViewProductImagePath"));
	item.itemCode = getChildValue(document.getElementById("rimsViewProductItemCode"));
	item.itemCatagoery = getChildValue(document.getElementById("rimsViewProductCatagoery"));
	item.oldCatagory = getQueryVariable('catagoery');
	item.materials = getChildValue(document.getElementById("MaterialTable"));
	item.labour = getChildValue(document.getElementById("labourValue"));
	item.profit = getChildValue(document.getElementById("profitValue"));
	item.dealerProfit = getChildValue(document.getElementById("dealerProfitValue"));
	return item;
}


function convertToJson(currentElement)
{
	var itemJson = {};
	itemJson = { "itemCode":currentElement.itemCode, "itemName":currentElement.itemName, "photoUrl":currentElement.imagePath, "catagory":currentElement.itemCatagoery, "labour":currentElement.labour, "profit":currentElement.profit, "dealerProfit":currentElement.dealerProfit,
			"Materials"	:
			[
			]
		  };
	
	var totalMaterials = null;
	for(prop in currentElement.materials) {
		totalMaterials++;
	}
	
	for(var i=0; i<(totalMaterials/6);i++)
	{
		var mat = {};
		var materialName;
		var materialValue;
		
		for(var j = 0; j<3; j++)
		{
			
			if(j == 1)
			{
				materialName = currentElement.materials[("0"+i)+j];
			}
			else if(j == 2)
			{
				materialValue = currentElement.materials[("0"+i)+j];
			}			
		}
		//itemJson.Materials.push(mat);
		
		itemJson.Materials.push({
			"MaterialName" : materialName,
			"Value" : materialValue
		});
	}
	
	return itemJson;
}


function validateForm()
{
	var element;
	var table = document.getElementsByName("viewProductMaterialValue");
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
	
	var catagoery = document.getElementById("viewProductCatagoeryValue");
	var isValid = validateElement(catagoery, 'catagoery');
	setErrorState(catagoery, isValid);
	if(!isValid)
	{
		return false;
	}
	
	var labour = document.getElementById("labourValue");
	isValid = validateElement(labour, 'Numeric');
	setErrorState(labour, isValid);
	if(!isValid)
	{
		return false;
	}
	
	var profit = document.getElementById("profitValue");
	isValid = validateElement(profit, 'Numeric');
	setErrorState(profit, isValid);
	if(!isValid)
	{
		return false;
	}
	
	var dealerProfit = document.getElementById("dealerProfitValue");
	isValid = validateElement(dealerProfit, 'Numeric');
	setErrorState(dealerProfit, isValid);
	if(!isValid)
	{
		return false;
	}
	
	var picturePath = document.getElementById("rimsViewProductImagePath");
	isValid = validateElement(picturePath, 'notEmpty');
	setErrorState(picturePath, isValid);
	if(!isValid)
	{
		return false;
	}

	return true;
}


function CalculateAndSetTotalCost()
{
	var costs = document.getElementsByName('viewProductTotalCost');
	var totalCost = 0;
	
	for(var i=0; i<costs.length; i++)
	{
		totalCost += Number(getChildValue(costs[i]));
	}
	document.getElementById('TotalCost').innerHTML = totalCost.toFixed(2);
	
	var labour = getChildValue(document.getElementById('labourValue'));
	labourValue = (totalCost*labour/100);
	if(isNaN(labourValue))
	{
		labourValue = 0;
	}
	totalCost = totalCost + labourValue;
	document.getElementById('labour').innerHTML = labourValue.toFixed(2);
	document.getElementById('totalAfterLabour').innerHTML = totalCost.toFixed(2);
	
	var profit = getChildValue(document.getElementById('profitValue'));
	profitValue = (totalCost*profit/100);
	if(isNaN(profitValue))
	{
		profitValue = 0;
	}
	totalCost = totalCost + profitValue;
	document.getElementById('profit').innerHTML = profitValue.toFixed(2);
	document.getElementById('totalAfterProfit').innerHTML = totalCost.toFixed(2);
	
	var dealerProfit = getChildValue(document.getElementById('dealerProfitValue'));
	dealerProfitValue = (totalCost*dealerProfit/100);
	if(isNaN(dealerProfitValue))
	{
		dealerProfitValue = 0;
	}
	totalCost = totalCost + dealerProfitValue;
	document.getElementById('dealerProfit').innerHTML = dealerProfitValue.toFixed(2);
	document.getElementById('totalAfterDealerProfit').innerHTML = totalCost.toFixed(2);
	
	//var price = Number(totalCost) + Number(profitValue) + Number(dealerProfitValue);
	document.getElementById('TotalPrice').innerHTML = totalCost.toFixed(2);
}



function removeRow(currentElement)
{
	if (!confirm('Are you sure you want to delete this item?')) { 
	 	return;
	}
	var currentRowIndex = currentElement.parentNode.parentNode.rowIndex;
	document.getElementById("MaterialTable").deleteRow(currentRowIndex);
	CalculateAndSetTotalCost();
}


function deleteItem()
{
	if (!confirm('Are you sure you want to delete this item?')) { 
	 	return;
	}
	var currentRowIndex = currentElement.parentNode.parentNode.rowIndex;
	document.getElementById("MaterialTable").deleteRow(currentRowIndex);
	CalculateAndSetTotalCost();
}


function resetData()
{
	if (!confirm('Are you sure you want to Reset this item?')) { 
	 	return;
	}
	location.reload()
}


function deleteProduct()
{
	if (!confirm('Are you sure you want to delete this item?')) { 
	 	return;
	}
	var json = {};
	json.itemCode = getChildValue(document.getElementById("rimsViewProductItemCode"));
	json.catagory = getChildValue(document.getElementById("rimsViewProductCatagoery"));
	
	var isDeleted = deleteFromMasterDataJson("item", json);
	if(isDeleted)
	{
		window.location.href = "index.html";
	}
	else
	{
		alert("Item could not be deleted. Please reload and try again.");
	}
}
