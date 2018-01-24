function showDebugFrm() {
	if (_DEBUG_ != 1) return;

	document.getElementById("debugfrm").className = "show";
}

function debugInfo(str) {
	if (_DEBUG_ != 1) return;

	var testP = document.getElementById("info");
	testP.innerHTML += "<br>" + str + "<br />";
}

function clearInfo() {
	if (_DEBUG_ != 1) return;

	var testP = document.getElementById("info");
	testP.innerHTML = "";
}

function debugText(str) {
	if (_DEBUG_ != 1) return;

	var testT = document.getElementById("txt");
	testT.innerText += str;
}

function clearText() {
	if (_DEBUG_ != 1) return;

	var testT = document.getElementById("txt");
	testT.innerText = "";
}

ShapeClass.prototype.debugShow = function() {
	var debugStr = "[ShapeClass.debugShow] ";
	debugStr += "color = " + this.color + "<br/>" +
						"icon = " + this.icon + "<br/>" +
						"type = " + this.type + "<br/>" +
						"angle = " + this.angle + "<br/>" +
						"unitLeft = " + this.unitLeft + "<br/>" +
						"unitTop = " + this.unitTop + "<br/>";
	debugInfo(debugStr);
}

BlockClass.prototype.debugShow = function() {
	var debugStr = "[BlockClass.debugShow] ";
	debugStr += "color = " + this.color + "<br/>" +
						"icon = " + this.icon + "<br/>" +
						"width = " + this.width + "<br/>" +
						"top = " + this.top + "<br/>" +
						"left = " + this.left;
	debugInfo(debugStr);
}

function debugShowCells()
{
	for ( var i = 0; i < 20; i++ )
	{
		debugInfo( "[Line " + i + "] " + CELL[i].toString() );
	}
}