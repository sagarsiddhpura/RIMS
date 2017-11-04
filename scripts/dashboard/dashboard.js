$(document).on("pageinit", "#dashboard", function(){

	$("#grid").append(generatePhotoHtmlFromJson());
	//$("#grid").trigger("create");
	//$("#grid").page();
	
	$("#CatagorySelector a").click(function() {
		
		var itemcode = $(this).attr('id');
		console.log("itemcode:"+itemcode);
		
		$grid.shuffle('shuffle', itemcode);
	});

	var $grid = $('#photoDashboardRow');
	//$sizer = $grid.find('.shuffle__sizer');

	$grid.shuffle({
		itemSelector: '.photoDashboardPhotoDiv',
	//	sizer: $sizer
	});
	//$grid.shuffle( options );

	setupSearching = function() {
	    // Advanced filtering
	    $('#search-basic').on('keyup change', function() {
	      var val = this.value.toLowerCase();
		  console.log("val:"+val);
	      $grid.shuffle('shuffle',val);
	    });
  	};
  
	setupSearching();
	var counter=setInterval(timer, 10);
	function timer()
	{
		clearInterval(counter);
		$(window).resize();
		return;
	}
});
