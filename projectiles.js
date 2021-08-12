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
    colls = [],
    peirceR = 0 // peirce remaining
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
    this.colls = [];
    this.peirceR = pierce;
  }

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

  move(n) { 
    //makes the projectiles move in straing line based of direction and gradient of line created
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
        if(this.x + this.bulletSize*2 < 0 || this.x> canvas.width || this.y-this.bulletSize * 2 * Math.cos(Math.PI / 6)>canvas.height||this.y<0) {
          this.x = 'hi';
          Projectiles = Projectiles.filter(item => item.x !== 'hi');
        }




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
      var run = true;
      Circles.forEach(function (circle) {
 


        circleHitting = false;
        run = true;


        // TEST 1: Vertex within circle

        var c1x = circle.x - v1x;
        var c1y = circle.y - v1y;
        var radiusSqr = circle.r * circle.r;
        var c1sqr = c1x * c1x + c1y * c1y - radiusSqr;
        if (c1sqr <= 0) {
          circleHitting = true;

        } else


          var c2x = circle.x - v2x;
        var c2y = circle.y - v2y;
        var c2sqr = c2x * c2x + c2y * c2y - radiusSqr;
        if (c2sqr <= 0) {
          circleHitting = true;
        } else


          var c3x = circle.x - v3x;
        var c3y = circle.y - v3y;
        var c3sqr = c3x * c3x + c3y * c3y - radiusSqr;
        if (c3sqr <= 0) {
          circleHitting = true;
        } else

          //  TEST 2: Circle circle. within triangle



          //  Calculate edges

          var e1x = v2x - v1x;
        var e1y = v2y - v1y;

        var e2x = v3x - v2x;
        var e2y = v3y - v2y;

        var e3x = v1x - v3x;
        var e3y = v1y - v3y;


        // if (Math.sign(e2y * c2x - e2x * c2y) > 0 && Math.sign(e3y * c3x - e3x * c3y) > 0  && Math.sign(e1y * c1x - e1x * c1y) > 0) {

        //   circleHitting = true;
        //   centerHit = true;
        // } 

        let hiX = v1x += bulletSize;
        let hiY = v1y -= (bulletSize) * 1.732 - bulletSize;


        var c4x = circle.x - hiX;
        var c4y = circle.y - hiY;
        var c4sqr = c4x * c4x + c4y * c4y - radiusSqr;
        if (c4sqr <= 0) {
          circleHitting = true;
        } else // will do oppiset for circle in triangle

          //  TEST 3: Circle intersects edge

          var k = c1x * e1x + c1y * e1y;

        if (k > 0) {
          var len = e1x * e1x + e1y * e1y;

          if (k < len) {
            if (c1sqr * len <= k * k) {
              circleHitting = true;
            }
          }
        }

        //  Second edge
        k = c2x * e2x + c2y * e2y;

        if (k > 0) {
          len = e2x * e2x + e2y * e2y;

          if (k < len) {
            if (c2sqr * len <= k * k) {
              circleHitting = true;
            }
          }
        }
        //  Third edge
        k = c3x * e3x + c3y * e3y;

        if (k > 0) {
          var len = e3x * e3x + e3y * e3y;

          if (k < len) {
            if (c3sqr * len <= k * k) {
              circleHitting = true;
            }
          }
        }


        if (circleHitting == true) {
          // console.log(this.colls.length);
          for (var i = 0; i < this.colls.length; i++) {
            // console.log(circle.id);
// 0       colls 
// 0,1  0,2  circles    
            var projCheck2 = JSON.parse(JSON.stringify(circle.id))

    
      
              var projCheck = projCheck2.splice(0,this.colls[i].length);


       var collCheck = JSON.parse(JSON.stringify(this.colls[i])) 
           
          
            if(JSON.stringify(collCheck) == JSON.stringify(projCheck)) { // needed to check them stringifyed
              // console.log(collCheck,projCheck);
              run = false;
              break;
            }
          
          }

          if (run == true) {
            // console.log('circle hit');

            // need to find a way to id each circle so it remembers it and cannont hit same one twice

            // console.log(cornerHit,centerHit,sideHit);
            // for (var i=0; i<Projectiles.length;i++) {

            for (var i = 0; i < Circles.length; i++) {
         
              if (Circles[i].x == circle.x && Circles[i].y == circle.y && Circles[i].c == circle.c) {
          
                //  var newRbe = Circles[i].rbe-this.damage; 

                // x = 0,
                // y = 0,
                // r = 0,
                // c = '',
                // borderW = '',
                // borderC = '',
                // speed = 0,
                // numberCo = 0,
                // nextCo = 0,
                // height = 0,
                // rbe = 0,
                // health= 0,
                // distanceTraveled=0,
                // coll


                // console.log(this.x);
                var newCircle = [];

                for (var a = 0; a < nextCircle.length; a++) { //this is wrong
                  if (circle.c == nextCircle[a][0]) {
                    newCircle = nextCircle[a][1];
                    // console.log(newCircle);
                    break;
                  }
                }

                // for(var i =0; i <newCircle[0];i++) {
                // this.x = 'hi';
                // //  this.y = '';
                //  Projectiles = Projectiles.filter(item => item.x !== 'hi');
               
                if (newCircle[1] != 0) {
                  //  console.log('test');
                  this.colls.push(JSON.parse(JSON.stringify(Circles[i].id)));
                Circles[i].health = Circles[i].health - this.damage;
         
                  if(Circles[i].health <1) {

            
                  // console.log(Circles[i].id);
                  // // console.log(Circles[i]);
                  // console.log(this.colls);
                  var cirX = Circles[i].x;
                  var cirY = Circles[i].y;
                  var cirId = Circles[i].id;
                  var numCo = Circles[i].numberCo;
                  var nextCo = Circles[i].nextCo;
                  var speed = Circles[i].speed;
                  delete Circles[i];
                  Circles = Circles.filter(item => item !== undefined);
                  // console.log(newCircle);
                  // console.log(cirId);

                //  console.log(cirId);
                    addCircle2(cirX, cirY, numCo, nextCo, cirId, newCircle[1], newCircle[0], speed);
                  }
                    this.peirceR -=1;  

                  if(this.peirceR<1) {
                    this.x = 'hi';
                    Projectiles = Projectiles.filter(item => item.x !== 'hi');
                    this.peirceR = this.peirce;
                  }


                } else {
                  // console.log('fldksjfsdojfsdlfjsdofjsdlfjsdal;fjsdlfkjsdl;fj');
                  delete Circles[i];
                  Circles = Circles.filter(item => item !== undefined);

                  this.peirceR = this.peirceR - 1;  

                  if(this.peirceR<1) {
                    this.x = 'hi';
                    Projectiles = Projectiles.filter(item => item.x !== 'hi');
                    this.peirceR = this.peirce;
                  }   // this is repeeded might simplify
                }


              }
            }
          }
        }

      }, this);

    }



  } //end of move funtion








} //end of projectile class