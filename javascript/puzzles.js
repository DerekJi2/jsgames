var g_lenX = 640;
var g_lenY = 480;
var g_pieceWidth = 128;
var g_pieceHeight = 120;

function disorderImage()
{
	g_pieceWidth = g_lenX / g_piecesX;
	g_pieceHeight = g_lenY / g_piecesY;

	debugInfo("[disorderImage] g_piecesX = " + g_piecesX + " g_piecesY = " + g_piecesY);
	debugInfo("[disorderImage] g_pieceWidth = " + g_pieceWidth + " g_pieceHeight = " + g_pieceHeight);

	var T = new Array();

	for (var y = 0; y < g_piecesY; y++ )
	{
		for (var x = 0; x < g_piecesX; x++ )
		{
			var top = y * g_pieceHeight;
			var left = x * g_pieceWidth;
			var bpTop, bpLeft;
			var pos;

			do
			{
				bpTop = Math.floor( g_piecesY * Math.random() ) * g_pieceHeight;
				bpLeft = Math.floor( g_piecesX * Math.random() ) * g_pieceWidth;
				pos = bpTop + "_" + bpLeft;
			}
			while (isExistedIn(pos,T) == false);

			T.push(pos);
			IMAGE_PX[y][x] = (-1) * bpLeft;
			IMAGE_PY[y][x] = (-1) * bpTop;
		}
	}

}

function loadImage()
{
	disorderImage();

	reloadImage();

}

function reloadImage()
{
	var finalString = "";
	
	debugInfo("[reloadImage] g_piecesX = " + g_piecesX + " g_piecesY = " + g_piecesY);
	debugInfo("[reloadImage] g_pieceWidth = " + g_pieceWidth + " g_pieceHeight = " + g_pieceHeight);

	for (var y = 0; y < g_piecesY; y++ )
	{
		for (var x = 0; x < g_piecesX; x++ )
		{
			var top = y * g_pieceHeight;
			var left = x * g_pieceWidth;

			var str = "<div style=\"" +
				"top:_TOP_px;" +
				"left:_LEFT_px;" +
				"width:_WIDTH_px;" +
				"height:_HEIGHT_px;" +
				"background:url(_BACKGROUND_) no-repeat;" +
				"background-position:_BPX_px _BPY_px;" +
				"\" " + 
				"onmousedown='onMouseDown(_TOP_,_LEFT_,this);' " +
				"onmouseup='onMouseUp(_TOP_,_LEFT_,this);' " +
				"onmousemove='onMouseMove(_TOP_,_LEFT_,this);' " +
				">" +
			"</div>";
			str = str.replace(/_TOP_/g,  top );
			str = str.replace(/_LEFT_/g, left );
			str = str.replace(/_WIDTH_/g, g_pieceWidth );
			str = str.replace(/_HEIGHT_/g, g_pieceHeight );
			str = str.replace(/_BACKGROUND_/g, IMGNAME);
			str = str.replace(/_BPX_/g, IMAGE_PX[y][x] );
			str = str.replace(/_BPY_/g, IMAGE_PY[y][x]);
			finalString += str;
		}
	}

	
	var obj = document.getElementById("stageBody");
	obj.innerHTML = finalString;
	
	//debugText(finalString);
}

function onMouseDown(top, left, obj)
{
	//debugInfo("Mose Down (top = " + top + ", left = " + left + ")");
	obj.style.zIndex = 999;
	CELL[top/g_pieceHeight][left/g_pieceWidth] = 1;
}


