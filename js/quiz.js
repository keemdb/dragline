var quizSceneNum = 1;
var quizMaxNum = quizInfoArray[thisPageNum].length-1;

function conQuizSet() {
	if(pageInfoArray[thisPageNum][1].split("_")[0]== "quiz" || pageInfoArray[thisPageNum][1].split("_")[0]== "choice" ) {
		$("#pageWrap").append ("<iframe name=quizFrame width=100% height=100% frameborder=0 scrolling=no id=quizFrame></iframe>");
		pageQuizSet();
		quizSet();
	}
}

//퀴즈 유형별 페이지 연결
function pageQuizSet() {
	var objTempFrame = document.getElementById ("quizFrame");
		console.log(  "quizInfoArray["+thisPageNum+"]["+quizSceneNum+"] : "+ quizInfoArray[thisPageNum][quizSceneNum]  );
		objTempFrame.src = quizInfoArray[thisPageNum][quizSceneNum] + ".html";
}

function quizSet() {
	//퀴즈 공통 배경
	$("#pageWrap").css({
		"background":"url(img/quiz_img/quiz_bg.png) no-repeat",
		"background-color":"#f2f2f2",
		"height":"685px"
	});
}
