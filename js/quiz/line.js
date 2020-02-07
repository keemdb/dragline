function line_main(){
    var aInitDragLeft = new Array();    //드래그 초기 행값
    var aInitDragTop = new Array();     //드래그 초기 열값
    var aInitDropLeft = new Array();    //드롭 초기 행값
    var aInitDropTop = new Array();     //드롭 초기 열값
    var aUserArr = new Array();         //선택한 답
    var aDragRemove = new Array();      //삭제할 드래그 목록
    var aDropRemove = new Array();      //삭제할 드롭 목록
    var aImageRemove = new Array();
    var aDragLeftLocation = new Array();    //드래그의 현재 x좌표값
    var aDragTopLocation = new Array();     //드래그의 현재 y좌표값
    var bolActive;                      //드래그 이동 제어
    var numDropValue;                   //최근에 드롭한 드래그박스의 번호
    var numDragValue;                   //최근에 드래그한 드롭박스의 번호
    var bolWrongPicture = false;
    
    /******************************************************
    *   제어 변수
    ******************************************************/
    
    var bolLineView = true;         //선잇기
    var bolDragView = true;         //드래그
    var bolDropView = true;        //드롭
    var bolImageView = true;       //이미지
    var bolTitleImageUse = false;   //타이틀 
    
    /******************************************************
    *   수정해야하는 변수
    ******************************************************/    
   
    var numLineColor = "#000";                                          //라인 색깔
    var numLastLineColor = "#F00";                                      //틀린 답 라인 색깔
    var numLineBold = 2;                                                //선 두께
    var strAniSpeed = "0s";                                             //애니메이션 속도
    var strExtension = ".png";                                          //확장자명


    
    function fnCreateBox(){
        var tags =  '<div class = "confirm"></div>'
                   +'<div id = "line"><canvas id="myCanvas"></canvas><canvas id="lastCanvas"></canvas></div><div class = "Image"></div><div class = "Drop"></div><div class = "pointer"><div class = "Drag"></div></div>'
                   +'<div class = "pointer"><div class = "button"><div class = "answerButton"><img src = "./img/quiz_img/answer.png"></div><div class = "nextButton"><img src = "./img/quiz_img/next.png"></div></div></div>'
                   +'<div class = "figure"><img src = "./img/quiz_img/O.png"></div>'
        $('.linespot').append(tags);
		if(numRetry=="null" || numRetry == 1){
			//선택시 바로 피드백제시일 경우 확인버튼 안보이게
			$('.button').children('.answerButton').hide();
		}
        $('.button').children('.nextButton').hide();
        $('.figure').hide();
        fnDragBox();
        fnDropBox();
        fnImage();
        fnCanvas();
        fnHoverEvent();
        

        
        $('.button').children(".answerButton").click(function(){
            answerCheck();
        });

       
        
        if(bolDragView == true){
            for(i=1; i<=numDrags; i++){ 
                $( '#drag_' + i).draggable({
                    start: function() { //드래그를 시작했을때
                        $(this).css({"position" : "absolute", "transition" : "0s"});
                        bolActive = true;
                        numDragValue = this.getAttribute('id').split("_")[1];
                        aUserArr[numDragValue] = undefined;
                        fnCanvas();
                    },
                    drag: function() {
                        var elLine = document.getElementById("line");
                        var leftValue = $( '#drag_' + numDragValue).offset().left;
                        var topValue = $( '#drag_' + numDragValue).offset().top;
                        aDragLeftLocation[numDragValue] = leftValue / elLine.offsetWidth  * 100 + "%";
                        aDragTopLocation[numDragValue] = topValue / elLine.offsetHeight * 100 + "%";
                        fnCanvas();
                    },
                    stack:".draggable", //높이
                    scroll: false   //스크롤
                });
                $('#drag_' + i).droppable({ //다른 드래그 항목에 드롭
                    drop: function (event, ui) {
                        bolActive = false;
                        $("#drag_"+numDragValue).css({"position" : "absolute", "left" : aInitDragLeft[numDragValue], "top" : aInitDragTop[numDragValue], "transition" : strAniSpeed});
                        var elLine = document.getElementById("line");
                        var leftValue = $( '#drag_' + numDragValue).offset().left;
                        var topValue = $( '#drag_' + numDragValue).offset().top;
                        aDragLeftLocation[numDragValue] = leftValue / elLine.offsetWidth  * 100 + "%";
                        aDragTopLocation[numDragValue] = topValue / elLine.offsetHeight * 100 + "%";
                        fnCanvas();

                    }
                });
                $('.linespot').droppable({
                    drop: function (event, ui) {
                        $("#drag_"+numDragValue).css({"position" : "absolute", "left" : aInitDragLeft[numDragValue], "top" : aInitDragTop[numDragValue], "transition" : strAniSpeed});
                        var elLine = document.getElementById("line");
                        var leftValue = $( '#drag_' + numDragValue).offset().left;
                        var topValue = $( '#drag_' + numDragValue).offset().top;
                        aDragLeftLocation[numDragValue] = leftValue / elLine.offsetWidth  * 100 + "%";
                        aDragTopLocation[numDragValue] = topValue / elLine.offsetHeight * 100 + "%";
                        fnCanvas();
                    }
                });
            }
        }

        if(bolDropView == true) {
            for(j=1; j<=numDrops; j++) {
                $('#drop_' + j).droppable({
                    drop: function (event, ui) {
                        if(bolActive != false) {
                            numDropValue = this.getAttribute('id').split("_")[1];
                            aUserArr[numDragValue] = numDropValue;
							$("#drag_"+numDragValue).css( {"position" : "absolute", "left" : numDropStartInfo[numDropValue][0]+"%", "top" : aInitDropTop[numDropValue], "transition" : strAniSpeed} );
                            var elLine = document.getElementById("line");
                            var leftValue = $('#drag_' + numDragValue).offset().left;
                            var topValue = $('#drag_' + numDragValue).offset().top;
                            aDragLeftLocation[numDragValue] = leftValue / elLine.offsetWidth  * 100 + "%";
                            aDragTopLocation[numDragValue] = topValue / elLine.offsetHeight * 100 + "%";
                            fnCanvas();
							if(numRetry=="null"){
								answerCheck2();
							}else if(numRetry == 1){
								answerCheck();
							}
                        }
                    }
                });
            }
        }

		$(window).resize(function(){
			fnCanvas();
		});

	}
    
    function fnDragBox(){
        if(bolDragView == true){
            for(i=1; i<=numDrags; i++){
                var create = '<div class="draggable" id="drag_' + i + '">';
                if( bolLineView == true ) {
                    var image = '<img src = "'+_imgURL + strDragImageFileName + strExtension + '"></div></div>';
                } else {
                    var image = '<img src = "'+_imgURL + strDragImageFileName + i + strExtension + '"></div></div>';
                }
                var appendTag = create + image;
                $('.Drag').append(appendTag);
            }
            for( j=1; j<=numDrags; j++ ){
                $("#drag_"+j).css( {"position" : "absolute","left" : numDragStartInfo[j][0] + "%", "top" : numDragStartInfo[j][1] + "%"} );
                aInitDragLeft[j] = numDragStartInfo[j][0]  + "%";
                aInitDragTop[j] = numDragStartInfo[j][1] + "%";
            }
            for(k = 1; k < aDragRemove.length; k++){
                $("#drag_"+aDragRemove[k]).css({"display" : "none"});
            }
        }
    }
    
    function fnDropBox(){
        if(bolDropView == true){
            for(i=1; i<=numDrops; i++){
                var create = '<div class="droppable"id="drop_' + i + '">';   
                var image = '<img src="'+_imgURL + strDropImageFileName + strExtension + '">';
                var appendTag = create + image;
                $('.Drop').append(appendTag);
            }
            for(j=1; j<=numDrops; j++){
                $("#drop_"+j).css({"position" : "absolute","left" : numDropStartInfo[j][0] + "%", "top" : numDropStartInfo[j][1] + "%", "width":"5%","height":"8%"});
                aInitDropLeft[j] = numDropStartInfo[j][0] + "%";
                aInitDropTop[j] = numDropStartInfo[j][1] + "%";
            }
            for(k = 1; k < aDropRemove.length; k++){
                $("#drop_"+aDropRemove[k]).css({"display" : "none"});
                aResultArr[aDropRemove[k]] = false;
                aUserArr[aDropRemove[k]] = false;
            }
        }
    }
    
    function fnImage(){
        if(bolImageView == true){
            for(i=1; i<=numImages; i++){
                var create = '<div class="imageable"id="image_' + i + '">';   
                var image = '<img src="' +_imgURL+ strPictureImageFileName + strExtension + '">';
                var appendTag = create + image;
                $('.Image').append(appendTag);
            }
            for(j=1; j<=numImages; j++){
                $("#image_"+j).css({"position" : "absolute","left" : numDragStartInfo[j][0]  + "%", "top" : numDragStartInfo[j][1] + "%"});
            }
            for(k = 1; k < aImageRemove.length; k++){
                $("#image_"+aImageRemove[k]).css({"display" : "none"});
            }
        }
    }
    
    function fnCanvas(){
        if(bolLineView == true){
            if(bolDragView == true){
                var aRemoveLine = new Array();
                var elLine = document.getElementById("line");
                elLine.innerHTML = '<canvas id="myCanvas" width = "' + elLine.offsetWidth + '" height = "' + elLine.offsetHeight + '"></canvas>'
			                                    +'<canvas id="lastCanvas" width = "' + elLine.offsetWidth + '" height = "' + elLine.offsetHeight + '"></canvas>';
                var c = document.getElementById("myCanvas").getContext("2d");
                c.beginPath();              
                c.clearRect(0, 0, elLine.offsetWidth, elLine.offsetHeight);
                for(i = 1; i <= numDrags; i++) {
                    var obj = $('#drag_' + i).offset();
                    var dragWidthSize = document.getElementById("drag_" + i).offsetWidth * 0.4;
                    var dragHeightSize = document.getElementById("drag_" + i).offsetHeight * 0.4;
                    
                    var endLeft = obj.left + dragWidthSize;
                    var endTop = obj.top + dragHeightSize;
                    
                    var startLeft = $('#image_' + i).offset().left + dragWidthSize;
                    var startTop = $('#image_' + i).offset().top + dragHeightSize;
                    if(aDragRemove[i] != undefined){
                        aRemoveLine[aDragRemove[i]] = true;
                    }
                    if(aRemoveLine[i] == true){
                        startLeft = 0; startTop = 0; endLeft = 0; endTop = 0;
                    }
                    if(bolWrongPicture == true){
                        if(aResultArr[i] != aUserArr[i]){
                            fnLastCanvas(i);
                            startLeft = 0; startTop = 0; endLeft = 0; endTop = 0;
                        }
                    }
                    c.lineWidth = numLineBold;
                    c.strokeStyle = numLineColor;
                    c.moveTo(startLeft, startTop);
                    c.lineTo(endLeft, endTop);
                    c.stroke();  // Draw it
                }
            }
        }
    }
    
    function fnLastCanvas(_num){
        var elLine = document.getElementById("line");
        var c = document.getElementById("lastCanvas").getContext("2d");
        c.beginPath(); 
        var obj = $('#drag_' + _num).offset();
        var dragWidthSize = document.getElementById("drag_" + _num).offsetWidth * 0.5;
        var dragHeightSize = document.getElementById("drag_" + _num).offsetHeight * 0.5;
        var endLeft = (obj.left / elLine.offsetWidth) * elLine.offsetWidth + dragWidthSize;
        var endTop = (obj.top / elLine.offsetHeight) * elLine.offsetHeight + dragHeightSize;
        var startLeft = elLine.offsetWidth * (parseInt(aInitDragLeft[_num]) / 100) + dragWidthSize;
        var startTop = elLine.offsetHeight * (parseInt(aInitDragTop[_num]) / 100) + dragHeightSize;
        c.lineWidth = numLineBold;
        c.strokeStyle = numLastLineColor;
        c.moveTo(startLeft, startTop);
        c.lineTo(endLeft, endTop);
        c.stroke();  // Draw it
    }
    
    function answerCheck() { //정답체크--확인버튼 클릭 시
        for(b = 1; b <= 5; b++) console.log("aUserArr[" + b + "] = " + aUserArr[b])
        var numUndefinedCount = 0;
    	var numWrongCount = 0;
        for(i = 1; i < aResultArr.length; i++) {
    		if(aUserArr[i] == undefined) numUndefinedCount++;
    		else if(aUserArr[i] != aResultArr[i]) numWrongCount++;
    	}
        // 답을 모두 선택하지 않았을때
    	if(numUndefinedCount != 0) {
			if(numRetry == 1){
			}else{
				fnConfirmShow("select");
				effectCall("xSound");
			}
    	}
        // 틀린 답이 있을 때
    	else if(numWrongCount != 0) {
    		numRetry--;
    		// 재도전 기회가 남아있을때
    		if(numRetry > 0) {
    			for(j = 1; j < aResultArr.length; j++) {
    				//if(aUserArr[j] != aResultArr[j]){
    					aUserArr[j] = undefined;
                        $("#drag_"+j).css({"position" : "absolute", "left" : aInitDragLeft[j], "top" : aInitDragTop[j], "transition" : strAniSpeed});
    				//}
    			}
				effectCall("xSound");
                fnConfirmShow("retry");
                fnCanvas();
    		}
    		// 기회를 모두 소진하였을 때
    		else{
                fnConfirmShow("wrong");
                effectCall("xSound");
                for(m = 1; m < aResultArr.length; m++){
                    $("#drag_"+m).css({"position" : "absolute", "left" : aInitDropLeft[aResultArr[m]], "top" : aInitDropTop[aResultArr[m]], "transition" : strAniSpeed});
                }
                bolWrongPicture = true;
                fnCanvas();
                fnRemoveButton();
                $('.button').children('.answerButton').hide();
                $('.figure').children("img").attr('src','./img/quiz_img/X.png');
                $('.figure').show();
				nextQuizGo();
    		}
    	}
        // 정답을 맞췄을때
    	else{
           // fnConfirmShow("pass");
            effectCall("oSound");
            fnRemoveButton();
            $('.button').children('.answerButton').hide();
            $('.figure').show();
			nextQuizGo();
    	}
    }

    function answerCheck2() { //정답체크
        for(b = 1; b <= 5; b++) console.log("aUserArr[" + b + "] = " + aUserArr[b])
        var numUndefinedCount = 0;
    	var numWrongCount = 0;
        for(i = 1; i < aResultArr.length; i++) {
    		if(aUserArr[i] == undefined) numUndefinedCount++;
    		else if(aUserArr[i] != aResultArr[i]) numWrongCount++;
    	}
        // 틀린 답이 있을 때
    	if(numWrongCount != 0) {
			for(j = 1; j < aResultArr.length; j++) {
				//if(aUserArr[j] != aResultArr[j]){
					aUserArr[j] = undefined;
					$("#drag_"+j).css({"position" : "absolute", "left" : aInitDragLeft[j], "top" : aInitDragTop[j], "transition" : strAniSpeed});
				//}
				console.log("aUserArr["+j+"] : " + aUserArr[j]);
			}
			//effectCall("xSound");
			fnConfirmShow("retry");
			fnCanvas();
			if(numUndefinedCount==0){
				fnRemoveButton();
				$('.figure').show();
			}
    	}
        // 정답을 맞췄을때
    	else {
            //fnConfirmShow("pass");
            effectCall("oSound");
			if(numUndefinedCount==0){
				fnRemoveButton();
				$('.figure').show();
                fnConfirmShow("pass")
                nextQuizGo();
			}
    	}
    }



    function fnRemoveButton(){
    	for(i = 1; i <= numDrags; i++){
    		$("#drag_"+i).off();
    	}
    	for(j = 1; j <= numDrops; j++){
    		$("#drop_"+j).off();
    	}
    }
    
    function fnConfirmShow(_status){
        switch(_status) {
            case "select" : 
				//선연결유형
                $(".confirm").css({"background-image" : "url("+_imgURL+"select.png)"}).fadeIn(200).delay(700).fadeOut(200);
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
                $(".confirm").css({"background-image" : "url(./img/quiz_img/pass.png)",}).fadeIn(200).delay(700).fadeOut(200);
                break;
        }
    }
    fnCreateBox();
}