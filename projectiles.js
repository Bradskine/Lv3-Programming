class projectile { //for projectiles created by towers


  constructor(
  x=0,
  y=0,
  pierce =  0,
  damage = 0,
  bulletSize=0,
  bulletSpeed = 0,
  bulletColor = ''
  ) {
  this.x = x;
  this.y=y;
  this.pierce = pierce;
  this.damage = damage;
  this.bulletSize = bulletSize;
  this.bulletSpeed = bulletSpeed;
  this.bulletColor = bulletColor;
}


  draw() {
   var {
     x,
     y,
     bulletSize,
     bulletColor,
     bulletSize,
     size= bulletSize*Math.cos(Math.PI /6)
   } = this

ctx.save();
   ctx.beginPath();
   // //will work out trinage around x/y center points
  

   ctx.moveTo(x, y);
   ctx.lineTo(x+bulletSize, y);
   ctx.lineTo(x+bulletSize/2, y-size);
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





}  //end of projectile class
