/********************************************************************
	Class: BlockClass

	Properties:
		.top
		.left
		.width
		.color
		.icon

	Methods:
		- BlockClass(setstr)
		
		- BlockClass.debugShow
		- BlockClass.draw
		- BlockClass.getDrawString
		
		- BlockClass.sets
		
		- BlockClass.setColor
		- BlockClass.setIcon
		- BlockClass.setLeft
		- BlockClass.setTop
		- BlockClass.setWidth

*/
function BlockClass(setstr)
{
	var top;
	var left;
	var width;
	var color;
	var icon;
	
	if (arguments.length > 0)
	{
		this.sets(setstr);
	}
}

/*
	BlockClass "set" functions
*/
BlockClass.prototype.setTop = function(val)		{	this.top = parseInt(val); }

BlockClass.prototype.setLeft = function(val)	{	this.left = parseInt(val); }

BlockClass.prototype.setWidth = function(val)	{	this.width = parseInt(val); }

BlockClass.prototype.setColor = function(val)	{	this.color = parseInt(val); }

BlockClass.prototype.setIcon = function(val)	{	this.icon = parseInt(val); }

/*
	BlockClass sets()
*/
BlockClass.prototype.sets = function(setString) {
	/*
		setString samples: 
			c:2_i:6
			t:1_c:2
			t:0_l:5
	*/
	var params = setString.split("_");
	for ( var i = 0 ; i < params.length; i++ )
	{
		var param = params[i].split(":");
		var paramName = param[0];
		var paramValue = param[1];
		if ( paramName == "c" ) { this.setColor(paramValue);		}	// color
		if ( paramName == "i" ) { this.setIcon(paramValue);			}	// icon
		if ( paramName == "w" ) { this.setWidth(paramValue);		}	// width
		if ( paramName == "t" ) { this.setTop(paramValue);	}	// top
		if ( paramName == "l" ) { this.setLeft(paramValue);	}	// left
	}
	
}

/*
	Class: BlockClass.getDrawString()
*/
BlockClass.prototype.getDrawString = function() {
		var styleStr = 
			"<div style=\"" +
			"top:_TOP_px;" +
			"left:_LEFT_px;" +
			"background-position:_BPX_px _BPY_px;" +
			"\">" +
			"</div>";
		var imgPoint = {x:0, y:0}; 

		imgPoint.x = 0 - this.color * this.width;
		imgPoint.y = 0 - this.icon * this.width;

		styleStr = styleStr.replace(/_TOP_/g,  this.top );
		styleStr = styleStr.replace(/_LEFT_/g, this.left );
		styleStr = styleStr.replace(/_BPX_/g, imgPoint.x );
		styleStr = styleStr.replace(/_BPY_/g, imgPoint.y );

		return styleStr;
}

/*
	Class: BlockClass.draw()

	bTop: optional. default as false
		- true: draw as the first one
		- flase(default): draw as the last one
*/
BlockClass.prototype.draw = function(obj, bTop) {
	var drawString = this.getDrawString();

	var origString = obj.innerHTML;
	
	if ( arguments.length > 1 && bTop == true)
	{
		obj.innerHTML = drawString + origString;
	}
	else
	{
		obj.innerHTML += drawString;
	}
}

/*
	Class: BlockClass.occupyCell()

*/
BlockClass.prototype.occupyCell = function() {
	var x = Math.floor(this.left/this.width);
	var y = Math.floor(this.top/this.width);
	var cellVal = this.color;
	
	//debugInfo("Block(left=" + this.left + "|top=" + this.top+ " occupies " + x + "," + y);
	CELL[y][x] = cellVal;
}
