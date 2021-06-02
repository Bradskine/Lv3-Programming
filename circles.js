class circle { //this will creawte circles which go around track

  constructor(
    x = 0,
    y = 0,
    r = 0,
    c = '',
    borderW = '',
    borderC = '',
    speed = 0,
    numberCo = 0,
    nextCo = 0,
    height = 0,
    rbe = 0,
    health= 0
  ) {

    this.x = Number(x);
    this.y = Number(y);
    this.r = Number(r); //makes all numbers incase mistype

    this.c = c;
    this.borderW = borderW;
    this.borderC = borderC;
    this.speed = speed;
    this.numberCo = numberCo;
    this.nextCo = [currentTrack[numberCo][0], currentTrack[numberCo][1]];
    this.height = Number(height);
    this.rbe = rbe;
    this.health = health;
  }


  get area() { //this is incase i want to compare circles and know whcih one
    // is bigger to put smaller one on top for visual clarity
    return this.radius ^ 2 * Math.PI;
  }
  //might a make a shorcut fucniotn thing for each circle type




  draw() {

    var {
      x,
      y,
      r,
      c,
      borderW,
      borderC,
    } = this

    ctx.save() //so doesnt save over other ones

    drawCircle(x, y, r, c, borderW, borderC)
    ctx.restore()
  }

  followTrack() { //will make another one for tower that sends circle to start
    if (this.x > this.nextCo[0] + this.speed || this.x < this.nextCo[0] - this.speed || this.y < this.nextCo[1] - this.speed || this.y > this.nextCo[1] + this.speed) {
      if (this.x - this.nextCo[0] < -this.speed) {
        this.x += this.speed;
      } else if (this.x - this.nextCo[0] > this.speed) {
        this.x -= this.speed;
      }

      if (this.y - this.nextCo[1] < -(this.speed)) {
        this.y += this.speed;
      } else if (this.y - this.nextCo[1] > this.speed) {
        this.y -= this.speed;
      }

    } else {
      this.numberCo += 1;
      this.nextCo = [currentTrack[this.numberCo][0], currentTrack[this.numberCo][1]];
    }


  }


} // end of circle class
