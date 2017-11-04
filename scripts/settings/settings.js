jQuery(document).on("pageinit", "#settings", function()
{
	console.log("In settings.pageinit");
	
	function handleFileSelect(evt) {
		if (!confirm('Are you sure you want to delete current data and restore data stored in this file?')) { 
		 	return;
		}
	   	var files = evt.target.files; // FileList object

		// files is a FileList of File objects. List some properties.
		var output = [];
		for (var i = 0, f; f = files[i]; i++) {
			if(f.type.match('application/javascript'))
			{
				var reader = new FileReader();

				reader.onload = function(e) {
				  var text = reader.result;
				  writeJSON(text, true);
				}

				reader.readAsText(f);
				
			}
		}
	}
 	document.getElementById('loadFile').addEventListener('change', handleFileSelect, false);
  
	
});


function manageMaterials()
{
	window.location.href = "material.html";
} 


function saveData()
{
	var textToWrite = JSON.stringify(readJSON("All"));
	var textFileAsBlob = new Blob([textToWrite], {type:'application/javascript'});
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
	var fileNameToSaveAs = 'Backup_'+today+'.js';

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}
