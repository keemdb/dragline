	var thisURL = document.location.href.split("?")[0].split("#")[0];
	var thisURLArr = thisURL.split("/")
	var thisPgName = thisURLArr[thisURLArr.length-1];
	var thisPgNum = thisPgName.split(".")[0].substr(-1);
   
	var quizSceneNum = parent.quizSceneNum;
	var thisPageNum = parent.thisPageNum;
	var quizMaxNum =  parent.quizMaxNum;
	var _con_cw = parent._con_cw;
	var _con_ch = parent._con_ch;
	var thisQuizType;

	//문제별 배경
	function quizBgSet() {
		$(".quizBg").css({
			"width" :  _con_cw,
			"height" : _con_ch,
			"background":"url(img/quiz_img/"+thisPgName.split(".")[0]+"/quizBg.png) no-repeat"
		});
	}

	var _imgURL = "./img/quiz_img/"+thisPgName.split(".")[0]+"/";

//================================================================================================================================/

var numRetry = 2;

var aQuizResult = new Array();
var numsucceededQuizCount = 0;
var effectSound = new Audio();
effectSound.src='';
function effectCall(_name){
  if(effectSound.src!='') effectSound.pause();
  effectSound.src='./mp3/'+_name+'.mp3';
  effectSound.load();
  effectSound.play();
}

function setQuizType(setType) {
	if(setType.split("_")[0].length > 1) {
		setType = setType.split("_")[0];
	}
	switch(setType) {
		case "quizOX" :
			quizOX_main(setType);
			break;
		case "quizClick" :
			quizOX_main(setType);
			break;
		case "dragLine":
			line_main();
			break;
		case "dragType":
			drag_main();
			break;
		case "choice":
			choice_main();

			break;
	}
}

    function fnHoverEvent() {
		$('.button').children('.answerButton').hover(function() {
				$(this).children('img').attr('src','./img/quiz_img/answer_hover.png')
		},
		function(){
				$(this).children('img').attr('src','./img/quiz_img/answer.png')
		})
		$('.button').children('.nextButton').hover(function(){
				$(this).children('img').attr('src','./img/quiz_img/next_hover.png');
				$(this).css({
					"opacity":"1"
				});
		},
		function(){
				$(this).children('img').attr('src','./img/quiz_img/next.png');
				$(this).css({
					"animation":"nextButtonAni 1s infinite",
					"animation-play-state": "running"
				});
		})
    }

function nextQuizGo() {
	if(parent.quizSceneNum < quizMaxNum) {
        $('.button').children('.nextButton').show();
		$('.nextButton').css({	    "top" : "50%","animation":"nextButtonAni 1s infinite" });
		console.log("다음문제버튼");
	} else{
		$('.button').children('.nextButton').show();
		$('.nextButton').children('img').attr('src','./img/quiz_img/endQuiz.png');
		$('.nextButton').css({	"pointer-events":"none","top" : "92%","left":"71.5%","animation-play-state": "paused","opacity":"1"});
		console.log("마지막문제풀이완료");
	}
	$(".nextButton").click(function(){
		parent.quizSceneNum++;
		parent.pageQuizSet();
	});
}

$(document).ready(function($) {

	quizSceneNum = 1;
	quizMaxNum = 3;

	_con_cw = 1010;
	_con_ch = 685;

	thisQuizType = thisPgName.split(".")[0].split("_")[0];
	console.log (
		"==================================================================================================== \n"
		+ "      :::: 현재 퀴즈 정보 ::::"+"\n" + "      현재 페이지 : " + thisPageNum + " ||   지금은 " + thisQuizType +"타입,  "+ quizSceneNum + "/" + quizMaxNum +" 퀴즈 풀이 중  ||  콘텐츠 크기 : " + _con_cw + "x" + _con_ch
		+ "\n===================================================================================================="
	);
	quizBgSet();
	setQuizType(thisQuizType);

});


function itostr(n) {
	n = Number(n);
	if(n<10) {
		return "0"+n;
	}else{
		return ""+n;
	}
}