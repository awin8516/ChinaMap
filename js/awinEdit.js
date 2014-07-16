	var bgColor,nameColor;
	$(document).ready(function(){
		bgColor = $(".top_item .bgColorValue").val();
		nameColor = $(".top_item .nameColorValue").val();
		var btn_move = $('.btn_move');		
		var form_input = $('.form_input');
		var ResultTip = $('.ResultTip');		
		form_input.offset({ top: 20, left: ($(window).width() - 560)/2 + 500 });
		ResultTip.offset({ top: 30, left: ($(window).width() - 560)/2 + 545 });
		
		var moved=false;
		function toggle(){ if(!moved){$(".toggle").toggle()}  }
		
		btn_move.bind({
			mousedown:mouseDown,
			mouseup:function(){ toggle(); moved = false; }/* 因为js 事件顺序是 mousedown->mouseup->click,所以toggle绑在up上面，好在moved赋值前执行*/
		});
		
		
		/* 以下代码处理框体是否可以移动 */
		
		var mouse={x:0,y:0};
		function moveDialog(event)
		{
			
			moved = true;
			
			var e = window.event || event;
			var top = parseInt(form_input.css('top')) + (e.clientY - mouse.y);
			var left = parseInt(form_input.css('left')) + (e.clientX - mouse.x);
			form_input.css({top:top,left:left});
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		function mouseDown(event){			
			var e = window.event || event;
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			btn_move.addClass("down");
			$(document).bind('mousemove',moveDialog);
		};	
		
		$(document).mouseup(function(event){
			$(document).unbind('mousemove', moveDialog);
			btn_move.removeClass("down");
		});	
	});
		
	
	function CreateColor(){	
		$(".colors").miniColors({
			change: function(hex, rgb) {
				$("#console").prepend('HEX: ' + hex + ' (RGB: ' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')<br />');
			}
		});
	}
	
	var Rank = 1;
	var data = [];
		
	function submit(){
		var len = $(".top_item u").size();
		var Complete= false;	
		
		
		for(var i=0 ;i<len;i++){
			data[i] = {"AreaName": $(".top_item b").eq(i).text(),"sum": $(".top_item .sum").eq(i).val(),"color": $(".top_item .colors").eq(i).val()};
			if( i == len-1){Complete = true;}
		}
		Bind(data,$(".top_item .bgColorValue").val(),$(".top_item .nameColorValue").val());
		//$(".toggle").toggle();
		$(".ResultTip").css("visibility","visible");		
	}