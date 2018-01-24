//各种形状的四种状态（如果只有两种，则后两种为重复）
var shapes = [
	[0xf000, 0x4444, 0xf000, 0x4444],	// Bar: (H, V, H, V)
	[0x6c00, 0x4620, 0x6c00, 0x4620],   // Z: (H, V, H, V)
	[0xc600, 0x2640, 0xc600, 0x2640],   // S: (H, V, H, V)
	[0xe400, 0x8c80, 0x4e00, 0x4c40],   // T: (donw, left, up, right)
	[0xe800, 0x88c0, 0x2e00, 0xc440],   // L: (90, 180, 270, 0) -- clockwise rotation 
	[0x8e00, 0x44c0, 0xe200, 0xc880],   // J: (90, 180, 270, 0) -- clockwise rotation 
	[0x6600, 0x6600, 0x6600, 0x6600]    // □ 
];

var CELL = [
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//0
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//1
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//2
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//3
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//4
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//5
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//6
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//7
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//8
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//9
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//10
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//11
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//12
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//13
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//14
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//15
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//16
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//17
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],	//18
	[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]		//19
];

function E(id) {	return document.getElementById(id);  }

function showSamples() {
	var gridObj = E("grid");

	var X = [2*28, 6*28, 2*28, 6*28, 2*28, 6*28, 2*28];
	var Y = [2*28, 2*28, 7*28, 7*28, 11*28, 11*28, 14*28];
	var ANGLE = [1, 0, 1, 2, 1, 0, 0];
	var TYPE = [1, 0, 3, 2, 4, 5, 6];

	var drawStr = "";

	var testOpt = 1;
	if (testOpt == 1)
	{
		var shape = new ShapeClass();
		for (var i = 0; i < 7; i++)
		{
			var setShapeStr = "i:" + ICONID + "_" +
				"c:" + i + "_" +
				"ul:" + X[i] + "_" +
				"ut:" + Y[i] + "_" +
				"t:" + TYPE[i] + "_" +
				"a:" + ANGLE[i];
			shape.sets(setShapeStr);
			drawStr += shape.getDrawString();
		}
	}

	gridObj.innerHTML = drawStr;
}

