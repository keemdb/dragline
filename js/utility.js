var porting = false;     //포팅시 true;
var conisMobile = false;
var thisTotalPage = pageInfoArray.length-1;  //page_info.js
var _con_cw = 1010;					// 콘텐츠 너비
var _con_ch = 685;					// 콘텐츠 높이

var con_container_scale = 1;

var con_init_w, con_init_h; // 아이폰용

function conInitialize() {

	// F12 버튼 방지
	//noneSourseContents();

	mobile_con_check();

	//---------------------------------------- 반응형 -------------------------------------------//
	// 아이폰 반응형 세팅
	con_init_w = screen.availWidth;
	con_init_h = screen.availHeight;
	
	// 반응형 세팅
	if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.indexOf('Safari') != -1){
		if(window.orientation == 0){
			conResponsive_ios(con_init_h, con_init_w);
		}else{
			conResponsive_ios(con_init_w, con_init_h);
		}
	} else {
		conResponsive();
	}
	conResponsive();
}

$(window).resize(function(){
	if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.indexOf('Safari') != -1){
		updateOrientation();
	}
	conResponsive();
});

function extractUrlParameterMap() {
		var url = window.location.search.substring(1);
		var idx = url.lastIndexOf('?');
		var queryString = (idx==-1)?url:url.substring(idx+1);

		var queryParameter = {};
		if ( queryString == undefined || queryString.length == 0 )
				return queryParameter;
		var items = queryString.split('&');
		for (var i= 0, l=items.length; i<l; i++)	{
				var pair = items[i].split('=');
				queryParameter[pair[0]] = pair[1];
		}
		return queryParameter
}

function getContentId() {
		var param = extractUrlParameterMap();
		return param['content_id'];
}

function updateOrientation(){
    switch(window.orientation){
        case 0:
						conResponsive_ios(con_init_h, con_init_w);
            break;
        case -90:
						conResponsive_ios(con_init_w, con_init_h);
            break;
        case 90:
						conResponsive_ios(con_init_w, con_init_h);
            break;
        case 180:
            break;
    }
}

window.onload = function() {
    document.body.onorientationchange = updateOrientation;
}

//responsive
function conResponsive(){

	var w_h = $(window).height();
	var w_w = $(window).width();
	
	if( w_w < _con_cw){
		var w_scale = w_w/_con_cw;
		con_container_scale = w_scale;
	}else{
		con_container_scale = 1;
	}

	if(conisMobile){
		if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.indexOf('Safari') != -1) { //아이폰 계열

		} else { // 안드로이드 계열
		$("#content_inner").css("top", 0);
		$("#content_inner").css("left", 0);

		var ttt = $("#content_inner").position();		
		$("#content_inner").css("top", -ttt.top);
		$("#content_inner").css("left", -ttt.left);

		}
	}

	$("#content_inner").css("transform","scale("+con_container_scale+")");

	var param = extractUrlParameterMap();
	var contentId = param['content_id'];
	var height = con_container_scale*_con_ch;
	
	window.parent.postMessage( contentId + '_' + height, '*');
}


//responsive ios
function conResponsive_ios(_w, _h){
	var param = extractUrlParameterMap();
	var contentId = param['content_id'];

	var w_h_ios, w_w_ios, height_ios, w_scale_ios, h_scale_ios;

	if(conisMobile){
		w_h_ios = _w;
		w_w_ios = _h;						
		w_scale_ios = w_w_ios/_con_cw;
		h_scale_ios = w_h_ios/_con_ch;
		height_ios = w_scale_ios*_con_ch;	
		$("content_inner").css("transform","scale("+w_scale_ios+")");
	}
}


// 모바일 여부 체크
function mobile_con_check(){
	var tmp = navigator.userAgent;
	if(tmp.indexOf("iPhone") > 0 || tmp.indexOf("iPod") > 0 || tmp.indexOf("iPad") > 0 || tmp.indexOf("Android")>0){
		 conisMobile = true;
	}else{
		 conisMobile = false;
	}
	console.log("conisMobile == " + conisMobile);
}


function noneSourseContents()
{
      $(document).bind('keydown',function(e){
            if ( e.keyCode == 123 /* F12 */) {
                e.preventDefault();
                e.returnValue = false;
				alert(status);
            }
        });
    
    // 우측 클릭 방지
    document.onmousedown=disableclick;
    status="Right click or F12 key enter is not available.";
    
    function disableclick(event){
        if (event.button==2) {
            alert(status);
            return false;
        }
    }
}

function topTitleSet(){
	if(pageInfoArray[thisPageNum][1] !="mov"){
		$(".leftTitle").css({
			"background":"url(img/topptitle_"+itostr(thisPageNum)+".png) no-repeat"
		});
		$(".course").css({
			"background":"url(img/course.png) no-repeat"
		});
		$(".topTitle").css({ "display":"none"});
	}

}

function backNextSet(){
	var footer = "";
	footer += '  <button id="prev"></button>';
	footer += '  <button id="next"></button>';
	footer += '  <p class="page">';
	footer += '		<span class="curPage">00</span> / <span class="toPage">00</span> ';
	footer += '  </p>';

	$("#footer").append(footer);
}




//페이지 이동
function first_end(){
	if(thisPageNum == 1){
		$("#prev").css("display","none");
	}
	if(thisPageNum == thisTotalPage){
		$("#next").css("display","none");
	}
}


function page_num(){
	$(".curPage").html(itostr(thisPageNum));
	$(".toPage").html(itostr(thisTotalPage));
}



function itostr(n){
	n = Number(n);
	if(n<10){
		return "0"+n;
	}else{
		return ""+n;
	}
}