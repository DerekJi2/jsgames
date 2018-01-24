

/********************************************************************
	Class: ShapeClass

	Properties:
		.unit(left, top)
		.color
		.icon
		.type
		.angle
		.blockwidth
		.blocks

	Methods:
		- create(icon, color, type, angle, blockwidth
		- setUnitPosition(top, left)
		- setBlocks
*/
function ShapeClass(str)
{
	var unitLeft;
	var unitTop;
	var color;
	var icon;
	var type;
	var angle;
	var blockwidth;
	var blocks;

	this.initBlocks();
	
	this.sets("c:0_i:0_t:0_a:0_bw:28_ut:0_ul:0");
	
	if ( arguments.length > 0 )
	{
		this.sets(str);
	}

}

/*
	ShapeClass.initBlocks()
*/
ShapeClass.prototype.initBlocks = function() {
	this.blocks = new Array(4);

	var initBlockSetStr = "c:0_i:0_t:0_l:0_w:28";
	for (var i = 0; i < 4; i++)
	{
		this.blocks[i] = new BlockClass(initBlockSetStr);
	}
}

/*
	ShapeClass "set" functions
*/
ShapeClass.prototype.setColor = function(val) {	this.color = parseInt(val); }

ShapeClass.prototype.setIcon = function(val) {	this.icon = parseInt(val); }

ShapeClass.prototype.setType = function(val) {	this.type = parseInt(val); }

ShapeClass.prototype.setAngle = function(val) {	this.angle = parseInt(val); }

ShapeClass.prototype.setUnitTop = function(val) {	this.unitTop = parseInt(val); }

ShapeClass.prototype.setUnitLeft = function(val) {	this.unitLeft = parseInt(val); }

ShapeClass.prototype.setBlockWidth = function(val) {	this.blockwidth = parseInt(val); }


/*
	ShapeClass sets()
*/
ShapeClass.prototype.sets = function(setString) {
	/*
		setString samples: 
			c:2_i:6_bw_28
			t:1_c:2
			ut:0_ul:5
	*/
	var params = setString.split("_");
	for ( i = 0 ; i < params.length; i++ )
	{
		var param = params[i].split(":");
		var paramName = param[0];
		var paramValue = param[1];
		if ( paramName == "c" )  { this.setColor(paramValue);            }	// color
		if ( paramName == "i" )  { this.setIcon(paramValue);             }	// icon
		if ( paramName == "t" )  { this.setType(paramValue);             }	// type
		if ( paramName == "a" )  { this.setAngle(paramValue);            }	// angle
		if ( paramName == "bw" ) { this.setBlockWidth(paramValue);       }	// blockwidth
		if ( paramName == "ut" ) { this.setUnitTop(paramValue);          }	// unitTop
		if ( paramName == "ul" ) { this.setUnitLeft(paramValue);         }	// unitLeft
	}
	
	this.setBlocks();
	
}

/*
	ShapeClass.create()

ShapeClass.prototype.create = function(icon, color, type, angle, blockwidth) {
	this.icon = icon;		// ±³¾°Í¼±êÀàÐÍ£¨±àºÅ£©£º0-4
	this.color = color;		// ±³¾°Í¼Æ¬ÑÕÉ«£¨±àºÅ£©£º0-7
	this.type = type;		// ·½¿éÐÎ×´£¨±àºÅ£©£º0-7
	this.angle = angle;		// Ðý×ª½Ç¶È£¨±àºÅ£©£º0-3

	this.blockwidth = 28;
	if (arguments.length > 4) {
		this.blockwidth = blockwidth;
	}
	
}
*/

/*
	ShapeClass.setUnitPosition()

ShapeClass.prototype.setUnitPosition = function(top, left) {
	this.unitLeft = left;
	this.unitTop = top;
}*/

/*
	ShapeClass.setBlocks()
*/
ShapeClass.prototype.setBlocks = function() {
		var binstr = hex2binstr(shapes[this.type][this.angle], 16);

		var unitArray = [binstr.substr(0,4),
						binstr.substr(4,4),
						binstr.substr(8,4),
						binstr.substr(12,4)];

		var blockLeft;
		var blockTop;

		var blockId = 0;

		for ( var i = 0; i < 4 ; i++ )
		{
			blockLeft = this.unitLeft + i * this.blockwidth;
			for ( var j = 0; j < 4 ; j++ )
			{
				blockTop = this.unitTop + j * this.blockwidth;
				if (unitArray[i].substr(j,1) == "1")
				{
					var setBlockString = "t:" + blockTop + "_" +
															"l:" + blockLeft + "_" +
															"w:" + this.blockwidth + "_" +
															"i:" + this.icon + "_" +
															"c:" + this.color;
															
					this.blocks[blockId].sets(setBlockString);
					blockId++;
				}
			}
		}
}

/*
	ShapeClass.getDrawString()
*/
ShapeClass.prototype.getDrawString = function() {
	var drawString = "";
	var blockNum = 4;

	for (i = 0; i < blockNum; i++)
	{
		drawString += this.blocks[i].getDrawString();
	}
	return drawString;
}

