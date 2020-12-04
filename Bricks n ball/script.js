var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// setInterval(draw,10);


//ball
var x=(c.width/2)+Math.floor(Math.random()*21)-10;
var y=(c.height- 30)+Math.floor(Math.random()*21)-10;
var dx=1;
var dy=-1;
var ballRadius=16;

//paddle
var paddleWidth=75;
var paddleHeight=5;
var paddleX= (c.width-paddleWidth)/2;
var rightPressed=false;
var leftPressed=false;

//brick
var brickRowCount =3;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var brickPadding=10;

var score=0;
var lives=3;
var level=1;
var bricks=[];
var maxLevel=5;
var isPaused=false;
var ball= new Image();
ball.src='ball.png';

//i=row j=col

initBricks();

function initBricks(){
	for(i=0;i<brickColumnCount;i++)
	{
		bricks[i]=[];
		for(j=0;j<brickRowCount;j++)
		{
			bricks[i][j]={x:0,y:0,status:1};
		}

	}	
}

document.addEventListener("keydown",keydownHandler);
document.addEventListener("keyup",keyupHandler);

function keydownHandler(e){
	if (e.keyCode==39) {
		rightPressed=true;
	}
	else if (e.keyCode==37)
	{
		leftPressed=true;
	}

}

function keyupHandler(e){
	if (e.keyCode==39) {
		rightPressed=false;
	}
	else if (e.keyCode==37)
	{
		leftPressed=false;
	}

}
//mouse movement
document.addEventListener("mousemove", mouseMoveHandler);
  
function mouseMoveHandler(e) {
  
                var relativeX = e.clientX - c.offsetLeft;
  
                if(relativeX > 0+paddleWidth/2 && relativeX < c.width-paddleWidth/2) {
  
                                paddleX = relativeX - paddleWidth/2;
  
                }
  
}

function drawBall(){
	// ctx.beginPath();
	// ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	// ctx.fillStyle="#ff2382";
	// ctx.fill();
	// ctx.closePath();
	ctx.drawImage(ball,x,y,ballRadius,ballRadius);
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,c.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#ff2382";
	ctx.fill();
	ctx.closePath();
}

function drawBricks()
{
	for(col=0; col<brickColumnCount; col++)
	{
		for(row=0; row<brickRowCount; row++)
		{
			if(bricks[col][row].status==1)
			{
				var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[col][row].x = brickX;
				bricks[col][row].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle="#0095dd";
				ctx.fill();
				ctx.closePath();

			}

		}
	}
}

function collisionDetection(){
	for(col=0;col<brickColumnCount;col++){
		for(row=0;row<brickRowCount;row++)
		{
			var b=bricks[col][row];
			if(b.status==1)
			{
				if(x>b.x && x< b.x+brickWidth && y>b.y && y<b.y+brickHeight)
					{
						dy=-dy;
						b.status=0;
						score++;
						if(score==brickRowCount*brickColumnCount)
						{
							if(level === maxLevel)
							{
								alert("Congrats you won");
							    document.location.reload();
							}
							else
							{
								level++;
								score=0;
								brickRowCount++;
								initBricks();
								x=(c.width/2)+Math.floor(Math.random()*21)-10;
								y=(c.height-30)+Math.floor(Math.random()*21)-10;
								paddleX=(c.width-paddleWidth)/2;
								dx=level;
								dy=-level;
								isPaused=true;
								ctx.beginPath();
								ctx.rect(0,0,c.width,c.height);
								ctx.fillStyle="#feb";
								ctx.fill();
								ctx.font ="24px Arial";
								ctx.fillStyle="#22ee00";
								ctx.fillText("Loading Level..."+level,150,150);
								setTimeout(function(){
									isPaused=false;
									draw();
								},3000);
								
							}
		
							
						}

					}

			}
			
		}
	}

}

function drawScore(){
	ctx.font ="16px Arial";
	ctx.fillStyle="#9896e2";
	ctx.fillText("score: "+score,8,20);
}

function drawLives(){
	ctx.font ="16px Arial";
	ctx.fillStyle="#9896e2";
	ctx.fillText("Lives: "+lives,c.width-65,20);
}

function drawLevels(){
	ctx.font ="16px Arial";
	ctx.fillStyle="#9896e2";
	ctx.fillText("Level: "+level,210,20);

}

function draw()
{

    ctx.clearRect(0,0,c.width,c.height);
	drawBall();
	drawPaddle();
	drawBricks();
	drawScore();
	drawLives();
	drawLevels();
	collisionDetection();

	if(y+dy<ballRadius)
	{
		dy=-dy;
	}
	else if (y+dy>c.height-ballRadius) {
		if (x > paddleX && x < paddleX+paddleWidth) 
		{
			dy=-dy;
		}

		else
		{
			lives--;
			if(!lives)
			{
				alert("GAME OVER");
		        document.location.reload();
			}
			else
			{
				x=(c.width/2)+Math.floor(Math.random()*21)-10;
				y=(c.height-30)+Math.floor(Math.random()*21)-10;
				paddleX=(c.width-paddleWidth)/2;
			}
		}
		
	}

	if (x+dx<ballRadius || x+dx>c.width-ballRadius) 
	{
		dx=-dx;
	}

	if (rightPressed && paddleX<c.width-paddleWidth) {
		paddleX+=7;
	}
	if (leftPressed && paddleX>0) 
	{
		paddleX-=7;
	}


	x += dx;
	y += dy;
	if(!isPaused)
	{
		requestAnimationFrame(draw);
	}
	
}
draw();