function showNext()
{
	var viewNextFrm = new ViewNextFrameClass("nextBlock");
	viewNextFrm.draw();
}

	function deleteLine(lineNo) {
		if (lineNo > 19 || lineNo < 0) return;

		for (var i = lineNo; i > 0 ; i--)
		{
			for (var j = 0; j < 10 ; j++)
			{
				CELL[i][j] = CELL[i-1][j];
			}
		}
		CELL[0] = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	
	}

	function redrawGridByCell() {
		var gridObj = g_game.objGridFrm;
		var redrawStr = "";

		for (var i = 0; i < 20; i++)
		{
			for (var j = 0; j < 10; j++ )
			{
				if (CELL[i][j] < 0)	continue;	// 这里没有块

				var color = CELL[i][j];
				var top = i * 28;
				var left = j * 28;
				var width = 28;
				var icon = ICONID;
				
				var blkSetstring = "t:" + top + "_" +
									"l:" + left + "_" +
									"c:" + color + "_" +
									"w:" + width + "_" +
									"i:" + icon;
				var block = new BlockClass(blkSetstring);
				redrawStr += block.getDrawString();
			}
		}

		debugText(redrawStr);
		gridObj.innerHTML = redrawStr;
	}

	function deleteOccupiedLines() {
		var bRedraw = false;
		
		/**/
		var i = 19;
		var N = 0;
		while (i > 0)
		{
			var str = CELL[i].toString();
			if ( str.indexOf("-1") < 0 )	// 找不到-1，说明整行都已被填满
			{
				debugInfo("Deleting line " + i + ": " + str);
				bRedraw = true;
				N++;						// 记录满行的数目
				deleteLine(i);	// 重置整个CELL数组
				
				continue; // 直接下一次循环，不改变i值
			}
			i--;
		}
		
		if ( N > 0) 
		{
			g_game.score += (100 +( N-1)* 50) * N;
		}
		
	  /*
		var delLine = new Array();
		var id = 0;
		for (var i = 19; i > -1; i-- )
		{
			var str = CELL[i].toString();
			// debugInfo("Checking line " + i + ": " + str);
			if ( str.indexOf("-1") < 0 )	// 找不到-1，说明整行都已被填满
			{
				debugInfo("Checking line " + i + " is full : " + str);
				bRedraw = true;
				g_game.score += 100;
				delLine[id++] = i;
			}
		}		
		
		
		debugInfo("*****  " + delLine.length + " lines should be removed!");
		for (var i = 0; i < delLine.length; i++)
		{
			var lineNo = delLine[i];
			var str = CELL[lineNo].toString();
			debugInfo("Deleting line " + lineNo + " is full : " + str);
			deleteLine(lineNo);
		}
		*/

		if (bRedraw == true)
		{
			// 重画底层图片
			redrawGridByCell();

			// 更新积分
			var pScoreObj = E("score");
			pScoreObj.innerText = g_game.score;
		}
		
	}

	function isGameOver() {
		var bOver = false;
		var isEmptyLines = new Array(20);
		for (var i = 0; i < 19; i++)
		{
			isEmptyLines[i] = 1;
			for (var j = 0; j < 10; j++ )
			{
				if (CELL[i][j] > -1)	// 如果当前行存在方块，则该行非空（置0）
				{
					isEmptyLines[i] = 0;
					break;
				}
			}
		}

		if (isEmptyLines.toString().indexOf("1") < 0)
		{
			bOver = true;
		}

		return bOver;
	}

	function occupyCells() {
		for (var i = 0; i < 4; i++ )
		{
			CurrentShape.blocks[i].occupyCell();
		}
	}

	function moveDown() {

		// 如果还没落地，继续落
		if ( CurrentShape.moveDownAllowed() == true )
		{
			CurrentShape.moveDown();
			return;
		}
	
		// 已经落地
		// 1.1 在背景图grid中画出当前shape
		var gridObj = g_game.objGridFrm;
		var str = CurrentShape.getDrawString();
		gridObj.innerHTML += str;	

		// 1.2. 清除动画台中的图形
		var stageObj = g_game.objStageFrm;
		stageObj.innerHTML = "";
	
		// 2.1 将当前shape占用的cell设为其颜色值
		occupyCells();
		deleteOccupiedLines();

		// 2.2 游戏结束的判断
		if (isGameOver() == true)
		{
			stop();
			E("startBtn").value = "开始";
			setTimeout(showGameOver, 500);

			return;
		}

		// 3. 根据nextBlock指定的数据设定新的shape
		CurrentShape.sets(g_nextShapeParams);
		CurrentShape.sets("ut:0_ul:" + 28*3);

		// 4、在预览图中生成并显示下一个shape
		var objNextFrm = new ViewNextFrameClass("nextBlock");
		//objNextFrm = g_game.objNextFrm;
		objNextFrm.randomNext();
		objNextFrm.draw();
		
	}

	function handleKey(evt) {
		var event = evt || window.event;
		
		var evtObjElem = event.target || event.srcElement;
		if (evtObjElem.tagName=="INPUT" || evtObjElem.tagName=="SELECT") return;

		var keyCode = event.charCode || event.keyCode;

		switch (keyCode)
		{
			case 37:	// LeftKey
				moveLeft();
				break;
			case 39:	// RightKey
				moveRight();
				break;
			case 38:	// UpKey
				rotateShape();
				break;
			case 40:	// DownKey
				moveDownQuickly();
				break;
			default:
				break;    			
		}
	}

	function moveLeft()
	{
		if (g_gameStatus != STATUS_RUNNING) return;

		if (CurrentShape.moveLeftAllowed() == false) 
		{
			return;
		}

		CurrentShape.moveLeft();
	}

	function moveRight()
	{
		if (g_gameStatus != STATUS_RUNNING) return;

		if (CurrentShape.moveRightAllowed() == false) 
		{
			return;
		}

		CurrentShape.moveRight();
	}

	function rotateShape()
	{
		if (g_gameStatus != STATUS_RUNNING) return;

		if (CurrentShape.rotateAllowed() == false) 
		{
			return;
		}

		CurrentShape.rotate();
	}

	function moveDownQuickly()
	{
		if (g_gameStatus != STATUS_RUNNING) return;

		if ( CurrentShape.moveDownAllowed() == true )
		{
			CurrentShape.moveDown();
		}
	}


	function clickCtlButton()
	{
		switch (g_gameStatus)
		{
			case STATUS_NOT_START:	// not started
				E("startBtn").innerText = "Pause";
				begin();
				break;

			case STATUS_RUNNING:	// running
				E("startBtn").innerText = "Cont.";
				pause();
				break;

			case STATUS_PAUSED:	// started but paused
				E("startBtn").innerText = "Pause";
				keepGoing();
				break;

			default:
				break;
		
		}

	}
	
	function begin() {
		g_game = new GameClass();
		g_game.newGame();

		if (CurrentShape == null)
		{
			CurrentShape = new ShapeClass(g_nextShapeParams);
		}
		CurrentShape.sets("ut:0_ul:" + 28*3);

		var objNextFrm = new ViewNextFrameClass("nextBlock");
		//objNextFrm = g_game.objNextFrm;
		objNextFrm.randomNext();
		objNextFrm.draw();

		g_gameStatus = STATUS_RUNNING;
		
		g_gameID = window.setInterval(moveDown, g_timeInterval);
	}

	function pause()
	{
		clearInterval(g_gameID);
		g_gameStatus = STATUS_PAUSED;
	}


	function stop()
	{
		g_gameStatus = STATUS_NOT_START;
		clearInterval(g_gameID);
	}

	function keepGoing()
	{
		g_gameStatus = STATUS_RUNNING;
		g_gameID = window.setInterval(moveDown, g_timeInterval);
	}

	function showGameOver()
	{
		var objFrm = E("gameover");
		var imgGameOverStr = "<img src='images/gameover.png' " +
			"style=\"" +
			"position:absolute;" + 
			"top:150px; left:40px;\">" +
			"</img>";

		//debugText(imgGameOverStr);
		objFrm.innerHTML += imgGameOverStr;
		//debugText(objFrm.innerHTML);
	}
	
	

