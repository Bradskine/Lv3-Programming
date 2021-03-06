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
    maxRange = 0,
    popPower = 0,
    effect = [0, 'none'],
    id = 0,
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
    this.maxRange = maxRange;
    this.popPower = popPower;
    this.effect = effect;
    this.id = id;
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

    if (this.effect[1] == 'grenade' || this.effect[1] == 'shotNade' || this.effect[1] == 'snowBall' || this.effect[1] == 'acidEffect' || this.effect[1] == 'roll') {
      ctx.save(); //so doesnt save over other ones/ safer

      if(this.effect[1] == 'roll') {
        
        ctx.drawImage(bulletColor,x,y,bulletSize,bulletSize);
      } else {
      drawCircle(x, y, bulletSize, bulletColor, 0.0000001, bulletColor);
      }
      ctx.restore();
    } else {


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
  }



  move(n) {
  
  

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



    this.maxRange -= this.bulletSpeed * n; // might neeed change for grenade curve
    if (this.maxRange < 0) {
      // this.hitCheck();
      if (this.effect[1] == 'water') {
        // console.log('fsdf');
        // this.waterBounce()
        this.hitCheck();
        this.deleteProjecitle();
      } else {
        this.hitCheck();
        this.deleteProjecitle();
        // if this.,effecst [1] == water wil bounce and lower effecds 2
      }
    }

    if (n == 1) {
      if (this.x + this.bulletSize * 2 < 0 || this.x > canvas.width || this.y - this.bulletSize * 2 * Math.cos(Math.PI / 6) > canvas.height || this.y < 0) {
        // this.hitCheck();
        if (this.effect[1] == 'water' && this.effect[0] != 'acidPit') {
          this.waterBounce();
          // this.deleteProjecitle();
        } else {
          this.deleteProjecitle();
          // if this.,effecst [1] == water wil bounce and lower effecds 2
        }
      }

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

          for (var i = 0; i < this.colls.length; i++) {
            var projCheck2 = JSON.parse(JSON.stringify(circle.id))
            // might have to redo below to fix projectile bounce bug where array length changes
            var projCheck = projCheck2.splice(0, this.colls[i].length);

            var collCheck = JSON.parse(JSON.stringify(this.colls[i]))


            if (JSON.stringify(collCheck) == JSON.stringify(projCheck)) { // needed to check them stringifyed
              // console.log(collCheck,projCheck);
              run = false;
              if(this.effect[1] == 'acidPit')
              circle.effects = JSON.parse(JSON.stringify(this.effect));

              break;
            }
          }
          if (run == true) {
            if (circle.c == 'rgb(105,105,105,1)' || (circle.c == 'rgb(255,255,255,1)' && (this.effect[1] == 'slow' || this.effect[1] == 'slow2' || this.effect[1] == 'snowBall'))) { // wll need to hcange to zebra image later
              run = false;
              if (this.effect[1] == 'water') {
                this.colls.push(JSON.parse(JSON.stringify(Circles[i].id)));
                this.waterBounce(); //todo need to put before addcircle 2
              } else {
                if (circle.c != 'rgb(255,255,255,1)') {
                  this.deleteProjecitle();
                }
                // circle.effects = JSON.parse(JSON.stringify(this.effect));
              }
            }

          }

          if (run == true) { // run will be true if projectile is normal and doesnt have effects that were check for above
            if(this.effect[6] == 'critChance') {
              if(Math.random() < 0.3) {
                this.popPower *= 5;
              }
          
            } 
            
            if (this.effect[6] == 'megaCrit') {
              if(Math.random() < 0.05) {
                  this.popPower = 99;
                  this.damage = 9999999;
        
              }
            } 
            
    

            for (var i = 0; i < Circles.length; i++) {
              if (Circles[i].x == circle.x && Circles[i].y == circle.y && Circles[i].c == circle.c) {
                var newCircle = [];

                for (var a = 0; a < nextCircle.length; a++) { 

                  if (circle.c == nextCircle[a][0]) {
                    if (a > 10) {
                      newCircle = nextCircle[a][1];
                    } else {
                     
                      newCircle = nextCircle[a][1];
                      if (this.popPower > 1) {
                        for (var j = 0; j < this.popPower - 1; j++) {
                       
                          for (var g = 0; g < nextCircle.length; g++) {

                            if (JSON.stringify(newCircle[1]) == JSON.stringify(nextCircleNames[g][0])) {
                              newCircle = nextCircle[g][1];
                          money += 1;
                    
                            }
                          }

                        }
                      } else {
                        money += 1;
                      }
                      // console.log(newCircle);
                      break;
                    }
                  }
                }



                if (newCircle[1] != 0) {

                    //checks if bullet has crit or extra damdge chance abilitys
                
                  this.colls.push(JSON.parse(JSON.stringify(Circles[i].id)));
                  Circles[i].health = Circles[i].health - (this.damage * this.popPower);
                  let hitPsCheck = false;
                  // this.hitCheck();
                  if (Circles[i].health < 1) {


                    // console.log(Circles[i].id);
                    // // console.log(Circles[i]);
                    // console.log(this.colls);
                    var cirX = Circles[i].x;
                    var cirY = Circles[i].y;
                    var cirId = Circles[i].id;
                    var numCo = Circles[i].numberCo;
                    var nextCo = Circles[i].nextCo;
                    var speed = Circles[i].speed;
                    var distanceTraveled = Circles[i].distanceTraveled;
                    var type = Circles[i].type;
                    delete Circles[i];
                    Circles = Circles.filter(item => item !== undefined);
                    addCircle2(cirX, cirY, numCo, nextCo, cirId, (newCircle[1]), newCircle[0], speed, distanceTraveled, JSON.parse(JSON.stringify(this.effect)),type);
                  } else {
                    // Circles[i].effects[0] = this.effect[0];
                    // Circles[i].effects[1] = this.effect[1];
                    Circles[i].effects = JSON.parse(JSON.stringify(this.effect));
                  }

                  this.peirceR -= 1; // jneed to do stuff to this
                  this.hitCheck();
                  if (this.effect[1] == 'water') {
                    this.waterBounce(); //todo need to put before addcircle 2
                  } else if (this.peirceR < 1) {
                    this.deleteProjecitle();
                  }


                } else {
                   

                  delete Circles[i];
                  Circles = Circles.filter(item => item !== undefined);

                  this.peirceR = this.peirceR - 1;
                  this.hitCheck();
                  if (this.effect[1] == 'water') {
                    this.waterBounce(); //need to also pu above before deleets circle
                  } else if (this.peirceR < 1) {
                      this.deleteProjecitle();
                    // if this.,effecst [1] == water wil bounce and lower effecds 2
                  }
              }


              }
            }
          }
        }

      }, this);
    }

  } //end of move funtion






  moveTest(n) {

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



    this.maxRange -= this.bulletSpeed * n; // might neeed change for grenade curve
    if (this.maxRange < 0) {
      // this.hitCheck();
      this.deleteProjecitle();

    }


    if (this.x + this.bulletSize * 2 < 0 || this.x > canvas.width || this.y - this.bulletSize * 2 * Math.cos(Math.PI / 6) > canvas.height || this.y < 0) {
      // this.hitCheck();
      // this.waterBounce();
      this.deleteProjecitle();
      // if this.,effecst [1] == water wil bounce and lower effecds 2
    }

 }


  waterBounce() {
//water bounce stops getting callled. // tododododworkinongogngon

    if (this.effect[0] > 0) {

      
      var bounce = this.newAngle();
    if(bounce !== undefined) {
    
      this.directionX = bounce[0];
      this.directionY = bounce[1];
      this.gradient = bounce[2];
      this.maxRange = this.effect[2];
  
      this.effect[0] -= 1;
    } else {
      // this.hitCheck();
      this.x = 'hi';
      Projectiles = Projectiles.filter(item => item.x !== 'hi');
    }
  } else {
    this.x = 'hi';
    Projectiles = Projectiles.filter(item => item.x !== 'hi');
  }
  } //end of waterBounce()


  newAngle() { //retruns [newdirecxtions,newdirectiony,and new gradient]
    var dTraveledCircles = JSON.parse(JSON.stringify(Circles));

    // sortCircles(dTraveledCircles, 0);
    dTraveledCircles.sort(function (a, b) {
      var A = a.distanceTraveled;
      var B = b.distanceTraveled;
      var targetN = 1;
      let AB = a.hit;
      let BB = b.hit;
      if (AB < BB) {
        return -1;
      } else if (AB > BB) {
        return +1;
      } else if (AB == BB) {
        if (A < B) {
          return +1 * targetN;
        } else if (A > B) {
          return -1 * targetN;
        } else if (A == B) {
          return 0;
        }
      }
    });
    var pass = true;
    for (var y = 0; y < dTraveledCircles.length; y++) {
      pass = true;
      circleMissing = false;

      if ((dTraveledCircles[y].x > this.x - waterEffect[2] &&
          dTraveledCircles[y].x < this.x + waterEffect[2]) //x range
        &&
        (dTraveledCircles[y].y > this.y - waterEffect[2] &&
          dTraveledCircles[y].y < this.y + waterEffect[2])) { //y range
        // Projectiles.push(new projectile(this.x,this.y,tower.pierce,tower.damage,this.bulletSize,tower.bulletSpeed,tower.bulletColor));
        //todododo am testing thing above;
        //need to change if stament above to fit
        var rad = 180 / Math.PI;
        //preditoin for circle   <+<+<=<=,+,=<==,,=
        var gradient = (Math.atan((dTraveledCircles[y].y - this.y) / (
          dTraveledCircles[y]
          .x - this.x)));
        if (dTraveledCircles[y].x - dTraveledCircles[y].speed > this.x) { ///this is to find which direction it is traveling in will repeat later / add to the for loop below
          var directionX = 'right';
        } else if (dTraveledCircles[y].x + dTraveledCircles[y].speed < this.x) {
          var directionX = 'left';
        } else {
          var directionX = 'horizontal';
        }
        if (dTraveledCircles[y].y - dTraveledCircles[y].speed > this.y) {
          var directionY = 'down';
        } else if (dTraveledCircles[y].y + dTraveledCircles[y].speed < this.y) {
          var directionY = 'up'; //somehting wrong with direciotns
        } else {
          var directionY = 'verticle';
        }
        var testProjectile = new projectile(this.x, this.y, this.pierce, this.damage, this.bulletSize, this.bulletSpeed, this.bulletColor,
          directionX, directionY,
          gradient, waterEffect[2], this.popPower, this.effect);

        var testCircle = new circle(dTraveledCircles[y].x, dTraveledCircles[y].y,
          dTraveledCircles[y].r, '',
          dTraveledCircles[y].borderW, '', dTraveledCircles[y].speed,
          dTraveledCircles[y].numberCo, dTraveledCircles[y].nextCo,
          dTraveledCircles[y].rbe, dTraveledCircles.health, dTraveledCircles[y]
          .effects
        ); // am making a clone
        //need to test if this owrks

        for (var a = 2000; a > 0; a--) {
          // console.log('count');

          gradient = (Math.atan((testCircle.y - this.y) / (testCircle.x - this.x)));

          if (testCircle.x - testCircle.speed > this.x) { ///this is to find which direction it is traveling in will repeat later / add to the for loop below
            directionX = 'right';
          } else if (testCircle.x + testCircle.speed < this.x) {
            directionX = 'left';
          } else {
            directionX = 'horizontal';
          }

          if (testCircle.y - testCircle.speed > this.y) {
            directionY = 'down';
          } else if (testCircle.y + testCircle.speed < this.y) {
            directionY = 'up'; //somehting wrong with direciotns
          } else {
            directionY = 'verticle';
          }
          testProjectile = new projectile(this.x, this.y, this.pierce, this.damage, this.bulletSize, this.bulletSpeed, this.bulletColor,
            directionX, directionY,
            gradient, waterEffect[2], this.popPower, this.effect);

          var count = 2001 - a;


          testProjectile.moveTest(count);

          testCircle.followTrack();
          if ((testCircle.x > this.x - waterEffect[2] &&
              testCircle.x <
              this.x +
              waterEffect[2]) //x range
            &&
            (testCircle.y > this.y - waterEffect[2] &&
              testCircle
              .y < this.y +
              waterEffect[2])) {
            // cant be bo0ther re weriritiengdfgjdff
          } else {
            circleMissing = true;
          }


          if ((testProjectile.x <= testCircle.x + 4 && testProjectile.x >=
              testCircle
              .x - 4) &&
            (testProjectile.y <= testCircle.y + 4 && testProjectile.y >=
              testCircle
              .y -
              4)) {
            a = 0;
          } else if (circleMissing) {
            a = 0;
          }

          for (var i = 0; i < this.colls.length; i++) {
            var projCheck2 = JSON.parse(JSON.stringify(dTraveledCircles[y].id));
            var projCheck = projCheck2.splice(0, this.colls[i].length);

            var collCheck = JSON.parse(JSON.stringify(this.colls[i]));

            if (JSON.stringify(collCheck) == JSON.stringify(projCheck)) { // needed to check them stringifyed
              // console.log(collCheck,projCheck);
              pass = false;

              // dTraveledCircles[y].effects = JSON.parse(JSON.stringify(this.effect));
              break;
            }
          }



          if (pass) {

            for (var x = 0; x < Circles.length; x++) { //finds actual existing circle to say that its getting hit so muitople projectiles dont target it
              // var a = dTraveledCircles[y].id;
              // var b = Circles[x].id;
              if (JSON.stringify(Circles[x].id) == JSON.stringify(dTraveledCircles[y].id)) {
                Circles[x].hit += 1;
                Circles[x].hitPs.push(Projectiles[Projectiles.length - 1].id);
              }
            }
          }

        } // end of dtrav
        if (circleMissing == false) { // todo todo todo ofjdsofjsdf havent made it chekc hit colliosns and so targets same stuff muitlplie times not here but when it hits

          if (pass == true) {


            this.directionX = directionX;
            this.directionY = directionY;
            this.gradient = gradient;
            this.maxRange = this.effect[2];
            return [directionX, directionY, gradient];
          } //end of if(Pass)

        } else { // if circle missing
          //will reset loop and target the next circle .. may cause lag not sure
        }
      }

    } // end of targeint loop for each projectile targeted
  } // end of get angle



  hitCheck() { ///checks if inted target was hit oterewise removes hit from circle
    for (var a = 0; a < Circles.length; a++) {
      for (var b = 0; b < Circles[a].hitPs.length; b++) {
        33
        if (JSON.stringify(Circles[a].hitPs[b]) == JSON.stringify(this.id)) {
          delete Circles[a].hitPs[b];
          Circles[a].hitPs = Circles[a].hitPs.filter(function (item) {
            return item != null;
          });
          Circles[a].hit -= 1;
        }
      }
    }
  }


  animateExplosion(xa, ya) {

    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.font = "50px Arial";
    // ctx.fillStyle = "green";

    /* Writes the required text  */
    // ctx.fillText("GFG", 500, 350)
    let particles = [];

    /* Initialize particle object  */
    class Particle {
      constructor(radius, dx, dy, t) {
        this.x = xa;
        this.y = ya;
        this.radius = radius / 1.3;
        this.dx = dx;
        this.dy = dy;
        this.alpha = t;

        let rand = Math.random();
        if (rand <= 0.4) {
          this.colour = 'orange';
        } else if (rand <= 0.8) {
          this.colour = 'red';
        } else if (rand <= 0.9) {
          this.colour = 'yellow';
        } else {
          this.colour = 'black';
        }

      }
      draw() {
        ctx.save();



        ctx.globalAlpha = this.alpha;

        ctx.fillStyle = this.colour;



        /* Begins or reset the path for 
           the arc created */
        ctx.beginPath();

        /* Some curve is created*/
        ctx.arc(this.x, this.y, this.radius,
          0, Math.PI * 2, false);

        ctx.fill();

        /* Restore the recent canvas context*/
        ctx.restore();
      }
    

      update() {
        this.draw();
        this.alpha -= explosionRadius / 20;
        this.x += this.dx;
        this.y += this.dy;
      }
    }

    /* Timer is set for particle push 
        execution in intervals*/

    for (i = 0; i <= 150; i++) {
      let dx = explosionRadius / 60 * (Math.random() - 0.5) * (Math.random() * 6);
      let dy = explosionRadius / 60 * (Math.random() - 0.5) * (Math.random() * 6);
      // max speed = explosion radius / 7
      let radius = Math.random() * gridSize / 3;


      // if(dx < dy) {
      //   var a = dx;
      // }  else {
      //   var a = dy;
      // }

      (explosionRadius / dx)

      let particle = new Particle(radius, dx, dy, explosionRadius);

      /* Adds new items like particle*/
      particles.push(particle);
    }
    explode();


    /* Particle explosion function */
    function explode() {

      particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
          particles.splice(i, 1);
        } else particle.update()
      })

      /* Performs a animation after request*/
      requestAnimationFrame(explode);
    }


  } // end of animate explsoin




  deleteProjecitle() { //intentinal spelling error of for sure(hidden meaning):

    if (this.effect[1] == 'grenade' || this.effect[1] == 'shotNade') {

      this.animateExplosion(this.x, this.y);
      // each circle is touching imanegary exposin radius
      var pass = true;
      let maxHit = 0;
      Circles.forEach(function (circle) {
        // let explosionRadius = gridSize * 3; //tpdp // draw
 
          if ((circle.c == 'rgb(0,0,0,1)' || circle.c == 'rgb(0,1,0,1)') && circle.rbe < 21) { // black and zebra
            pass = false;
            
            // this.deleteProjecitle();
          } else {
            pass = true;
          }

    

        if (pass == true) {

          if (circle.x + circle.r > this.x - explosionRadius && circle.x - circle.r < this.x + explosionRadius &&
            circle.y + circle.r > this.y - explosionRadius && circle.y - circle.r < this.y + explosionRadius) {

            // need to somehow change thing above to a funciton that I use here but not sure hwo I can do that


            for (var i = 0; i < Circles.length; i++) {
              if (Circles[i].x == circle.x && Circles[i].y == circle.y && Circles[i].c == circle.c) {
                var newCircle = [];
                for (var a = 0; a < nextCircle.length; a++) { //this is right//will have to change al this to base it of popping poiewr tododododod todo
                  if (circle.c == nextCircle[a][0]) {
                    if (a > 10) {
                      newCircle = nextCircle[a][1];
                    } else {

                      newCircle = nextCircle[a][1];
                      if (this.popPower > 1) {
                        for (var j = 0; j < this.popPower - 1; j++) {

                          for (var g = 0; g < nextCircle.length; g++) {

                            if (JSON.stringify(newCircle[1]) == JSON.stringify(nextCircleNames[g][0])) {
                              newCircle = nextCircle[g][1];
                            }
                          }

                        }
                      }
                      // console.log(newCircle);
                      break;
                    }
                  }
                }



                if (newCircle[1] !== 0) {
                  this.colls.push(JSON.parse(JSON.stringify(Circles[i].id)));
                  Circles[i].health = Circles[i].health - explosionDamage * this.popPower;
                  let hitPsCheck = false;
                  // this.hitCheck();
                  if (Circles[i].health < 1) {
                    // console.log(Circles[i].id);
                    // // console.log(Circles[i]);
                    // console.log(this.colls);
                    var cirX = Circles[i].x;
                    var cirY = Circles[i].y;
                    var cirId = Circles[i].id;
                    var numCo = Circles[i].numberCo;
                    var nextCo = Circles[i].nextCo;
                    var speed = Circles[i].speed;
                    var classs = Circles[i].type;
                    var distanceTraveled = Circles[i].distanceTraveled;
                    delete Circles[i];
                    Circles = Circles.filter(item => item !== undefined);
                  
                    addCircle2(cirX, cirY, numCo, nextCo, cirId, newCircle[1], newCircle[0], speed, 123123, JSON.parse(JSON.stringify(this.effect)),classs);
                  } else {
                    // Circles[i].effects[0] = this.effect[0];
                    // Circles[i].effects[1] = this.effect[1];

                    Circles[i].effects = JSON.parse(JSON.stringify(this.effect));
                  }


                } else {
                  // this.hitCheck();
                  delete Circles[i];
                  Circles = Circles.filter(item => item !== undefined);
                }
              }
            }
            maxHit += 1;
            if (grenadeMaxHit - maxHit <= 0) {
              pass = false;
            }
          }
        }
      }, this);

    }
    // this.hitCheck();

    this.x = 'hi';
    Projectiles = Projectiles.filter(item => item.x !== 'hi');


    //
  } // end of delete projectile


} //end of projectile class