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
    gradient = 0,
  ) {
    this.x = x;
    this.y = y;
    this.pierce = pierce;
    this.damage = damage;
    this.bulletSize = bulletSize;
    this.bulletSpeed = bulletSpeed;
    this.bulletColor = bulletColor;
    this.directionX = directionX;
    this.directionY = directionY;
    this.gradient = gradient;

  }

  move(n) { //makes the projectiles move in straing line based of direction and gradient of line created
    // console.log(n);
  
    let xV = Math.abs((Math.cos(this.gradient)) * this.bulletSpeed * n);
    let yV = Math.abs((Math.sin(this.gradient)) * this.bulletSpeed * n);

    if (this.directionX == 'right') { // have to find the maji number
      this.x += xV;
    } else if (this.directionX == 'left') {
      this.x -= xV;
    } else {
      //x stays the same // add corection
      this.x = this.x;
    }


    if (this.directionY == 'down') {
      this.y += yV;
    } else if (this.directionY == 'up') {
      this.y -= yV;
    } else {
      this.y = this.y;
      //y staksy same will add corection
    }



    if (n == 1) {
      // var {
      //   x,
      //   y,
      //   bulletSize
      // } = this;
    
      var {
        x,
        y,
        bulletColor,
        bulletSize,
        size = bulletSize * 2 * Math.cos(Math.PI / 6)
      } = this
      x -= bulletSize;
      y += (bulletSize) * 1.732 - bulletSize;


      var v1x = x;
      var v1y = y;
      var v2x = x + bulletSize * 2;
      var v2y = y;
      var v3x = x + bulletSize;
      var v3y = y - size; 
      // var bColor = this.bulletColor;   
      var circleHitting = false;
      var cornerHit = false;
      var sideHit = false;
      var centerHit = false;
      Circles.forEach(function (circle) {
        circleHitting = false;
                // if(circle.x-circle.r<= x+bulletSize&&circle.x+circle.r>=x-bulletSize &&circle.y+circle.r>= y -bulletSize&&circle.y-circle.r<=y+bulletSize) {
                
              
                  // Math.sqrt((v1x−circle.x)+(v1y−circle.y));

                //  for(var i=1;i<=3;i++) {
                //    var xa = eval('v'+i+'x');
                //    var ya = eval('v'+i+'y');
                //   //  console.log(x);
                //   var d =  Math.sqrt(Math.pow(xa-circle.x,2)+Math.pow(ya-circle.y,2));
                //   // console.log(d);
                //   if(d<=circle.r) {
                //     circle.coll += 1;
                //     console.log(i);
                //   }
                //  } basic before reading article



                // }

                
 // toDo amke it so it happens when it is nolonger touching circle so doessnt do muiltple hits


        // TEST 1: Vertex within circle

        var c1x = circle.x - v1x;
        var c1y = circle.y - v1y;
        var radiusSqr = circle.r * circle.r;
        var c1sqr = c1x * c1x + c1y * c1y - radiusSqr;
        if (c1sqr <= 0) {
          circle.coll += 1;
          cornerHit = true;
        } else 


        var c2x = circle.x - v2x;
        var c2y = circle.y - v2y;
        var c2sqr = c2x * c2x + c2y * c2y - radiusSqr;
        if (c2sqr <= 0) {
          circle.coll += 1;
          cornerHit = true;
        }  else


        var c3x = circle.x - v3x;
        var c3y = circle.y - v3y;
        var c3sqr = c3x * c3x + c3y * c3y - radiusSqr;
        if (c3sqr <= 0) {
          circle.coll += 1;
          cornerHit = true;
        }  else


        //  TEST 2: Circle circle. within triangle



        //  Calculate edges

        var e1x = v2x - v1x;
        var e1y = v2y - v1y;

        var e2x = v3x - v2x;
        var e2y = v3y - v2y;

        var e3x = v1x - v3x;
        var e3y = v1y - v3y;


        if (Math.sign(e2y * c2x - e2x * c2y) > 0 && Math.sign(e3y * c3x - e3x * c3y) > 0  && Math.sign(e1y * c1x - e1x * c1y) > 0) {

          circle.coll += 1;
          centerHit = true;
        }  else 




        //  TEST 3: Circle intersects edge

        // var k = c1x * e1x + c1y * e1y;

        // if (k > 0) {
        //   var len = e1x * e1x + e1y * e1y;

        //   if (k < len) {
        //     if (c1sqr * len <= k * k) {
        //       circle.coll += 1;
        //       sideHit = true;
        //     }
        //   }
        // }  

        // //  Second edge
        // k = c2x * e2x + c2y * e2y;

        // if (k > 0) {
        //   len = e2x * e2x + e2y * e2y;

        //   if (k < len) {
        //     if (c2sqr * len <= k * k) {
        //       circle.coll += 1;
        //       sideHit = true;
        //     }
        //   }
        // }
        // //  Third edge
        // k = c3x * e3x + c3y * e3y;

        // if (k > 0) {
        //   var len = e3x * e3x + e3y * e3y;

        //   if (k < len) {
        //     if (c3sqr * len <= k * k) {
        //       circle.coll += 1;
        //       sideHit = true;
        //     }
        //   }
        // }
            


        if (circleHitting == true) {
          console.log('circle hit');
          // console.log(cornerHit,centerHit,sideHit);
          // for (var i=0; i<Projectiles.length;i++) {

          for (var i = 0; i < Circles.length; i++) {
            if (Circles[i].x == circle.x && Circles[i].y == circle.y && Circles[i].c == circle.c) {
              delete Circles[i];
              Circles = Circles.filter(item => item !== undefined);
            }
          }
        }


      });

    }



  } //end of move funtion



  draw() {
    var {
      x,
      y,
      bulletColor,
      bulletSize,
      size = bulletSize * 2 * Math.cos(Math.PI / 6)
    } = this

    x -= bulletSize;
    y += (bulletSize) * 1.732 - bulletSize;
    ctx.save();
    ctx.beginPath();
    // //will work out trinage around x/y center points


    ctx.moveTo(x, y);
    ctx.lineTo(x + bulletSize * 2, y);
    ctx.lineTo(x + bulletSize, y - size);
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

