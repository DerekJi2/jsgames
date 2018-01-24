// JavaScript Document
function drawSingle(top, left, colorId, iconId) {
	var drawStr = "";
	var styleStr = "";
	var imgPoint = {x:0, y:0}; 

	imgPoint.x = 0 - colorId * BASE_WIDTH;
	imgPoint.y = 0 - iconId * BASE_HEIGHT;

	styleStr += "top:" + top + "px;";
	styleStr += "left:" + left + "px;";
	styleStr += "background-position:";
	styleStr += imgPoint.x + "px " + imgPoint.y + "px;";

	drawStr += "<div style=\"" + styleStr + "\">";
	drawStr += "</div>";

	return drawStr;
}

function drawWhole(x, y, colorId, iconId, shapeId, rotId) {
	var binstr = hex2binstr(shapes[shapeId][rotId], 16);

	var posArr = [binstr.substr(0,4),
					binstr.substr(4,4),
					binstr.substr(8,4),
					binstr.substr(12,4)];

	var px = x;
	var py = y;

	var drawStr = "";

	for ( i = 0; i < 4 ; i++ )
	{
		px = x + i * BASE_WIDTH;
		for ( j = 0; j < 4 ; j++ )
		{
			py = y + j * BASE_HEIGHT;
			if (posArr[i].substr(j,1) == "1")
			{
				drawStr += drawSingle(py, px, colorId, iconId);
			}
		}
	}
	return drawStr;
}

	function moveDown() {
		// Y¡® = Y + 28
		// Òà¼´£¬TopÖµÔö¼Ó£¬
		var newTop = _curShape.top + 28;

		if (newTop > BOTTOM_Y)
		{
			return;
		}
		_curShape.top = newTop;
		var downStr = drawWhole(_curShape.left,
								_curShape.top,
								_curShape.color,
								_curShape.icon,
								_curShape.shapeid,
								_curShape.rot);

		var gridObj = document.getElementById("grid");
		gridObj.innerHTML = downStr;
	}

		function begin() {
		initGridImage();
		initGridValue();

		var shape = new ShapeClass();

		IntervalID = window.setInterval(moveDown, 1000);
	}

	function moveDown2() {
		var stageObj = document.getElementById("stage");
		stageObj.innerHTML = "";

		CurrentShape.moveDown(stageObj);
	}

	function begin2() {
		initGridImage();
		CurrentShape = new ShapeClass();
		CurrentShape.create(_curShape.icon, 
					_curShape.color, 
					_curShape.shapeid, 
					_curShape.rot, 28);
			
		CurrentShape.setUnitPosition(0, 4*28);
		CurrentShape.setBlocks();

		IntervalID = window.setInterval(moveDown2, 100);
	}