/*
	ShapeClass.draw()
*/
ShapeClass.prototype.draw = function(obj) {
	var blockNum = 4;

	this.setBlocks();
	for (i = 0; i < blockNum; i++)
	{
		this.blocks[i].draw(obj);
	}
}

/*
	ShapeClass.drawBlocks()
*/
ShapeClass.prototype.drawBlocks = function(obj) {
	var blockNum = 4;
	var drawString = "";

	this.setBlocks();
	for (i = 0; i < blockNum; i++)
	{
		drawString += this.blocks[i].getDrawString();
	}
	obj.innerHTML = drawString;
	//debugText( drawString );
}

/*
	ShapeClass.moveLeftAllowed()
*/
ShapeClass.prototype.moveLeftAllowed = function() {
	var uLeftOfNext, uTopOfNext;
	
	for (i = 0; i < 4; i++)
	{
		uLeftOfNext = this.blocks[i].left/28 - 1;
		uTopOfNext = this.blocks[i].top/28;
		
		if (uLeftOfNext < 0 || CELL[uTopOfNext][uLeftOfNext]  > -1)
		{
			return false;
		}
	}
	
	return true;;
}

/*
	ShapeClass.moveRightAllowed()
*/
ShapeClass.prototype.moveRightAllowed = function() {
	var uLeftOfNext, uTopOfNext;
	
	for (i = 0; i < 4; i++)
	{
		uLeftOfNext = this.blocks[i].left/28 + 1;
		uTopOfNext = this.blocks[i].top/28;
		
		if (uLeftOfNext > 9 || CELL[uTopOfNext][uLeftOfNext] > -1)
		{
			return false;
		}
	}
	
	return true;;
}

/*
	ShapeClass.moveDownAllowed()
*/
ShapeClass.prototype.moveDownAllowed = function() {
	var uLeftOfNext, uTopOfNext;
	
	for (i = 0; i < 4; i++)
	{
		uLeftOfNext = Math.floor(this.blocks[i].left/28);
		uTopOfNext = Math.floor(this.blocks[i].top/28) + 1;
		
		if (uTopOfNext > 19 || CELL[uTopOfNext][uLeftOfNext]  > -1)
		{
			return false;
		}
	}
	
	return true;;
}

/*
	ShapeClass.rotateAllowed()
*/
ShapeClass.prototype.rotateAllowed = function() 
{
	var changeRule = [1, 2, 3, 0];
	var newAngle = changeRule[this.angle];
	
	var newShape = new ShapeClass();
	newShape.setType(this.type);
	newShape.setBlockWidth(this.blockwidth);
	newShape.setAngle(newAngle);
	newShape.setUnitLeft(this.unitLeft);
	newShape.setUnitTop(this.unitTop);
	newShape.setBlocks();
	
	for (i = 0; i < 4; i++)
	{
		uLeftOfNext = Math.floor(newShape.blocks[i].left/28);
		uTopOfNext = Math.floor(newShape.blocks[i].top/28);
		
		if (uTopOfNext > 19 || uLeftOfNext > 9 || uLeftOfNext < 0 || CELL[uTopOfNext][uLeftOfNext]  > -1)
		{
			return false;
		}
	}
}

/*
	ShapeClass.moveDown()
*/
ShapeClass.prototype.moveDown = function() {

	//debugInfo("this.unitTop = " + this.unitTop + ", this.unitLeft = " + this.unitLeft);
	
	this.sets("ut:"+parseInt(this.unitTop+28).toString() + "_" +
						"ul:" + this.unitLeft);
	//debugInfo("this.unitTop = " + this.unitTop + ", this.unitLeft = " + this.unitLeft);
	this.setBlocks();
	this.drawBlocks(g_game.objStageFrm);
}


/*
	ShapeClass.moveLeft()
*/
ShapeClass.prototype.moveLeft = function() {

	//debugInfo("this.unitTop = " + this.unitTop + ", this.unitLeft = " + this.unitLeft);
	
	this.sets("ut:"+parseInt(this.unitTop).toString() + "_" +
						"ul:" + parseInt(this.unitLeft-28).toString());
	//debugInfo("this.unitTop = " + this.unitTop + ", this.unitLeft = " + this.unitLeft);
	this.setBlocks();
	this.drawBlocks(g_game.objStageFrm);
}

/*
	ShapeClass.moveRight()
*/
ShapeClass.prototype.moveRight = function() {

	//debugInfo("this.unitTop = " + this.unitTop + ", this.unitLeft = " + this.unitLeft);
	
	this.sets("ut:"+parseInt(this.unitTop).toString() + "_" +
						"ul:" + parseInt(this.unitLeft+28).toString());
	//debugInfo("this.unitTop = " + this.unitTop + ", this.unitLeft = " + this.unitLeft);
	this.setBlocks();
	this.drawBlocks(g_game.objStageFrm);
}

/*
	ShapeClass.rotate()
*/
ShapeClass.prototype.rotate = function() {

	//debugInfo("[Rotate] before: this.angle = " + this.angle );

	var changeRule = [1, 2, 3, 0];
	var newAngle = changeRule[this.angle];
		
	this.sets("a:" + newAngle);
	
	//debugInfo("[Rotate] after: this.angle = " + this.angle );

	this.setBlocks();
	this.drawBlocks(g_game.objStageFrm);
}