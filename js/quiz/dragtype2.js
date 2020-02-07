    /******************************************************
	*   dragtype2
    *   드래그 기회 무제한 제공, copy드래그 멀티 드롭 정답
    ******************************************************/
function drag_main() {
	//var _imgURL = "./img/quiz_img/dragtype2/";

    var aInitDragLeft = new Array();             //드래그 초기 행값
    var aInitDragTop = new Array();             //드래그 초기 열값
    var aInitDropLeft = new Array();             //드롭 초기 행값
    var aInitDropTop = new Array();             //드롭 초기 열값
    var aUserArr = new Array();                    
    var aDragRemove = new Array();           //삭제할 드래그 목록
    var aDropRemove = new Array();           //삭제할 드롭 목록
    var aImageRemove = new Array();
    var aUserDragArr = new Array();            //해당 드래그의 드롭 횟수
    var bolActive;                                            //드래그 이동 제어
    var numDropValue;                                  //최근에 드롭한 드래그박스의 번호
    var numDragValue;                                  //최근에 드래그한 드롭박스의 번호
    var bolWrongPicture = false;
    /******************************************************
    *   제어 변수
    ******************************************************/
    var bolDragView = true;         //드래그
    var bolDropView = true;        //드롭
    var bolImageView = true;       //이미지
    var strAniSpeed = "0s";                                            //애니메이션 속도
    var strExtension = ".png";                                          //확장자명


    function fnCreateBox() {
        var tags =  '<div class = "confirm"></div>'
						   +'<div id = "line"><canvas id="myCanvas"></canvas><canvas id="lastCanvas"></canvas></div><div class = "Image"></div><div class = "Drop"></div><div class = "pointer"><div class = "Drag"></div></div>'
						   +'<div class = "pointer"><div class = "button"><div class = "answerButton"><img src = "./img/quiz_img/answer.png"></div><div class = "nextButton"><img src = "./img/quiz_img/next.png"></div></div></div>'
						   +'<div class = "figure"><img src = "./img/quiz_img/O.png"></div>'
        $('.linespot').append(tags);
		$('.button').children('.answerButton').hide();
        $('.button').children('.nextButton').hide();
        $('.figure').hide();
        fnDragBox();
        fnDropBox();
        fnImage();
        fnHoverEvent();

        if(bolDragView == true){
            for(i=1; i<=numDrags; i++){
                $( '#drag_' + i).draggable({
                    start: function() {                           //드래그를 시작했을때
                        $(this).css({"position" : "absolute", "transition" : strAniSpeed, "opacity" : "1"});
                        bolActive = true;
                        numDragValue = this.getAttribute('id').split("_")[1];
						$("#image_"+numDragValue).css({"opacity":"0.25"});
                    },
                    stack:".draggable", //높이
                    scroll: false   //스크롤
                });
                $('#drag_' + i).droppable({ //드롭
					//드래그 박스에 드롭했을 때 제자리로
                    drop: function (event, ui) {
               //         bolActive = false;
                        $("#drag_" + numDragValue).css({ "position" : "absolute", "left" : aInitDragLeft[numDragValue],  "top" : aInitDragTop[numDragValue],   "transition" : strAniSpeed,   "opacity" : "0" });
						$("#image_" + numDragValue).css({ "opacity" : "1" });
                    }
                });
                $('.linespot').droppable({
					//드롭,드래그 외 다른 영역에 드롭 했을 때 제자리로
                    drop: function (event, ui) {
						$("#drag_"+numDragValue).css({ "position" : "absolute", "left" : aInitDragLeft[numDragValue], "top" : aInitDragTop[numDragValue], "transition" : strAniSpeed,   "opacity" : "0" });
						$("#image_"+numDragValue).css({ "opacity" : "1" });
                    }
                });
            }
        }

        if(bolDropView == true) {
            for(j=1; j<=numDrops; j++) {
                $('#drop_' + j).droppable({
					//드롭 박스에 드롭했을 때
                    drop: function (event, ui) {
                        if(bolActive != false) {
                            numDropValue = this.getAttribute('id').split("_")[1];
							if(!aUserArr[numDropValue]){
								if( numDragValue == aResultArr[numDropValue] ) {
									//정답일 때
									aUserArr[numDropValue] = true;   //이 드롭에 드래그 이씀
									aUserDragArr[numDragValue] += 1;
									console.log (
										"-----------------   drag "+numDragValue+" :::정답::: Event   ---------------\n"+ "       numDragValue : " + numDragValue +"  ||  aUserDragArr[" + numDragValue +"] : " + aUserDragArr[numDragValue] 
									);
									$("#drop_"+numDropValue).children('img').attr( "src", _imgURL + strDragImageFileName +numDragValue+strExtension );
									$("#drop_"+numDropValue).css({ "pointer-events":"none" });
									if(aUserDragArr[numDragValue] == numDragDropth[numDragValue]) {
										console.log( "            drag_"+numDragValue+" : 모든 드롭에 갖다 놓음" );
										$("#drag_"+numDragValue).css( {"display":"none"} );
										$("#image_"+numDragValue).css( {"display":"none"} );
									}
									//effectCall("oSound");
									console.log (
										"-------------------------------------------------------------"
									);
								} else {
									console.log (
										"-----------------   drag "+numDragValue+" :::오답::: Event   ---------------\n"+ "                해당 드롭의 정답은 : " + aResultArr[numDropValue] + "번 드래그"
										+"\n-------------------------------------------------------------"
									);
									//정답이 아닐 때
									$("#drag_"+numDragValue).css({ "position" : "absolute", "left" : aInitDragLeft[numDragValue], "top" : aInitDragTop[numDragValue], "transition" : strAniSpeed,   "opacity" : "0" });
								   //effectCall("xSound");
								}
							}
							 answerCheck();
                        } //end if(bolActive != false)
                    } //end drop: function (event, ui)
                }); //end $('#drop_' + j).droppable
            } //end for
        } //end  if(bolDropView == true)

	} //fnCreateBox() end.
    
    function fnDragBox(){
		if(bolDragView == true){
            for(i=1; i<=numDrags; i++){
                var create = '<div class="draggable" id="drag_' + i + '">';
                var image = '<img src = "'+_imgURL + strDragImageFileName + i + strExtension + '"></div></div>';
                var appendTag = create + image;
                $('.Drag').append(appendTag);
            }
            for( j=1; j<=numDrags; j++ ){
				aUserDragArr[j] = 0;
                $("#drag_"+j).css( {"position" : "absolute","left" : numDragStartInfo[j][0] + "px", "top" : numDragStartInfo[j][1] + "px" , "opacity":"0"} );
                aInitDragLeft[j] = numDragStartInfo[j][0]  + "px";
                aInitDragTop[j] = numDragStartInfo[j][1] + "px";
            }
            for(k = 1; k < aDragRemove.length; k++){
                $("#drag_"+aDragRemove[k]).css({"display" : "none"});
            }
        }
    } //end fnDragBox()
    
    function fnDropBox(){
        if(bolDropView == true){
            for(i=1; i<=numDrops; i++){
                var create = '<div class="droppable"id="drop_' + i + '">';   
                var image = '<img src="'+_imgURL + strDropImageFileName + i + strExtension + '">';
                var appendTag = create + image;
                $('.Drop').append(appendTag);
            }
            for(j=1; j<=numDrops; j++){
                $("#drop_"+j).css({"position" : "absolute","left" : numDropStartInfo[j][0] + "px", "top" : numDropStartInfo[j][1] + "px", "width":numDropStartInfo[j][2] +"px","height":numDropStartInfo[j][3] +"px",  "pointer-events":"none"});
                aInitDropLeft[j] = numDropStartInfo[j][0] + "px";
                aInitDropTop[j] = numDropStartInfo[j][1] + "px";
				aUserArr[j] = false;
            }
            for(k = 1; k < aDropRemove.length; k++){
                $("#drop_"+aDropRemove[k]).css({"display" : "none"});
                aResultArr[aDropRemove[k]] = false;
                aUserArr[aDropRemove[k]] = false;
            }
        }
    } //end fnDropBox();
    
    function fnImage(){
		if(bolImageView == true){
            for(i=1; i<=numImages; i++){
				var create = '<div class="imageable"id="image_' + i + '">';   
                var image = '<img src="'+_imgURL + strPictureImageFileName +i+ strExtension + '">';
                var appendTag = create + image;
                $('.Image').append(appendTag);
            }
            for(j=1; j<=numImages; j++){
                $("#image_"+j).css({"position" : "absolute","left" : numIMGStartInfo[j][0]  + "px", "top" : numIMGStartInfo[j][1] + "px",    "pointer-events":"none"});
            }
            for(k = 1; k < aImageRemove.length; k++){
                $("#image_"+aImageRemove[k]).css({"display" : "none"});
            }
        }
    }
       
    function answerCheck(){ //정답체크
		//for(b = 1; b <= aUserArr.length-1; b++) console.log("aUserArr[" + b + "] = " + aUserArr[b])
        var numUndefinedCount = 0;
    	var numWrongCount = 0;
        for(i = 1; i < aResultArr.length; i++) {
	   		if(!aUserArr[i]) numUndefinedCount++;
    	}
		console.log( "-----------------        남은 드롭 개수        ---------------\n"+"                     numUndefinedCount : " + numUndefinedCount + "\n-------------------------------------------------------------");
        //풀이 완료 시
    	if(numUndefinedCount == 0) {
    		fnConfirmShow("pass");
	        nextQuizGo();
			effectCall("oSound");
			$('.figure').show();
            $(".draggable").css("pointer-events","none");
    	}
    } //answerCheck() end.
    
    
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
				//드래그연결유형
                $(".confirm").css({"background-image" : "url("+_imgURL +"select.png)"}).fadeIn(200).delay(700).fadeOut(200);
                break;
            case "retry" : 
				//퀴즈공통
                $(".confirm").css({"background-image" : "url(./img/quiz_img/retry.png)"}).fadeIn(200).delay(700).fadeOut(200);
                break;    
            case "wrong" : 
				//퀴즈공통
                $(".confirm").css({"background-image" : "url(./img/quiz_img/wrong.png)",}).fadeIn(200).delay(700).fadeOut(200);
                effectCall("xSound");
            $(".draggable").css("pointer-events","none");
                break;
            case "pass" : 
				//퀴즈공통
                //$(".confirm").css({"background-image" : "url(./img/quiz_img/pass.png)",}).fadeIn(200).delay(700).fadeOut(200);
                effectCall("oSound");
            $(".draggable").css("pointer-events","none");
                break;
        }
    }
    fnCreateBox();
} //end drag_main()