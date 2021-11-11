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
    height = 0,
    rbe = 0,
    health = 0,
    id = 0,
    effects = [0, 'none'],
    hit = 0,
    distanceTraveled = 0,
    nextCo = 0,
    hitPs = [],
    type = ''
  ) {

    this.x = Number(x);
    this.y = Number(y);
    this.r = Number(r); //makes all numbers incase mistype
    this.c = c;
    this.borderW = borderW;
    this.borderC = borderC;
    this.speed = speed;
    this.numberCo = numberCo;
    this.height = Number(height);
    this.rbe = rbe;
    this.health = health; //order might be wrong causing health to be defautlt value
    this.id = id;
    this.effects = effects;
    this.hit = hit;
    this.distanceTraveled = distanceTraveled;
    this.nextCo = [currentTrack[numberCo][0], currentTrack[numberCo][1]];
    this.hitPs = hitPs;
    this.type = type;
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

    ctx.save() //so doesnt save over other ones/ safer

    drawCircle(x, y, r, c, borderW, borderC)
    ctx.restore()
  }

  followTrack() { // might add followTrack(i) if i have time


    if (((this.effects[1] == 'slow' || this.effects[1] == 'slow2' || this.effects[1] == 'snowBall') && this.rbe <= 104)) {
      if (this.effects[1] == 'slow') {
        var speed = this.speed * 0.5;
      } else if (this.effects[1] == 'slow2' || this.effects[1] == 'snowBall') {
        var speed = this.speed * 0.1;
      }

      this.effects[0] -= 1; /// this is changing tower effects for some reason
      if (this.effects[0] <= 0) {
        this.effects = [0, 'none'];

      }
    } else {
      if (this.effects[1] == 'acidEffect') {
        var speed = this.speed * 0.4;
      } else {
        var speed = this.speed;
      }
    }

    // }
    // if(this.effects[1] != 'none') {
    //   this.effects[0] -= 1; // this lowers cooldown of all effects
    // }

    if (this.x > this.nextCo[0] + speed || this.x < this.nextCo[0] - speed || this.y < this.nextCo[1] - speed || this.y > this.nextCo[1] + speed) {
      //above checks that circle is not at next point
      this.distanceTraveled += speed;

      if (this.x - this.nextCo[0] < -speed) {
        this.x += speed;
      } else if (this.x - this.nextCo[0] > speed) {
        this.x -= speed;
      }

      if (this.y - this.nextCo[1] < -(speed)) {
        this.y += speed;
      } else if (this.y - this.nextCo[1] > speed) {
        this.y -= speed;
      }

    } else {
      if (this.numberCo == currentTrack.length - 1) {
        circleMissing = true;
        //  console.log (this);
        for (var i = 0; i < Circles.length; i++) {
          if (Circles[i].x == this.x && Circles[i].y == this.y && Circles[i].c == this.c) {

            lifes -= this.rbe;
            if(lifes<= 0) {
              gameActive = false;
              gameLost = true;
            }
            //check for lvies to be 0 and end game
            delete Circles[i];
            Circles = Circles.filter(item => item !== undefined);
          }
        }

      } else {
        this.numberCo += 1;
        this.nextCo = [currentTrack[this.numberCo][0], currentTrack[this.numberCo][1]];
      }
    }

    if (this.effects[1] == 'fireEffect' || this.effects[1] == 'acidEffect'||this.effects[1] == 'fireEffect2') {
      this.effects[0] -= 1;
      //  if(this.effects[3] <= 0) {
      //    this.effects = [0,'none'];
      //  }  else {
      if (this.effects[0] <= 0) {
        //burn basec of this.effects[2]


         this.health -= eval(this.effects[1] + 'Damage');
        
        
          if(this.health <= 0 ) {

        
        var newCircle = [];
        for (var a = 0; a < nextCircle.length; a++) { // todotdot make it so if damdge makes it zero that it reruns this code with remaining poppoiwer still usging daamdge.
          if (this.c == nextCircle[a][0]) {
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

        if (newCircle[1] != 0) {

          this.health -= this.health * this.effects[2]; //thsi.effezxtp[2] is popPower of burneffect
          //  hitCheck();

          if (this.health <= 0) {
            // console.log(this.id);
            // // console.log(this);
            // console.log(this.colls);
            var cirX = this.x;
            var cirY = this.y;
            var cirId = this.id;
            var numCo = this.numberCo;
            var nextCo = this.nextCo;
            var speed = this.speed;
            var iForgotTHisGrr = this.distanceTraveled;
            var typee = this.type;
            // will need to reset the effect timer; effexts [1]
            this.x = 'hi';
            Circles = Circles.filter(item => item.x !== 'hi');
            // for loop into this
            // this.effects[3] -= 1; // check
            // console.log(this.effects[3]);
         
            if (this.effects[3] <= 0) {             
              addCircle2(cirX, cirY, numCo, nextCo, cirId, newCircle[1], newCircle[0], speed, iForgotTHisGrr, [0, 'none'],typee);
        // will have tochange based of pop power and damdg doen and if it popped moab or cermcac somewehre
            } else { // buged something around here
              // console.log(eval(this.effects[1])[0]);
       
              addCircle2(cirX, cirY, numCo, nextCo, cirId, newCircle[1], newCircle[0], speed, iForgotTHisGrr, [eval(this.effects[1])[0], this.effects[1], this.effects[2], this.effects[3] - 1],typee);
            }
          }
        } else {

          this.x = 'hi';
          Circles = Circles.filter(item => item.x !== 'hi');

   
        }
        // to damage of this.effects [3] //todo
        // }
      }
    } // end of fireEffect


     if(this.type[1] == 'regen' && this.type[2] > this.rbe) { // this chekcs to make sure that any regen circle can not regen above their starting health

          this.type[0] -=1;
          if(this.type[0] <= 0) {
                  

        for (var a =0; a < nextRegen.length; a++) { // todotdot make it so if damdge makes it zero that it reruns this code with remaining poppoiwer still usging daamdge.
          if (this.c == nextRegen[a][0]) {
            var   newCircle = nextRegen[a][1];
            this.type[0] = JSON.parse(JSON.stringify(regenSpeed));
      
            addCircle2(this.x, this.y, this.numberCo, this.nextCo, this.id, newCircle[1], newCircle[0], this.speed, 123123, JSON.parse(JSON.stringify(this.effects)),this.type);
            
             this.x = 'hi';
            Circles = Circles.filter(item => item.x !== 'hi');
          }
          }


        }


        }  //end of regen 





      }

  } // end of followTrack()


} // end of circle classs