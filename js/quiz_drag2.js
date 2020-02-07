var thisURL = document.location.href.split("?")[0].split("#")[0];
var thisURLArr = thisURL.split("/");

var thisChasiNum = thisURLArr[thisURLArr.length-2];
thisChasiNum = Number(thisChasiNum);
var thisPageNum = thisURLArr[thisURLArr.length-1];
var thisPageName = thisPageNum.split(".")[0];
thisPageNum = thisPageNum.split(".")[0].substr(-1);

var _rootIMG = "img/drag2/"
var quizBgURL = _rootIMG +"quiz_"+Number(thisPageNum)+"bg.png";
	var dapMaxNum; //정답개수
	var mychk = new Array(); //내가 선택한값 저장되는 곳
	var myChkCount = 0; //내가 맞춘 정답의 개수
  	var isDrop; //현재 drop
	var isDrag; //현재 drag
	var isTrueDrop;

	var total = 0;  
	var chance = 1;
	var count = 0;

	var dropimgMax;

var loadMediaURL

    $(document).ready(function(){
	mvObject = $("#myAudio");
	isMediaObj= $("#myAudio")[0];
	loadMediaURL = "../mov/"+ itostr(thisChasiNum)+"/"+thisPageName+"_intro.mp3"
	console.log("loadMediaURL : " + loadMediaURL);
	mvObject.attr("src",loadMediaURL);


	dapMaxNum = $(".box_drop").length;
	var dragMax = $(".bogi").length;
	dropimgMax =$(".quizBg div").length;
	
	/*if(dropimgMax >2)
		{
			for (i=1; i<=dropimgMax; i++)	{
			   $("#box_"+i).css({
					"width":"121px",	"height":"65px",
					"background":"url("+_rootIMG+"drop"+ i+".png) no-repeat",
					"position":"absolute",
					"top":"476px",	"left": Number(190*(i-1))+"px"
				})
			}
		}else {
			for (i=1; i<=dropimgMax; i++)	{
			   $("#box_"+i).css({
					"width":"121px",	"height":"65px",
					"background":"url("+_rootIMG+"drop"+ i+".png) no-repeat",
					"position":"absolute",
					"top":"476px",	"left": Number(190+447*(i-1))+"px"
				})
			}
		}
    */


	for (i=1; i<=dragMax;i++ )
	{
		$("#bo_"+i).css({
			"width":"121px",	"height":"65px",
			"background":"url("+_rootIMG+"drag"+ i+".png) no-repeat center center"
		})
	}

	$(".bogi").draggable({
		cursor:"move",
		//helper:"clone",
		stack:"draggable",
		containment:"#quizbox",
		revert:"invalid" // 드래구 후 원위치 복귀
	});

	$(".bogi").on("dragstart",function(event,ui){
		var num =this.id.split("_")[1];
		$(this).addClass("invert");
		isDrag = num;
	});

	$('.box_drop').droppable({
		revert:false,
		drop:function(){
			var thisDropid = this.id.split("_")[1];
			isDrop = thisDropid;
			var isDragTrue = submitDrag(isDrop,isDrag);
			if(isDragTrue) myChkCount ++;
			total = $(".bogi.invert").length;
			//console.log("total : " + total+"\n" + "dapMaxNum : " + dapMaxNum);
			if(total >= dapMaxNum){
				$(".bogi").draggable({ revert: true });
				chkGo();
			} else {
				$(".bogi").draggable({ revert: false });
			}
		}
	});
})

function submitDrag(drop,drag)
{
	console.log("::::::::::::::::::::::::::::::::"+"\n"+"submitDrag()" + "\n" + "drop : " + drop + "\n" + "drag : "+ drag + "\n"+"::::::::::::::::::::::::::::::::");
	//드래그번호와 드롭번호 비교 하여 정답일 경우 true
	var isTrue;
	mychk[drop] = drag;
	if(mychk[drop] == quizDap[drop])
	{
		isTrue = true;
	}else
	{
		isTrue = false;
	}
	return isTrue;
}

function chkGo()
{
	$(".bogi").removeClass('invert');
	$(".bogi").css ({
		"left":"", "top":""
		})
    $("body").css("cursor","defalut");
	if(myChkCount == dapMaxNum){
		console.log("정답");
		$(".chkOX").css ({
			"display":"block",
			"background":"url(img/quiz_img/pass.png) no-repeat",
			"background-size":"cover",
			"left":"0px","top":"0px"
		})
        setTimeout(function(){
             $(".chkOX").css("display","none")
        },1000);
		quizEnd();
        nextQuizGo();
	}else
	{
		if(chance==1)
		{
			console.log("다시한번생각해보세요.");
            $(".chkOX").css ({
                "display":"block",
                "background":"url(img/quiz_img/wrong.png) no-repeat",
                "background-size":"cover",
                "left":"0px","top":"0px"
            })
            setTimeout(function(){
                 $(".chkOX").css("display","none")
            },1000);
			chance--;
			myChkCount = 0;
			total=0;
		}else
		{
			console.log("틀렸습니다.");
		$(".chkOX").css ({
			"display":"block",
			"background":"url(img/quiz_img/wrong.png) no-repeat",
			"background-size":"cover",
			"left":"0px","top":"0px"
		})
            setTimeout(function(){
                 $(".chkOX").css("display","none")
            },1000);
            quizEnd();
            nextQuizGo();
		}
	}
}

function quizEnd()
{
	for (i=1; i<=dropimgMax; i++){
	   $("#box_"+i).css({
			"background":"url("+_rootIMG+"drop"+i+"_correct.png) no-repeat top/cover",
		})
	}
    
    $(".bogi").css("pointer-events","none");
    $(".nextButton").show();
    $(".nextButton").click(function(){
        parent.quizSceneNum ++;
		parent.pageQuizSet();
    });
}


function itostr(n){
	n = Number(n);
	if(n<10){
		return "0"+n;
	}else{
		return ""+n;
	}
}