var totalPageNum = pageInfoArray.length-1;
var htmlType = pageInfoArray[thisPageNum][1].split("_")[0];

$(document).ready(function(){

		conInitialize();  //utility.js
		topTitleSet();  //utility.js
		conQuizSet();   //quiz.js

		if(!porting){
			backNextSet(); //utility.js
			first_end(); //utility.js
			page_num(); //utility.js

			$("#prev").bind("click",function(){
				if(thisPageNum == 1){
					alert("ù������");
				}else{
					goNumber = thisPageNum-1;
					document.location.href = "./"+itostr(goNumber)+".html";
				}
			})

			$("#next").bind("click",function(){
				if(thisPageNum == thisTotalPage){
					alert("������������");
				}else{
					goNumber = thisPageNum+1;
					document.location.href = "./"+itostr(goNumber)+".html";
				}
			})
		}

	if(htmlType == "quiz") {
		loadMediaURL = "./mov/quiz_intro"+pageInfoArray[thisPageNum][1].split("_")[1]+".mp4"
	}else if(pageInfoArray[thisPageNum][1] == "mov") {
		loadMediaURL = "./mov/"+itostr(thisChasiNum) + "_"+itostr(thisPageNum) +".mp4";
	}else if(htmlType == "choice") {
		loadMediaURL = "./mov/choice"+pageInfoArray[thisPageNum][1].split("_")[1] + ".mp4";
	}

	mvObject = $("#myVideo");
	mvObject.attr("src",loadMediaURL);
	
	isMediaObj= $("#myVideo")[0];
	isMediaObj_w = isMediaObj.width;

	conObject = $("#pageWrap");
	conObject.css("display","none");

	if(htmlType == "quiz" || htmlType == "choice")
	{

		if(htmlType == "quiz"){
	  	mvObject.prop("controls", false); //��Ʈ�ѷ� �����
		}else{
			mvObject.prop("controls", true); //choice���� ������ ��� �����Ŵ
		}
		isMediaObj.addEventListener("ended",_quizShow);
	} else if (pageInfoArray[thisPageNum][1] == "mov"){
		mvObject.css({
			"top":"50%",
			"margin-top":"-280px",
		});
	}

});

function _quizShow()
{
	$(".topTitle").css({ "display":"block"});
	mvObject.css("display", "none");
	conObject.css("display","block");
}

