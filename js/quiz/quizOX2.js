function quizOX_main(setType){
    /******************************************************
    *   변수들
    ******************************************************/
	var _imgURL;
	thisQuizType = setType;
	if (thisQuizType == "quizOX") {
		_imgURL = "./img/quiz_img/quizOX/";
	} else if (thisQuizType == "quizClick") {
		_imgURL = "./img/quiz_img/quizClick"+thisPgNum+"/";
	}
    aUserArr = ['']; //사용자 정답 저장
	var myAndOk = new Array(); //정답여부
	var curQuizMaxNum = aResultArr.length-1;

/*************************************************************************************************/
	function fnCreateBox(){
		var tags ='<div class = "quizBox"></div>'
					   +'<div class = "confirm"></div>'
					   +'<div class = "pointer"><div class = "button"><div class = "answerButton"><img src = "./img/quiz_img/answer.png"></div><div class = "nextButton"><img src = "./img/quiz_img/next.png"></div></div></div>'
					   +'<div class = "figure"></div>';

		$('.linespot').append(tags);
		if(numRetry=="null"){
			//선택시 바로 피드백제시일 경우 확인버튼 안보이게
			$('.button').children('.answerButton').hide();
		}
        $('.button').children('.nextButton').hide();
        $('.figure').hide();
		
		var dapBox = '<div class = "dapBox"></div>'
		$('.linespot').append(dapBox);

	    for(var i = 1; i<=curQuizMaxNum; i++) {
			var quizOXtags =  '<div class="boBox" id="bo_' + i + '"></div>';
			$('.quizBox').append(quizOXtags);

			if(thisQuizType == "quizOX") {
				var quizOXfeed = '<div class="feedOX" id="feedOX_' + i + '"></div>';
				var oxBox = '<div class = "oxDap" id = "oxDap_'+i+'"></div>';
			}else if(thisQuizType =="quizClick") {
				var quizOXfeed = '<img src = "">'
			}

			$('.dapBox').append(oxBox);
			$('.figure').append(quizOXfeed);
		    $('.dapBox').hide();

			for(var j = 1; j <= numImages; j++){
				var quizOXset = '<div class ="clickBtn" id="click_' + i + '_' + j + '"></div>';
				$('#bo_'+i).append(quizOXset);
				if(thisQuizType == "quizOX"){
					$('#click_'+i+'_'+j).css({
						"width" : btnWH[j][0]+"px", "height" : btnWH[j][1]+"px",
						"float":"left",
						"background":"url("+_imgURL+"bn_"+j+"_d.png) no-repeat"
					});
				}else if(thisQuizType == "quizClick"){
					$('#click_'+i+'_'+j).css({
						"width" : bnW+"px", "height" : bnH+"px",
						"float":"left",
						"background":"url("+_imgURL+"bn_"+j+"_d.png) no-repeat"
					});
				}
				if(j>1){
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

        fnHoverEvent();

		$(".clickBtn").bind("click",function(){
			var qNum = this.id.split("_")[1];
			var myNum = this.id.split("_")[2];
			quizInt(qNum,myNum);
		});	   

        $('.button').children(".answerButton").click(function(){
            answerCheck();
        });

	}

    
	function quizInt(Qnum, myNum)	{
		var imgURL_u = _imgURL+"bn_"+myNum+"_u.png"

		if(aUserArr[Qnum]){
			$("#click_"+Qnum+"_"+aUserArr[Qnum]).css({
				"background":"url("+_imgURL+"bn_"+aUserArr[Qnum]+"_d.png"+") no-repeat top/cover"
			});
		}
		aUserArr[Qnum] = myNum;
		if(aUserArr[Qnum] == aResultArr[Qnum]){
			myAndOk[Qnum] = "O";
			console.log("선택 " + Qnum + ": 정답");
		} else{
			myAndOk[Qnum] = "X";
			console.log("선택 " + Qnum + ": 오답");
		}
		$("#click_"+Qnum+"_"+myNum).css({
			"background":"url("+imgURL_u+") no-repeat top/cover"
		});
		if(numRetry == "null"){
			showFeed(Qnum);
			fnRemoveButton(Qnum);
			checkPass();
		};
	}

    function checkPass(){
	//모든 문제 풀이 완료 체크
		var numUndefinedCount = 0;
        for(i = 1; i < aResultArr.length; i++){
    		if(aUserArr[i] == undefined) numUndefinedCount++;
    	}
		console.log("checkPass()   || numUndefinedCount : " + numUndefinedCount);
		if(numUndefinedCount == 0){
			nextQuizGo();
		}
	}

    function answerCheck(){ //정답체크
        for(b = 1; b < aResultArr.length; b++) console.log("aUserArr[" + b + "] = " + aUserArr[b])
        var numUndefinedCount = 0;
    	var numWrongCount = 0;
        for(i = 1; i < aResultArr.length; i++){
    		if(aUserArr[i] == undefined) numUndefinedCount++;
    		else if(aUserArr[i] != aResultArr[i]) numWrongCount++;
    	}
        // 답을 모두 선택하지 않았을때
    	if(numUndefinedCount != 0){
    		fnConfirmShow("select");
    	}
        // 틀린 답이 있을 때
    	else if(numWrongCount != 0){
    		numRetry--;
    		// 재도전 기회가 남아있을때
    		if(numRetry > 0){
    			for(j = 1; j < aResultArr.length; j++){
					$( "#click_"+j+"_"+aUserArr[j] ).css({
						"background":"url("+_imgURL+"bn_"+aUserArr[j]+"_d.png"+") no-repeat top/cover"
					});
   					aUserArr[j] = undefined;
    			}
                fnConfirmShow( "retry" );
                effectCall( "xSound" );
    		}
    		// 기회를 모두 소진하였을 때
    		else {
				$('.button').children('.answerButton').hide();
                fnConfirmShow( "wrong" );
				effectCall( "xSound" );
                fnRemoveButton();
				showFeed();
				nextQuizGo();
    		}
    	}
        // 정답을 맞췄을때
    	else {
			$('.button').children('.answerButton').hide();
			fnConfirmShow("pass");
			effectCall("oSound");
			fnRemoveButton();
			showFeed();
			nextQuizGo();
    	}
    }

	function showFeed(num){
	//OX 피드백 및 답표시
		$('.feedOX').css({
			"position":"absolute",
			"width":"51px","height":"50px","left":"68px"
		});
		if(numRetry != "null"){
		//확인버튼 클릭 시 피드백 제공
			if(thisQuizType == "quizOX"){		
				 for(j = 1; j < aResultArr.length; j++){
					 if(myAndOk[j] == "O"){
						$('#feedOX_' + j).css({
							"top": quizOXbox[j][1]-quizOXfeedMargin,
							"background":"url(./img/quiz_img/sO.png)"
						});
					 }else if(myAndOk[j] == "X"){
						$('#feedOX_' + j).css({
							"top": quizOXbox[j][1]-quizOXfeedMargin,
							"background":"url(./img/quiz_img/sX.png)"
						});
					 }
					 $('#oxDap_'+j).css({
						 "position":"absolute",
						"background":"url("+_imgURL+"quizOX_dap"+j+".png) no-repeat",
						"width" : dapWH[j][0]+"px", "height" : dapWH[j][1] + "px",
						"left" : ($('#click_'+j+'_'+aResultArr[j]).offset().left-7) + "px",	"top": ($('#click_'+j+'_'+aResultArr[j]).offset().top-7) + "px"
					 });
				 }//end for
			}else if(thisQuizType == "quizClick") {
				 if(myAndOk[1] == "O") {
					 $('.figure').children("img").attr('src','./img/quiz_img/O.png');
				 } else if(myAndOk[1] == "X") {
					 $('.figure').children("img").attr('src','./img/quiz_img/X.png');
				 }
				 $('.dapBox').css({
					 "position":"absolute",
					"background":"url(./img/quiz_img/sO.png)",
					"width" : "51px", "height" : "50px",
					"left":$("#click_1_"+aResultArr[1]).offset().left+bnW/2-158+ "px",	
                     "top":$("#click_1_"+aResultArr[1]).offset().top+80+"px"
				 });
			}
		}else{
		//선택하자마자 바로 피드백 제공
			if(thisQuizType == "quizOX"){		
				 if(myAndOk[num] == "O"){
					$('#feedOX_' + num).css({
						"top": quizOXbox[num][1]-quizOXfeedMargin,
						"background":"url(./img/quiz_img/sO.png)"
					});
					effectCall("oSound");
				 }else if(myAndOk[num] == "X"){
					$('#feedOX_' + num).css({
						"top": quizOXbox[num][1]-quizOXfeedMargin,
						"background":"url(./img/quiz_img/sX.png)"
					});
					effectCall("xSound");
				 }
				 $('#oxDap_'+num).css({
					 "position":"absolute",
					"background":"url("+_imgURL+"quizOX_dap"+num+".png) no-repeat",
					"width" : dapWH[num][0]+"px", "height" : dapWH[num][1] + "px",
					"left" : ($('#click_'+num+'_'+aResultArr[num]).offset().left-7) + "px",	"top": ($('#click_'+num+'_'+aResultArr[num]).offset().top-7) + "px"
				 });
			}else if(thisQuizType == "quizClick") {
				 if(myAndOk[1] == "O") {
					 $('.figure').children("img").attr('src','./img/quiz_img/O.png');
					 effectCall("oSound");
				 } else if(myAndOk[1] == "X") {
					 $('.figure').children("img").attr('src','./img/quiz_img/X.png');
					 effectCall("xSound");
				 }
				 $('.dapBox').css({
					 "position":"absolute",
					"background":"url(/img/quiz_img/sO.png)",
					"width" : bnW+"px", "height" : bnH+"px",
					"left":$('#click1_'+aResultArr[1]).offset().left+bnW/2-24+ "px",	
                     "top":$('#click1_'+aResultArr[1]).offset().top+"px"
				 });
			}
		} //end if(numRetry != "null")

	 $('.dapBox').show();
	 $('.figure').show();
	} //end showFeed(num)
    
    function fnHoverEvent(){
        $('.button').children('.answerButton').hover(function(){
                $(this).children('img').attr('src','./img/quiz_img/answer_hover.png')
        },
        function(){
                $(this).children('img').attr('src','./img/quiz_img/answer.png')
        })
        $('.button').children('.nextButton').hover(function(){
                $(this).children('img').attr('src','./img/quiz_img/next_hover.png')
        },
        function(){
                $(this).children('img').attr('src','./img/quiz_img/next.png')
        })
		$('.clickBtn').hover(function(){
			var thisQNum = this.id.split("_")[1];
			var thisNum = this.id.split("_")[2];
			if(aUserArr[thisQNum] != thisNum){
				$(this).css({	"background":"url("+_imgURL+"bn_"+thisNum+"_u.png) no-repeat" });
			}
		},
		function(){
			var thisQNum = this.id.split("_")[1];
			var thisNum = this.id.split("_")[2];
			if(aUserArr[thisQNum] != thisNum){
				$(this).css({	"background":"url("+_imgURL+"bn_"+thisNum+"_d.png) no-repeat" });
			}
		})
    }

	function fnRemoveButton(num){
		if(numRetry != "null"){
			$(".clickBtn").css({
				"pointer-events":"none"
			});
		}else{
			$('#bo_'+num).css({
				"pointer-events":"none"
			});
		}
    }
    
    function fnConfirmShow(_status){
        switch(_status) {
            case "select" : 
				//퀴즈 공통
                $(".confirm").css({"background-image" : "url(./img/quiz_img/select.png)"}).fadeIn(200).delay(700).fadeOut(200);
                break;
            case "retry" : 
				//퀴즈공통
                $(".confirm").css({"background-image" : "url(./img/quiz_img/retry.png)"}).fadeIn(200).delay(700).fadeOut(200);
                break;    
            case "wrong" : 
				//퀴즈공통
                $(".confirm").css({"background-image" : "url(./img/quiz_img/wrong.png)",}).fadeIn(200).delay(700).fadeOut(200);
                break;
            case "pass" : 
				//퀴즈공통
                //$(".confirm").css({"background-image" : "url(./img/quiz_img/pass.png)",}).fadeIn(200).delay(700).fadeOut(200);
                break;
        }
    }
    fnCreateBox();
}