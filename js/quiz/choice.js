    /******************************************************
    *   변수들
    ******************************************************/
   var qmvObject;
   var qisMediaObj;
    aUserArr = ['']; //사용자 정답 저장
	var myAndOk = new Array(); //정답여부
	var curQuizMaxNum = quizOXbox.length-1;
	var clickOK = false;

function choice_main(setType){

/*************************************************************************************************/
	function fnCreateBox() {
		var tags ='<div class = "guideTxt"></div>'
					   +'<div class = "quizBox"></div>'
/*					   +'<div class = "pointer"><div class = "button"><div class = "answerButton"><img src = "./img/quiz_img/answer.png"></div><div class = "nextButton"><img src = "./img/quiz_img/next.png"></div></div></div>'*/

		$('.linespot').append(tags);

		var movBox =' <div id="movBox">'
							  +'		<video id = "myVideo" width="100%" preload="auto" autoplay controls>'
               		          +'				<source id="myVideoSrc" type="video/mp4">'
							  +'		</video>'
							  +' <div id="closeBtn"></div>'
							  +' </div>'

		$('.linespot').append(movBox);
		
		qmvObject = $("#myVideo");
		qisMediaObj = $("#myVideo")[0];
		$("#movBox").hide();

	    for(var i = 1; i<=curQuizMaxNum; i++) {
			var quizOXtags =  '<div class="boBox" id="bo_' + i + '"></div>';
			$('.quizBox').append(quizOXtags);

			for(var j = 1; j <= numImages; j++){
				var quizOXset = '<div class ="clickBtn" id="click_' + i + '_' + j + '"></div>';
				$('#bo_'+i).append(quizOXset);
				$('#click_'+i+'_'+j).css({
						"width" : bnW+"px", "height" : bnH+"px",
						"float":"left"
				});
				clickBtnImg();
				if(j>1) {
					$('#click_'+i+'_'+j).css({
						"margin-left": quizOXboxMargin +"px"
					});
				}
			}
			$('#bo_'+i).css({
				"position":"absolute",
				"left" : quizOXbox[i][0] +"px",
				"top" : quizOXbox[i][1] +"px",
			});
		}

		fnHoverEvent2();

		$(".clickBtn").bind("click",function(){
			var qNum = this.id.split("_")[1];
			var myNum = this.id.split("_")[2];
			quizInt(qNum,myNum);
			aUserArr[qNum] = null;
			clickOK =true;
		});	

		$("#closeBtn").bind("click",function(){
			_choiceShow();
		});
	}

	function quizInt(Qnum, myNum)	 {
		console.log("is Click Num : " + myNum);
		aUserArr[Qnum] = myNum;
		$("#movBox").show();
		loadMediaURL =  "./mov/choiceMov"+myNum+".mp4"
		qmvObject.attr("src", loadMediaURL);
	}

    function fnHoverEvent2() {
		$('.clickBtn').hover(function() {
			var thisQNum = this.id.split("_")[1];
			var thisNum = this.id.split("_")[2];
			if(aUserArr[thisQNum] != thisNum){
				$(this).css({	"background":"url("+_imgURL+"bn_"+thisNum+"_u.png) no-repeat" });
                $(".clickBtn").not(this).css("opacity","0.5");
			}
		},
		function(){
			var thisQNum = this.id.split("_")[1];
			var thisNum = this.id.split("_")[2];
			if(aUserArr[thisQNum] != thisNum) {
				$(this).css({	"background":"url("+_imgURL+"bn_"+thisNum+"_d.png) no-repeat" });
                $(".clickBtn").not(this).css("opacity","1");
			}
		})
    }
    fnCreateBox();
	_guideTxtShow();

	qisMediaObj.addEventListener("ended", _choiceShow);    //선택한 영상 재생 완료시 자동으로 선택화면으로 돌아가기
}


function _choiceShow(){
	//선택한 영상 재생 완료시 자동으로 선택화면으로 돌아가기
	$("#movBox").hide();
	clickBtnImg();
	_guideTxtShow();
}

function clickBtnImg() {
	for(var i = 1; i<=curQuizMaxNum; i++) {
		for(var j = 1; j <= numImages; j++){
			$('#click_'+i+'_'+j).css({
				"background":"url("+_imgURL+"bn_"+j+"_d.png) no-repeat"
			});
		}
	}
}

function _guideTxtShow(){
	if(!clickOK){
		$(".guideTxt").css({	"background":"url("+_imgURL+"guidetxt.png) no-repeat" });
	}else{
		//다시 선택시 나오는 문구텍스트
		$(".guideTxt").css({	"background":"url("+_imgURL+"guidetxtRe.png) no-repeat" });
	}
}