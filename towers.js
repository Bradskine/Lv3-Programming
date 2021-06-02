class tower { //this will creawte circles which go around track


  constructor(
  x=0,
  y=0,
  attackSpeed = 0,
  pierce =  0,
  range=0,
  damage = 0,
  color = '',
  width = 0,
  height = 0,
  bulletSize = 0,
  bulletColor = '';
  ) {
    this.x=x;
    this.y=y;
    this.attackSpeed = attackSpeed;
    this.pierce = pierce;
    this.range = range;
    this.damage = damage;
    this.color = color;
    this.width = gridSize;
    this.height = gridSize;
    this.bulletSize = bulletSize;
    this.bulletColor = bulletColor;
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
    ctx.fillRect(x, y, width, height);
    ctx.restore()

  }





}  //end of tower class
