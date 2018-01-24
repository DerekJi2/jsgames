function GameClass()
{
	var strGridFrm;
	var objGridFrm;
	
	var strStageFrm;
	var objStageFrm;
	
	var strNextFrm;
	var objNextFrm;
	
	var score;
	var strScoreElem;
	var objScoreElem;
	
	var strGameOverFrm;
	var objGameOverFrm;
	
	var strShape;
	var shape;
	
	//var keyEvent;
	
	this.init();
}

/*
	GameClass.init()
*/
GameClass.prototype.init = function() {
	this.setGridFrm("grid");
	this.setStageFrm("stage");
	this.setGameOverFrm("gameover");
	this.setNextFrm("nextBlock");
	this.setScoreElem("score");
	this.score = 0;
	this.keyEvent = window.event;
}

/*
	GameClass.setGridFrm()
*/
GameClass.prototype.setGridFrm = function(str) {
	this.strGridFrm = str;
	this.objGridFrm = document.getElementById(str);	
}

/*
	GameClass.setStageFrm()
*/
GameClass.prototype.setStageFrm = function(str) {
	this.strStageFrm = str;
	this.objStageFrm = document.getElementById(str);	
}

/*
	GameClass.setGameOverFrm()
*/
GameClass.prototype.setGameOverFrm = function(str) {
	this.strGameOverFrm = str;
	this.objGameOverFrm = document.getElementById(str);	
}


/*
	GameClass.setNextFrm()
*/
GameClass.prototype.setNextFrm = function(str) {
	this.strNextFrm = str;
	this.objNextFrm = document.getElementById(str);	
}

/*
	GameClass.setScoreElem()
*/
GameClass.prototype.setScoreElem = function(str) {
	this.strScoreElem = str;
	this.objScoreElem = document.getElementById(str);	
}

/*
	GameClass.newGame()
*/
GameClass.prototype.newGame = function()
{
	this.objGridFrm.innerHTML = "";
	this.objStageFrm.innerHTML = "";
	this.objGameOverFrm.innerHTML = "";
	for (var i = 0; i < 20; i++)
	{
		for (var j = 0; j < 10; j++)
		{
			CELL[i][j] = -1;
		}
	}
	this.score = 0;
	this.objScoreElem.innerText = 0;

	//document.onkeydown = handleKeyDown(window.event);
}






/*
	GameClass.()
*/
GameClass.prototype.handleKeyDown = function(evt)
{
	
}

/*
	GameClass.()
*/
GameClass.prototype.stopGame = function()
{
	clearInterval(g_gameID);
}