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
	Function��hex2binstr ( hexNum, strLen )

	���ܣ���16�������ݣ�ת��Ϊָ�����ȣ�strLen���Ķ���������
	���أ�������������Ķ����������ַ���
		- ���е�����0������Ϊ��ĸO����д��
		- ������������ݵ��ַ������Ȳ���ָ�����ȣ�������ĸO����д����ǰ�油��
*/
function hex2binstr(hexNum, strLen) {
	/*
		����0ת����ĸO����ȷ�����ص����ַ��������������ݺ�ĳ��Ȳ����Ķ���������������ȥ�ֱȽ�����������ݡ�
	*/
	var replaceChar = "O";
	var binNum = parseInt(hexNum).toString(2).replace(/0/ig, replaceChar); 
	var binstr = binNum;

	for (i = 0; i < strLen - binNum.length ; i++ )
		binstr = replaceChar + binstr;

	return binstr;
}

/*
	Function��getAbsolutePos(obj)

	���ܣ�ȡ��ָ������obj����Ļ�еľ���ָ��λ��
	˵�����ж���ֹ�������ǡ���ǰ����Ϊbody��
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
