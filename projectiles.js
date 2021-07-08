class projectile { //for projectiles created by towers


  constructor(
    x = 0,
    y = 0,
    pierce = 0,
    damage = 0,
    bulletSize = 0,
    bulletSpeed = 0,
    bulletColor = '',
    directionX = 0,
    directionY = 0,
    gradient = 0
  ) {
    this.x = x;
    this.y = y ;
    this.pierce = pierce;
    this.damage = damage;
    this.bulletSize = bulletSize;
    this.bulletSpeed = bulletSpeed;
    this.bulletColor = bulletColor;
    this.directionX = directionX;
    this.directionY = directionY;

    this.gradient = gradient;

  }

  move(n) {  //makes the projectiles move in straing line based of direction and gradient of line created
    // console.log(n);
  
    let xV = Math.abs((Math.cos(this.gradient)) * this.bulletSpeed*n);
    let yV =  Math.abs((Math.sin(this.gradient)) * this.bulletSpeed*n);

    if (this.directionX == 'right') { // have to find the maji number
      this.x += xV;
    } else if (this.directionX =='left') {
      this.x -= xV;
    }  else {
      //x stays the same // add corection
      this.x = this.x;
    }


    if (this.directionY == 'down') {
      this.y += yV;
    } else if(this.directionY == 'up') {
      this.y -=  yV;
    }  else {
      this.y = this.y;
      //y staksy same will add corection
    }



      if(n == 1) {
        
  // triangle = (x,y)(x+bulletSize*2, y)(x+bulletSize, y-size)
  // circle = x,y,r
  Circles.forEach(function (circle) {
    var collide = require('this-circle-collision');

    var triangle = [[this.x,this.y], [this.x+bulletSize*2,y], [this.x+bulletSize, this.y-size]];
    var point = [circle.x,circle.y],
         radius = circle.bulletSize;
    
    //returns true if collision occurs
    console.log( collide(triangle, point, radius) )



  });



  }




}  //end of move funtion






// draw() {
//   var {
//     x,
//     y,
//     bulletColor,
//     bulletSize,
//     size = bulletSize * Math.cos(Math.PI / 6)
//   } = this


draw() {
  var {
    x ,
    y ,
    bulletColor,
    bulletSize,
    size = bulletSize * 2* Math.cos(Math.PI / 6)
  } = this

  x -= bulletSize;
  y += (bulletSize)*1.732 - bulletSize;
  ctx.save();
  ctx.beginPath();
  // //will work out trinage around x/y center points


  ctx.moveTo(x,y); 
  ctx.lineTo(x+bulletSize*2, y);
  ctx.lineTo(x+bulletSize, y-size);
  ctx.closePath();


  // the outline
  // context.lineWidth = 10;
  // context.strokeStyle = '#666666';
  // context.stroke();

  // the fill color
  ctx.fillStyle = bulletColor;
  ctx.fill();
  ctx.restore();

}






} //end of projectile class
