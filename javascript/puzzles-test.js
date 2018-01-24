function testSortedImage()
{
	var lenX = 640;
	var lenY = 480;

	var pieceWidth = lenX / piecesX;
	var pieceHeight = lenY / piecesY;

	for (var x = 0; x < piecesX; x++ )
	{
		for (var y = 0; y < piecesY; y++ )
		{
			var top = y * pieceHeight;
			var left = x * pieceWidth;
			var bpTop, bpLeft;
			var pos;


			bpLeft = x * pieceWidth;
			bpTop = y * pieceHeight;

			IMAGE_PX[y][x] = (-1) * bpLeft;
			IMAGE_PY[y][x] = (-1) * bpTop;
			debugInfo("testSortedImage( top = " + top + ", left = " + left + ") " + bpTop + "px " +  bpLeft + "px");
		}
	}

	debugInfo("***********************  X  **********************");
	for (var i = 0; i < piecesY; i++ )
	{
		debugInfo(IMAGE_PX[i].toString());
	}

	debugInfo("***********************  Y  **********************");
	for (var i = 0; i < piecesY; i++ )
	{
		debugInfo(IMAGE_PY[i].toString());
	}

	reloadImage();

	if (isSortedImage() == true)
	{
		alert("finished!");
	}
}