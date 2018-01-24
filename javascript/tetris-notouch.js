/*

function changeTab(x) {

	var tab = document.getElementById("nav").getElementsByTagName("li");
	var mainView = document.getElementById("content").getElementsByTagName("p");
	
	for ( i = 0; i < tab.length; i++ )
	{
		var id = (i == 0)? i : (i+1);
		if ( x == i )
		{
			tab[i].className = "selected";
			mainView[id].className = "show";
		}
		else
		{
			tab[i].className = "unselected";
			mainView[id].className = "hide";
		}
		
	}
		if (tab[0].className == "selected")
		{
			document.getElementById("imgBlockIcon").style.display = "block";
		}
		else
		{
			document.getElementById("imgBlockIcon").style.display = "none";
		}
		
}
*/
/*
	Function：hex2binstr ( hexNum, strLen )

	功能：将16进制数据，转换为指定长度（strLen）的二进制数据
	返回：经过以下整理的二进制数据字符串
		- 所有的数字0，更改为字母O（大写）
		- 如果二进制数据的字符串长度不足指定长度，则以字母O（大写）在前面补足
*/
function hex2binstr(hexNum, strLen) {
	/*
		数字0转成字母O，以确保传回的是字符串，而不是整容后的长度不够的二进制数。但看上去又比较像二进制数据。
	*/
	var replaceChar = "O";
	var binNum = parseInt(hexNum).toString(2).replace(/0/ig, replaceChar); 
	var binstr = binNum;

	for (i = 0; i < strLen - binNum.length ; i++ )
		binstr = replaceChar + binstr;

	return binstr;
}

/*
	Function：getAbsolutePos(obj)

	功能：取得指定对象obj在屏幕中的绝对指标位置
	说明：判断终止的条件是“当前对象为body”
*/
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

/********************************************************************
	Class: GlobalConfigClass

	Properties:

	Methods:
		- create

*/
function GlobalConfigClass()
{
	var _IconId;
}

/********************************************************************
	Class: UnitClass

	Properties:

	Methods:

*/
function UnitClass()
{
	var top;
	var left;
	var length;

	var subshapeType;
	var subshapeAngle;

	var array;
}

/*
	Class: UnitClass.create()

	parameters:
		- top: 
		- left: 
		- length: optional, default as 4
*/
UnitClass.prototype.create = function(top, left, length) {
	this.top = top;
	this.left = left;
	if( arguments.length < 3 )
		this.length = 4;

	this.array = undefined;
}

/*
	Class: UnitClass.setInternal()

	parameters:
		- top: 
		- left: 
		- length: optional, default as 4
*/
UnitClass.prototype.setSubShapeParams = function(type, angle) {
	this.subshapeType = type;
	this.subshapeAngle = angle;
}

/*
	Class: UnitClass.setArray()

	parameters:
*/
UnitClass.prototype.setArray = function(type, angle) {

	var binstr = "";

	if (arguments.length == 2)
	{
		setSubShapeParams(type, angle);
	}

	binstr = hex2binstr(shapes[this.subshapeType][this.subshapeAngle], 16);

	array = [
			binstr.substr(0,4),
			binstr.substr(4,4),
			binstr.substr(8,4),
			binstr.substr(12,4)];
	
}
