function showDebugFrm() {
	var styleStr = ( _DEBUG_ == 0 ) ? "none" : "block";
	document.getElementById("debugFrm").style.display = styleStr;
}

function debugText(strT)
{
	if (_DEBUG_ == 0) return;
	var obj = document.getElementById("debugFrm");
	obj.innerText += strT;
}

function debugInfo(strT)
{
	if (_DEBUG_ == 0) return;
	var obj = document.getElementById("debugFrm");
	obj.innerHTML += strT + "<br/>";
}
