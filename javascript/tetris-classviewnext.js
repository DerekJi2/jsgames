
/********************************************************************
	Class: ViewNextFrameClass

	Properties:

	Methods:
		- create

*/
function ViewNextFrameClass(frmName)
{
	var obj;
	var frameName;

	var shape;

	var offsetsX;
	var offsetsY;
	
	var shapeParamString;

	if (arguments.length < 1)
	{
		alert("[ViewNextFrameClass] frmName is empty!");	
	}
	
	this.create(frmName);
	this.shape = new ShapeClass(g_nextShapeParams);

}

/*
	ViewNextFrameClass.create(frmName)
*/
ViewNextFrameClass.prototype.create = function(frmName)  {
	this.frmName = frmName;
	this.obj = document.getElementById(this.frmName);
	
	/*
	 10: padding
	 28: BASE_HEIGHT/BASE_WIDTH
	 24: 28/2 + 10
	*/
	this.offsetsX = [
		[24+28, 10, 24+28, 10],	// Bar: (H, V, H, V)
		[10+28, 28, 10+28, 28],   // Z: (H, V, H, V)
		[10+28, 28, 10+28, 28],   // S: (H, V, H, V)
		[10+28, 28, 10+28, 28],   // T: (donw, left, up, right)
		[10+28, 28, 10+28, 28],   // L: (90, 180, 270, 0) -- clockwise rotation 
		[10+28, 28, 10+28, 28],   // J: (90, 180, 270, 0) -- clockwise rotation 
		[10+28, 10+28, 10+28, 10+28],    // □ 
	];

	this.offsetsY = [
		[10, 24, 10, 24],	// Bar: (H, V, H, V)
		[28, 10, 28, 10],   // Z: (H, V, H, V)
		[28, 10, 28, 10],   // S: (H, V, H, V)
		[28, 10+28, 28, 10+28],   // T: (donw, left, up, right)
		[28, 10+28, 28, 10+28],   // L: (90, 180, 270, 0) -- clockwise rotation 
		[28, 10+28, 28, 10+28],   // J: (90, 180, 270, 0) -- clockwise rotation 
		[10, 10, 10, 10],    // □ 
	];
}

/*
	ViewNextFrameClass.randomNext()
*/
ViewNextFrameClass.prototype.randomNext = function()  {
	// Step 1: 随机选择颜色，形状，以及摆放角度
	var colorId = Math.floor(7 * Math.random()); // colorId决定X坐标
	var shapeId = Math.floor(7 * Math.random());
	var rotId = Math.floor(4 * Math.random());

	// Step 2: 将图形定位在方框中央
	var offsetX = this.offsetsX[shapeId][rotId];		// unitLeft
	var offsetY = this.offsetsY[shapeId][rotId];		// unitTop

	/*
	this.shape = new ShapeClass();
	this.shape.create(ICONID, colorId, shapeId, rotId, 28);
	this.shape.setUnitPosition(top, left);
	*/
	this.shapeParamString = "c:"  + colorId + "_" +
									"i:"  + ICONID  + "_" +
									"t:"  + shapeId + "_" +
									"a:"  + rotId + "_" +
									"bw:" + 28 + "_" +
									"ut:" + offsetY + "_" +
									"ul:" + offsetX;
									
	this.shape.sets(this.shapeParamString);
	
	//
	g_nextShapeParams = this.shapeParamString;
	
}

/*
	ViewNextFrameClass.draw()
*/
ViewNextFrameClass.prototype.draw = function()  {
	// 生成图形
	this.randomNext();

	// 清除页面已画出的图形
	this.obj.innerHTML = "";

	// 绘制图形
	this.shape.drawBlocks(this.obj);
	//this.shape.draw(this.obj);
}