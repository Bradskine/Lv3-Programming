class circle { //this will creawte circles which go around track

  constructor(
    x = 0,
    y = 0,
    r = 0,
    c = '',
    borderW = '',
    borderC   ='',   
    speed = 0,
    numberCo = 0,
    height = 0, 
    rbe = 0,
    health = 0,
    id = 0,
    effects =[0,'none'],
    distanceTraveled=0,
    nextCo = 0,
    hit = 0,
    hitPs = [],
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
    this.health = health;  //order might be wrong causing health to be defautlt value
    this.id = id; 
    this.effects = effects;
    this.distanceTraveled=0;
    this.nextCo = [currentTrack[numberCo][0], currentTrack[numberCo][1]];
    this.hit = hit;
    this.hitPs = hitPs;
  }


  get area() { //this is incase i want to compare circles and know whcih one
    // is bigger to put smaller one on top for visual clarity
    return this.radius ^ 2 * Math.PI;
  }
  //might a make a shorcut fucniotn thing for each circle type



  
  draw() {

    var {x,y,r,c,borderW,borderC,} = this

    ctx.save() //so doesnt save over other ones

    drawCircle(x, y, r, c, borderW, borderC)
    ctx.restore()
  }

  followTrack() { // might add followTrack(i) if i have time


   
       if((this.effects[1] =='slow'|| this.effects[1] == 'slow2')&& this.rbe<=104) {
         if(this.effects[1] == 'slow') {
          var speed = this.speed *0.5;
         }  else if (this.effects[1] == 'slow2') {
           var speed = this.speed*0.3;
         }
        
        // this.effects[0] = this.effects[0] -  1;
        for (var i=0; i<Circles.length;i++) {
          if(Circles[i].x == this.x &&Circles[i].y == this.y&& Circles[i].c == this.c) {
            
              Circles[i].effects[0] -= 1;
              if (Circles[i].effects[0] <=0) {
                Circles[i].effects = [0,'none'];
              }
          }
        }

      }    else {
        var speed = this.speed;
      }

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
      if(this.numberCo ==currentTrack.length-1) {
        circleMissing = true;
        //  console.log (this);
     for (var i=0; i<Circles.length;i++) {
       if(Circles[i].x == this.x &&Circles[i].y == this.y&& Circles[i].c == this.c) {
         
         lifes -= this.rbe;
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



    
  }


   
  



} // end of circle classs