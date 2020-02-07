
	var thisURL = document.location.href.split("?")[0].split("#")[0];
	var thisURLArr = thisURL.split("/");

	var thisChasiNum = thisURLArr[thisURLArr.length-3];
	var thisPageNum = thisURLArr[thisURLArr.length-1];
	thisPageNum = thisPageNum.split(".");
	thisPageNum = thisPageNum[0];
	var thisPageName = thisPageNum;
	thisPageNum = Number(thisPageNum);

	var loadMediaURL;
	var isMediaObj;
	var mvObject;

	var isMediaObj_w;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.write(' <link rel="stylesheet" type="text/css" href="./css/reset.css" /> ');
document.write(' <link rel="stylesheet" type="text/css" href="./css/style.css" /> ');
document.write(' <link rel="stylesheet" type="text/css" href="./css/quiz.css" /> ');
document.write(' <link href="./css/font.css"  rel="stylesheet" type="text/css" charset="utf-8" />');

document.write(' <script type="text/javascript" src="./js/jquery-3.2.1.js"></script> ');
document.write(' <script type="text/javascript" src="./js/jquery-ui.min.js"></script> ');
document.write(' <script type="text/javascript" src="./js/jquery.ui.touch-punch.min.js"></script> ');
document.write(' <script type="text/javascript" src="./js/jquery.mousewheel.js"></script> ');
document.write(' <script type="text/javascript" src="./js/jquery.jscrollpane.min.js"></script> ');

document.write(' <script type="text/javascript" src="./js/page_info.js"></script> ');
document.write(' <script type="text/javascript" src="./js/utility.js"></script> ');
document.write(' <script type="text/javascript" src="./js/quiz.js"></script> ');
document.write(' <script type="text/javascript" src="./js/mov.js"></script> ');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////