function onMouseUp(top, left, obj)
{
	debugInfo("Mose Up (top = " + top + ", left = " + left + ")");
	obj.style.zIndex = 11;
	for (var i = 0; i < g_piecesY; i++)
		for (var j = 0; j < g_piecesX; j++)
			CELL[i][j] = 0;
		
	var targetP = {x:0, y:0};	// 对换图片的位置

	// 鼠标的相对位置
	var posx = window.event.clientX - getAbsolutePos(stageBody).x;
	var posy = window.event.clientY - getAbsolutePos(stageBody).y;

	targetP.x = Math.floor(posx/g_pieceWidth);
	targetP.y = Math.floor(posy/g_pieceHeight);

	// 对换数据
	var curX = Math.floor(left/g_pieceWidth);
	var	curY = Math.floor(top/g_pieceHeight);
	var curPX =	IMAGE_PX[curY][curX];
	var	curPY = IMAGE_PY[curY][curX];

	debugInfo("target (" + targetP.x + ", " + targetP.y + ") = " + IMAGE_PX[targetP.y][targetP.x] + "px " + IMAGE_PX[targetP.y][targetP.x] + "px" );

	debugInfo("current(" + curX + ", " + curY + ") = " + IMAGE_PX[curY][curX] + "px " + IMAGE_PY[curY][curX] + "px");

	IMAGE_PX[curY][curX] = IMAGE_PX[targetP.y][targetP.x];
	IMAGE_PX[targetP.y][targetP.x] = curPX;

	IMAGE_PY[curY][curX] = IMAGE_PY[targetP.y][targetP.x];
	IMAGE_PY[targetP.y][targetP.x] =  curPY;

	reloadImage();

	// 计算行走步数
	if (targetP.x != curX || targetP.y != curY)
	{
		steps.innerText = parseInt(steps.innerText) + 1;
	}

	if ( g_TimerID < 0 )
	{
		g_TimerID = setInterval( function() {
			seconds.innerText = parseInt(seconds.innerText) + 1;
		}, 1000);
	}

	
	if (isSortedImage() == true)
	{
		alert("Congratulations! You've passed!");
		passAndStop();
	}
}

function passAndStop()
{
	// 停止计时
	if (g_TimerID > -1)
	{
		clearInterval(g_TimerID);
		g_TimerID = -1;
	}
}

function onMouseMove(top, left, obj)
{
	if (CELL[top/g_pieceHeight][left/g_pieceWidth] == 0)		return;

	var posx = window.event.clientX - getAbsolutePos(stageBody).x - g_pieceWidth/2;
	var posy = window.event.clientY - getAbsolutePos(stageBody).y - g_pieceHeight/2;

	if (posx + g_pieceWidth > 642) posx = 642 - g_pieceWidth;		// 642 = 640 + 2
	if (posx < 2) posx = 2;
	if (posy + g_pieceHeight > 482) posy = 482 - g_pieceHeight;		// 482 = 480 + 2
	if (posy < 2) posy = 2;

	obj.style.position = "absolute";
	obj.style.top = posy  + "px";
	obj.style.left = posx + "px";
	obj.style.zIndex = 999;

	//debugInfo("(" + posx + ", " + posy + ")");

}

function isSortedImage()
{
	var bSorted = false;

	debugInfo("**********************************************************");
	for (var y = 0; y < g_piecesY; y++)
	{
		for (var x = 0; x < g_piecesX ; x++ )
		{
			if (IMAGE_PY[y][x] != (-1) * y * g_pieceHeight || IMAGE_PX[y][x] != (-1) * x * g_pieceWidth)
			{
				return false;
			}
		}
	}
	return true;
}

function getAbsolutePos(obj) {
	var curObj = obj;
	var baseTop = 0;
	var baseLeft = 0;
	var point = {x:0,y:0};

	while (curObj.tagName != "BODY") 
	{
		baseTop += curObj.offsetTop;
		baseLeft += curObj.offsetLeft;

		curObj = curObj.offsetParent;
	} 
	point.y = baseTop;
	point.x = baseLeft;
		
	return point;
}

function isExistedIn(e, A)
{
	for (var i = 0; i < A.length; i++)
	{
		if (e == A[i])
		{
			return false;
		}
	}
	return true;

}