function changeTab(x)
{
	var count = E("tab-nav").getElementsByTagName("span").length;
	for (var i = 1; i <= count; i++)
	{
		// 处理tab-menu
		var tmId = "tm" + i;
		var tcId = "tc" + i;
		if (x == i)	{
			E(tmId).className = "tab-menu selected";
			E(tcId).className = "tab-content show";
		}
		else {
			E(tmId).className = "tab-menu unselected";
			E(tcId).className = "tab-content hide";
		}
	}
}

	var ICONID = 0;
	var BOTTOM_Y = 560;
	var CurrentShape;
	
	var STATUS_NOT_START = 0;
	var STATUS_RUNNING = 1;
	var STATUS_PAUSED = 2;

	var g_nextShapeParams = "c:0_i:0_t:0_a:0_bw:0_ut:0_ul:0";
	var g_gameID;
	var g_game;
	var g_gameStatus = STATUS_NOT_START; // 0: Not Statrted;  1: Running: 2: Started but paused
	var	g_timeInterval = 200;
	var g_defaultImgId = 10; // bg11.jpg

	var g_bgImages = (("01,02,03,04,05,06,07,08,09,10,11").replace(/(\d\d)/g,"images/bg$1.jpg")).split(",");
	var g_blockIcons = ["Blocks 1","Vegetables","Blocks 2","Blocks 3","Office Blocks"];
	var g_speedLevels = [500, 450, 400, 350, 300, 250, 200, 150, 100, 70];

	function display(obj,b){ obj.style.display = b ?'':'none'; }

	var _DEBUG_ = 0;

	function clickStopButton()
	{
		switch (g_gameStatus)
		{
			case STATUS_NOT_START:	// not started
				if ( E("stopBtn").value == "Stop")
				{
					break;
				}
				E("stopBtn").value = "Stop";
				begin();
				break;

			case STATUS_RUNNING:	// running
				E("stopBtn").value = "Start";
				stop();
				break;

			default:
				break;
		
		}
	}

	function test() {
		_DEBUG_=1;
		showDebugFrm();
		clearInfo();
		clearText();

		showGameOver();
	}

	function init() {
		showDebugFrm();
		showNext();
		showSamples();

		configIcon();
		configSpeed();
		configBG();

		speedSelect.onchange = setSpeedLevel;
		iconSelect.onchange = setBlockIcon;
		bgSelect.onchange = setBgImage;
		
		setSpeedLevel();
	}

	// 设置方块图标
	function configIcon() 
	{
		for ( var i = 0; i < g_blockIcons.length; i++ )
		{
			iconSelect.options.add(new Option(g_blockIcons[i], i));
		}
	}

	function setBlockIcon()
	{
		ICONID = parseInt(iconSelect.value);

		var yVal = ICONID * (-28);
		E("imgBlockIcon").style.backgroundPosition = "0px " + yVal + "px";

		showNext();
		showSamples();

	}

	// 设置速度级别
	function configSpeed() 
	{
		for ( var i = 0; i < g_speedLevels.length; i++ )
		{
			speedSelect.options.add(new Option(i + 1, i));
		}
		speedSelect.options[0].selected = true;
	}

	function setSpeedLevel()
	{
		g_timeInterval = g_speedLevels[ speedSelect.value ];

		speed.innerText = parseInt(speedSelect.value) + 1;
	}

	// 设置背景图案别
	function configBG() 
	{
		for ( var i = 0; i < 11; i++ )
		{
			bgSelect.options.add(new Option("Beauty "+(i+1), g_bgImages[i]));
		}
		bgSelect.options[10].selected = true;
	}

	function setBgImage()
	{
		var imgURL = bgSelect.value;
		leftfrm.style.background = "url(" + imgURL + ")";
	}

	document.onkeydown = handleKey;
	window.onload = init;