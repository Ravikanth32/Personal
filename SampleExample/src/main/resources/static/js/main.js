var c = 0;
var t;
var timer_is_on = 0;
var twoDivsActive = false;
var thumbnailActive = false;
var thumbnailSize = 0;
var maginifyLensActive = false;
	$(document).ready(function(){
		var cacheCount;
		var cacheAjax=0;
		var cacheData;
		var cacheTime;
		var cacheSpeed=1;
		var cacheSlow=1;
		var dataId=$("#dataId").val();
		$("#stop").hide();
		var imageEditActive = true;
		$("#subContainer2").show();
		$("#imageEditId").css("color","white");
		if(parseInt(dataId) > 0){
			//$( "#start" ).triggerHandler( "click" );
			$("#start").hide();
			startFunction();
		}
		$("#start").click(function(){
			$(this).hide();
			startFunction();
		});
		
		$("#stop").click(function(){
			stopCount();
			$(this).hide();
			$("#start").show();
		});
		
		$("#speedIncrease").click(function(){
			var time=$("#timeId").val();
			if(time == null || time == undefined || time ==''){
				$("#timeId").val(100)
				time=100;
			}else{
				time=time-20;
				$("#timeId").val(time)
			}
		});
		
		$("#speedDecrease").click(function(){
			var time=$("#timeId").val();
			if(time == null || time == undefined || time ==''){
				$("#timeId").val(100)
				time=100;
			}else{
				time=parseInt(time);
				time=time+100;
				$("#timeId").val(time)
			}
		});
		
		$("#nextId").click(function(){
			var imgFullPath=$("#imgId").attr("src");
			var data=$("#dataNextId").val();
			var arr = imgFullPath.split('/');
			var imgPath=arr[0]+"/"+arr[1]+"/"+arr[2]+"/";
			var imgId = arr[3]
			if(imgId >= 0 && imgId < data-1){
				
				imgId=parseInt(imgId);
				imgId=imgId+1;
			}else if(imgId == data){
				
			}
			$("#nextValueId").val(imgId);
			$("#imgId").attr("src",imgPath+imgId)
			$("#imgId").attr("data-zoom-image",imgPath+imgId)
		});
		
		$("#prevId").click(function(){
			var imgFullPath=$("#imgId").attr("src");
			var data=$("#dataNextId").val();
			var arr = imgFullPath.split('/');
			var imgPath=arr[0]+"/"+arr[1]+"/"+arr[2]+"/";
			var imgId = arr[3];
			
			if(imgId==0){
				
			}else if(imgId >= 0 && imgId < data){
				imgId=parseInt(imgId);
				imgId=imgId-1;
			}else if(imgId >=0 && data == ''){
				imgId=parseInt(imgId);
				imgId=imgId-1;
				
			}
			$("#prevValueId").val(imgId);
			$("#imgId").attr("src",imgPath+imgId)
			$("#imgId").attr("data-zoom-image",imgPath+imgId)
		});
		
		
		$("#resetId").click(function(){
			resetFunction();
		});
		
		var maginifyImage = $('#maginifyZoomId');
		var maginifyConfig = {scrollZoom: true};
		var maginifyActive = false;

		maginifyImage.on('click', function(){

			maginifyActive = !maginifyActive;

		    if(maginifyActive)
		    {
		    	$("#maginifyZoomId").css("color","white");
		    	$("[id ^='imgId']").elevateZoom(maginifyConfig);//initialise zoom
		    }
		    else
		    {
		    	$("#maginifyZoomId").css("color","");
		        $.removeData($("[id ^='imgId']"), 'elevateZoom');//remove zoom instance from image

		        $('.zoomContainer').remove();// remove zoom container from DOM
		    }
		});
		
		
		var maginifyLensImage = $('#maginifyLensZoomId');
		var maginifyLensConfig = {zoomType: "lens",lensShape : "round",lensSize: 150};
		

		maginifyLensImage.on('click', function(){

			maginifyLensActive = !maginifyLensActive;

		    if(maginifyLensActive)
		    {
		    	$("#maginifyLensZoomId").css("color","white");
		    	$("[id ^='imgId']").elevateZoom(maginifyLensConfig);//initialise zoom
		    }
		    else
		    {
		    	$("#maginifyLensZoomId").css("color","");
		        $.removeData($("[id ^='imgId']"), 'elevateZoom');//remove zoom instance from image

		        $('.zoomContainer').remove();// remove zoom container from DOM
		    }
		});
		
		
/*		var maginifyInnerImage = $('#maginifyInnerZoomId');
		var maginifyInnerConfig = {zoomType: 'inner',cursor: 'crosshair'};
		var maginifyInnerActive = false;

		maginifyInnerImage.on('click', function(){

			maginifyInnerActive = !maginifyInnerActive;

		    if(maginifyInnerActive)
		    {
		    	$("#maginifyZoomId").css("color","white");
		    	$("[id ^='imgId']").elevateZoom(maginifyInnerConfig);//initialise zoom
		    }
		    else
		    {
		    	$("#maginifyZoomId").css("color","");
		        $.removeData($("[id ^='imgId']"), 'elevateZoom');//remove zoom instance from image

		        $('.zoomContainer').remove();// remove zoom container from DOM
		    }
		});
*/		
		
		
		var dragImage = $('#dragId');
		var dragConfig = {zoomType: "lens",lensShape : "round",lensSize: 120};
		var dragActive = false;
		
		dragImage.on('click', function(){
			$('#imgId').draggable();
			dragActive = !dragActive;
		    if(dragActive)
		    {
		    	$("#dragId").css("color","white");
		    	 $('#imgId').draggable('enable');
		    }
		    else
		    {
		    	$("#dragId").css("color","");
		    	 $('#imgId').draggable('disable');
		    }
		});
		
		
		
		var horizontalFlipActive = false;
		
		$("#horizontalFlipId").on('click', function(){
			horizontalFlipActive = !horizontalFlipActive;
		    if(horizontalFlipActive)
		    {
		    	$(this).css("color","white");
		    	$("#imgId").addClass("horizontalFlip");
		    }
		    else
		    {
		    	$(this).css("color","");
		    	$("#imgId").removeClass("horizontalFlip");
		    }
		});
		
		
		var verticalFlipActive = false;
		
		$("#verticalFlipId").on('click', function(){
			verticalFlipActive = !verticalFlipActive;
		    if(verticalFlipActive)
		    {
		    	$(this).css("color","white");
		    	$("#imgId").addClass("verticalFlip");
		    }
		    else
		    {
		    	$(this).css("color","");
		    	$("#imgId").removeClass("verticalFlip");
		    }
		});
		
		
		var zoomActive = false;
		$("#zoomId").on('click', function(){
			zoomActive = !zoomActive;

		    if(zoomActive)
		    {
		    	
		    $("#zoomId").css("color","white");
		    	 $('#imgId').bind('mousewheel', function(e){
				        var delta;
				        if (e.originalEvent.wheelDelta !== undefined)
				            delta = e.originalEvent.wheelDelta;
				        else
				            delta = e.originalEvent.deltaY * -1;
				        var imgWidth=$("#imgId").css("width")
				       imgWidth=imgWidth.substr(0,imgWidth.length-2)
				            if(delta > 0) {
				                $("#imgId").css("width", "+=10")
				                if(!dragActive){
					                $("#imgId").center(true);
					                $("#imgId").css("margin-left", "0px")
					                }
				            }
				            else{
				            	if(imgWidth > 200){
				                $("#imgId").css("width", "-=50")
				                if(!dragActive){
				                $("#imgId").center(true);
				                $("#imgId").css("margin-left", "0px")
				                }
				            	}
				            }
				        });
		    }
		    else
		    {
		    	$("#zoomId").css("color","");
		    	$('#imgId').off('mousewheel');
		    }
		});
		
		jQuery.fn.center = function(parent) {
		    if (parent) {
		        parent = this.parent();
		    } else {
		        parent = window;
		    }
		    this.css({
		        "position": "absolute",
		        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
		        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
		    });
		return this;
		}
		
		
		
		
		$("#imageEditId").on('click', function(){
			imageEditActive = !imageEditActive;
		    if(imageEditActive)
		    {
		    	$(this).css("color","white");
		    	$("#subContainer2").show();
		    }
		    else
		    {
		    	$(this).css("color","");
		    	$("#subContainer2").hide();
		    }
		});
		
		
		$('input').change(function(){

		    var $grayscale_value=$('.grayscale').val(),
		    	$blur_value=$('.blur').val(),
		    	$sepia_value=$('.sepia').val(),
		    	$saturation_value = $('.saturation').val(),
		    	$opacity_value = $('.opacity').val(),
		    	$brightness_value = $('.brightness').val(),
		    	$contrast_value = $('.contrast').val(),
		    	$hueRotate_value = $('.hue-rotate').val(),
		    	$invert_value = $('.invert').val(),
		        
		        $grayscale_string = "grayscale("+$grayscale_value+"%)",
		    	$blur_string = "blur("+$blur_value+"px)",
		    	$sepia_string = "sepia("+$sepia_value+"%)",
		    	$saturation_string = "saturate("+$saturation_value+")",
		    	$opacity_string = "opacity("+$opacity_value+"%)",
		        $brightness_string = "brightness("+$brightness_value+"%)",
		    	$contrast_string = "contrast("+$contrast_value+"%)",
		    	$hueRotate_string = "hue-rotate("+$hueRotate_value+"deg)",
		    	$invert_string = "invert("+$invert_value+"%)";
			    $("#grayscaleId").html($grayscale_value);
			    $("#blurId").html($blur_value);
			    $("#sepiaId").html($sepia_value);
			    $("#saturateId").html($saturation_value);
			    $("#opacityId").html($opacity_value);
			    $("#brightnessId").html($brightness_value);
			    $("#contrastId").html($contrast_value);
			    $("#hueRotateId").html($hueRotate_value);
			    $("#invertId").html($invert_value);
		    	
		    $('#imgId').css("-webkit-filter",
		    $brightness_string+$saturation_string+$grayscale_string+$blur_string+$sepia_string+$opacity_string+$contrast_string+$hueRotate_string+$invert_string);
		});
		
		$("#rotateId").click(function(){
			var degree=$(this).val();
			$("#rotationId").html(degree);
				$('#imgId').css({
		            '-webkit-transform':'rotate('+degree+'deg)', 
		            '-moz-transform':'rotate('+degree+'deg)',
		            'transform':'rotate('+degree+'deg)'
		        });
		});

		
		var tempDivWidth=0;
		var tempImgWidth=0;
		var tempImgMargin=0;
		$("#twoDivsId").click(function(){
		twoDivsActive = !twoDivsActive;
			if(twoDivsActive)
		    {
				resetFunction();
				stopShowing();
				var divWidth=$(".imageDiv").css("width")
				tempDivWidth=divWidth
				var imgWidth=$("#imgId").css("width")
				tempImgWidth=imgWidth
			    
				var imgMargin=$("#imgId").css("margin-left")
				tempImgMargin=imgMargin
				divWidth=divWidth.substr(0,divWidth.length-2)
				$(".imageDiv").css("width",parseInt(divWidth/2));
				imgWidth=imgWidth.substr(0,imgWidth.length-2)
				$("#imgId").css("width",parseInt(imgWidth/2));
				imgMargin=imgMargin.substr(0,imgMargin.length-2)
				$("#imgId").css("margin-left",parseInt(imgMargin/2));
				var cloneDiv=$(".imageDiv").clone()
				$("#container2").append(cloneDiv);
		    }
		    else
		    {
		    	$(".imageDiv").css("width",tempDivWidth)
		    	$("#imgId").css("width",tempImgWidth);
		    	$("#imgId").css("margin-left",tempImgMargin);
		    	$("#twoDivsId").css("color","");
		    	$("#container2").empty();
		    	resetFunction();
				stopShowing();
		    }
		});
		
		
		var containerActive1 = false;
		$("#container1").click(function(){
			containerActive1 = !containerActive1;
			if(containerActive1)
		    {
		    	$("#selectContainer1").val("1")
		    	$("#container1","#imageDiv").css("border", "1px solid green");
		    }
		    else
		    {
		    	$("#selectContainer1").val("0")
		    }
		});
		
		
		var containerActive2 = false;
		$("#container2").click(function(){
			containerActive2 = !containerActive2;
			if(containerActive2)
		    {
		    	$("#selectContainer2").val("1")
		    	$("#imageDiv").css("border", "1px solid green");
		    }
		    else
		    {
		    	$("#selectContainer2").val("0")
		    	
		    	
		    }
		});
		
		
		/*$('[id ^= "thumbnailId"]').click(function(){
			//alert("hii"+$(this).attr("src"))
			thumbnailActive = !thumbnailActive;
			thumbnailSize=$(this).attr("data-size");
			if(thumbnailActive)
		    {
				stopShowing();
				$(this).removeClass("blackBorderClass");
				$('[id ^= "thumbnailId"]').each(function(){
					if($(this).hasClass("whiteBorderClass")){
						$(this).removeClass("whiteBorderClass");
					}
				});
				//$([id ^= "thumbnailId"]).find(".whiteBorderClass").addClass("blackBorderClass")
				$("#dicomId").val($(this).attr("data-key"))
				$("#dataId").val($(this).attr("data-size"))
				$("#dataNextId").val($(this).attr("data-size"))
		    	$(this).addClass("whiteBorderClass");
		    	$("#imgId").attr("src",$(this).attr("src"))
		    	$(this).attr("data-flag","true")
		    	if(parseInt($(this).attr("data-size")) > 0){
		    		//$( "#start" ).trigger( "click" );
		    		$("#start").hide();
					$("#stop").show();
					var time=$("#timeId").val();
					if(time == null || time == undefined || time ==''){
						$("#timeId").val(100)
						time=100;
					}
					cacheTime=time;
					//ajaxFunction(time);
					startCount()
		    	}
		    	
		    }
		    else
		    {
		    	$(this).removeClass("whiteBorderClass");
		    	$(this).addClass("blackBorderClass");
		    	stopShowing();
		    	$('[id ^= "thumbnailId"]').each(function(index){
		    		if(index == 0){
		    			$("#imgId").attr("src",$(this).attr("src"))
		    			$("#dicomId").val($(this).attr("data-key"))
						$("#dataId").val($(this).attr("data-size"))
						$("#dataNextId").val($(this).attr("data-size"))
						$(this).attr("data-flag","true")
		    		}
		    	});
		    	
		    }
			
		});*/
		
		
		
		$('[id ^= "thumbnailId"]').click(function(){
			resetFunction();
			thumbnailActive = !thumbnailActive;
			thumbnailSize=$(this).attr("data-size");
				stopShowing();
				$(this).removeClass("blackBorderClass");
				$('[id ^= "thumbnailId"]').each(function(){
					if($(this).hasClass("whiteBorderClass")){
						$(this).removeClass("whiteBorderClass");
					}
				});
				$("#dicomId").val($(this).attr("data-key"))
				$("#dataId").val($(this).attr("data-size"))
				$("#dataNextId").val($(this).attr("data-size"))
		    	$(this).addClass("whiteBorderClass");
		    	$("#imgId").attr("src",$(this).attr("src"))
		    	$("#imgId").attr("data-zoom-image",$(this).attr("src"))
		    	$(this).attr("data-flag","true")
		    	if(parseInt($(this).attr("data-size")) > 0){
		    		//$( "#start" ).triggerHandler( "click" );
		    		$( "#start" ).hide();
		    		startFunction();
		    	}
		    	
		    	if(maginifyLensActive){
		 			var src=$('[id ^="imgId"]').attr("src");
		 			$(".zoomLens").css("background-image",src)
		 		}
		    	
			
		});
		
		
		
		
		
	});
	
	function ajaxFunction(time){
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "/ajax",
			dataType : 'json',
			timeout : 100000,
			success : function(data) {
				$("#dataId").val(data);
			}
		});
	}
	
	
	
	 function timedCount() {
		 var data=0;
		 if(thumbnailActive){
			 data=thumbnailSize;
		 }else{
			 data=$("#dataId").val()
			 console.log("hiii"+data)
			 if(data == '' || data == undefined || data == null  ){
				 data=$("#dataNextId").val();
			 }
		 }
		 
		 var time=$("#timeId").val();
		 $("#txt").val(c)
		    c = c + 1;
		    t = setTimeout(function(){ 
		    	 if(c == data){
		    		 stopShowing();
				    }else{
				    	var con1=$("#selectContainer1").val();
				    	var con2=$("#selectContainer2").val();
				    	var dicomId=$("#dicomId").val()
				    	if(twoDivsActive){
					    	if(con1 == 1){
					    		$('#container1 #imgId').attr("src","/images/"+dicomId+"/"+c);
					    		$('#container1 #imgId').attr("data-zoom-image","/images/"+dicomId+"/"+c);
					    	}
					    	if(con2 == 1){
					    		$('#container2 #imgId').attr("src","/images/"+dicomId+"/"+c);
					    		$('#container2 #imgId').attr("data-zoom-image","/images/"+dicomId+"/"+c);
					    	}
					    	if(con1 ==1 && con2 ==1 ){
					    		$('#container1 #imgId').attr("src","/images/"+dicomId+"/"+c);
					    		$('#container2 #imgId').attr("src","/images/"+dicomId+"/"+c);
					    		$('#container1 #imgId').attr("data-zoom-image","/images/"+dicomId+"/"+c);
					    		$('#container2 #imgId').attr("data-zoom-image","/images/"+dicomId+"/"+c);
					    	}
				    	}else{
				    		var dicomId=$("#dicomId").val()
				    		$('[id ^="imgId"]').attr("src","/images/"+dicomId+"/"+c);
				    		$('[id ^="imgId"]').attr("data-zoom-image","/images/"+dicomId+"/"+c);
				    		 if(maginifyLensActive){
						 			var src=$('[id ^="imgId"]').attr("src");
						 			$(".zoomLens").css("background-image",src)
						 		}
				    	}
				    	timedCount(data,time);
				    }
		    	 
		    	}, time);
		   
		    
		}

		function startCount() {
			var time=time;
		    if (!timer_is_on) {
		        timer_is_on = 1;
		        timedCount();
		    }
		}

		function stopCount() {
		    clearTimeout(t);
		    timer_is_on = 0;
		} 
		
		function rotateImage(degree) {
			$('#imgId').css({
	            '-webkit-transform':'rotate('+degree+'deg)', 
	            '-moz-transform':'rotate('+degree+'deg)',
	            'transform':'rotate('+degree+'deg)'
	        });
		}
		
		function resetFunction(){
			$('#imgId').css("-webkit-filter","none").css("transform","rotate(0deg)");
			$("#rotateId").val("0");
			$(".grayscale").val("0");
			$(".blur").val("0");
			$(".sepia").val("0");
			$(".saturate").val("100");
			$(".opacity").val("100");
			$(".brightness").val("100");
			$(".contrast").val("100");
			$(".hue-rotate").val("0");
			$(".invert").val("0");
			
			$("#grayscaleId").html("0");
		    $("#blurId").html("0");
		    $("#sepiaId").html("0");
		    $("#saturateId").html("100");
		    $("#opacityId").html("100");
		    $("#brightnessId").html("100");
		    $("#contrastId").html("100");
		    $("#hueRotateId").html("0");
		    $("#invertId").html("0");
		    $("#rotationId").html("0");
		}
	function stopShowing(){
		stopCount();
    	c=0;
    	$(this).hide();
    	$("#start").show();
		$("#stop").hide();
		$("#dataId").val("");
		$("#timeId").val("");
	}
	
	function startFunction(){
		$("#stop").show();
		var time=$("#timeId").val();
		if(time == null || time == undefined || time ==''){
			$("#timeId").val(100)
			time=100;
		}
		cacheTime=time;
		startCount()
	}
	