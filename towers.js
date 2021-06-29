class tower { //this will creawte circles which go around track


  constructor(
  x=0,
  y=0,
  attackSpeed = 0,
  coolDown = 0,
  pierce =  0,
  range=0,
  damage = 0,
  color = '',
  bulletSpeed =0,
  bulletSize = 0,
  bulletColor = '',
  targeting = '',
  width = 0,
  height = 0,
  ) {
    this.x=x;
    this.y=y;
    this.coolDown = coolDown;
    this.attackSpeed = attackSpeed;
    this.pierce = pierce;
    this.range = range;
    this.damage = damage;
    this.color = color;
    this.bulletSpeed=bulletSpeed,
    this.bulletSize = bulletSize;
    this.bulletColor = bulletColor;
    this.targeting = targeting;
    this.width = gridSize;
    this.height = gridSize;
  }


  draw() {

    var {
      x,
      y,
      color,
      width,
      height
    } = this

    ctx.save() //so doesnt save over other ones
    ctx.fillStyle = color;
    ctx.fillRect(x-gridSize/2, y-gridSize/2, width, height);
    ctx.restore()

  }





}  //end of tower class