function initGlobals()
{

	CELL = new Array(g_piecesY);
	IMAGE_PX = new Array(g_piecesY);
	IMAGE_PY = new Array(g_piecesY);
	
	for (var y = 0; y < g_piecesY; y++ )
	{
		CELL[y] = new Array(g_piecesX);
		IMAGE_PX[y] = new Array(g_piecesX);
		IMAGE_PY[y] = new Array(g_piecesX);
		
		for (var x = 0; x < g_piecesX; x++ )
		{

			CELL[y][x] = 0;
			IMAGE_PX[y][x] = 0;
			IMAGE_PY[y][x] = 0;
		}
	}
	
}

var _DEBUG_ = 0;

var CELL = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];

var IMAGE_PX = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];

var IMAGE_PY = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];

var LEVELS_STR = [
	"2 x 2",
	"4 x 3",
	"4 x 4",
	"5 x 4",
	"5 x 5",
	"5 x 6",
	"8 x 6"
]

var g_piecesX = 5;
var g_piecesY = 4;

var g_TimerID = -1;

var IMGNAME = "images/xiyangyang06.jpg";

/**********************************************************
	图片选择
*/
function initImgSelect()
{
	var numOfImg = 8;
	for (var i = 0; i < numOfImg ; i++ )
	{
		var imgId = i + 1;
		imgSelect.options.add(new Option("Xi Yangyang "+imgId, "images/xiyangyang0"+imgId+".jpg"));
	}
	for (var i = 0; i < 5 ; i++ )
	{
		var imgId = i + 1;
		imgSelect.options.add(new Option("Mei Yangyang "+imgId, "images/meiyangyang0"+imgId+".jpg"));
	}
	imgSelect.options[0].selected = true;
	IMGNAME = "images/xiyangyang01.jpg";

	imgSelect.onchange = setImage;
}

function setImage()
{
	IMGNAME = imgSelect.value;
	
	// 重置游戏数据
	steps.innerText = 0;
	seconds.innerText = 0;

	// 重新载入图片
	disorderImage();
	reloadImage();

	// 重新设置预览图片
	showPreviewImage();
}

/**********************************************************
	图片预览
*/
function initShowPrev()
{
	showPrev.checked = false;
	prev.style.display = "none";
	prev.style.width = "96px";
	prev.style.height = "72px";

	showPrev.onclick = showPreviewImage;
}

function showPreviewImage()
{
	if (showPrev.checked == true)
	{
		prev.src = IMGNAME;
		prev.style.display = "block";
	}
	else
	{
		prev.style.display = "none";
	}
}

/**********************************************************
	难度选择
*/
function initLevelSelect()
{
	for (var i = 0; i < LEVELS_STR.length ; i++ )
	{
		levelSelect.options.add(new Option(LEVELS_STR[i], LEVELS_STR[i]));
		if (LEVELS_STR[i] == "5 x 4")
		{
			levelSelect.options[i].selected = true;
		}
	}

	levelSelect.onchange = setLevel;
}

function setLevel()
{
	var val = levelSelect.value.split(" x ");

	g_piecesX = val[0];
	g_piecesY = val[1];

	initGlobals();

	// 重置游戏数据
	steps.innerText = 0;
	seconds.innerText = 0;

	// 重新载入图片
	disorderImage();
	reloadImage();

	// 重新设置预览图片
	showPreviewImage();

	debugInfo("g_piecesX = " + g_piecesX + " g_piecesY = " + g_piecesY);
	debugInfo("g_pieceWidth = " + g_pieceWidth + " g_pieceHeight = " + g_pieceHeight);
}

function init()
{
	showDebugFrm();
	initGlobals();

	initImgSelect();
	initShowPrev();

	initLevelSelect();
	setLevel();
	
	// 重置游戏数据
	steps.innerText = 0;
	seconds.innerText = 0;

	loadImage();
}

window.onload = init;
