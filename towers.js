class tower { //this will creawte circles which go around track
  constructor(
    x = 0,
    y = 0,
    attackSpeed = 0,
    coolDown = 0,
    pierce = 0,
    range = 0,
    damage = 0,
    color = '',
    bulletSpeed = 0,
    bulletSize = 0,
    bulletColor = '',
    targeting = '',
    poppingPower = 0,
    twerEffect = [0, 'none'],
    width = 0,
    height = 0,
    upgrades = [0, 0]

    
  ) {
    this.x = x;
    this.y = y;
    this.coolDown = coolDown;
    this.attackSpeed = attackSpeed;
    this.pierce = pierce;
    this.range = range;
    this.damage = damage;
    this.color = color;
    this.bulletSpeed = bulletSpeed,
      this.bulletSize = bulletSize;
    this.bulletColor = bulletColor;
    this.targeting = targeting;
    this.poppingPower = poppingPower;
    this.twerEffect = twerEffect;
    this.width = gridSize;
    this.height = gridSize;
    this.upgrades = [0, 0];
  }


  draw() {

    var {
      x,
      y,
      color,
      width,
      height
    } = this





    // ctx.save() //so doesnt save over other ones

    if (this.twerEffect[1] == 'roll') {
      if (this.twerEffect[3] == 1 || this.twerEffect[3] == 2) {
        this.twerEffect[0] -= 1;
        if (this.twerEffect[0] <= 0) {
          // let rand = JSON.stringify(Math.ceil(Math.random() * 6));
          color = eval('dice' + this.twerEffect[2] + 'Img');
          this.twerEffect[3] = 0;
          this.bulletColor = eval('bullet' + this.twerEffect[2]);
        } else {
          if (this.twerEffect[0] % this.twerEffect[4] == 0) {
              this.twerEffect[4] += 1;

            if (this.twerEffect[2] < 6) {
              color = eval('dice' + JSON.stringify(this.twerEffect[2] + 1) + 'Img');
              this.twerEffect[2]++;
            } else {
              color = eval('dice' + JSON.stringify(1) + 'Img');
              if(this.twerEffect[3] == 2) {
                this.twerEffect[2] = 3;
              } else {
                this.twerEffect[2] = 1;
              }
             
            }
          }
        }
        ctx.drawImage(eval('dice' + this.twerEffect[2] + 'Img'), x - gridSize / 2, y - gridSize / 2, width, height);
      } else {

        ctx.drawImage(eval('dice' + this.twerEffect[2] + 'Img'), x - gridSize / 2, y - gridSize / 2, width, height);
        this.range = randomDiceRange;
        this.attackSpeed = this.twerEffect[2] * 2;
        

        this.twerEffect[5] -=1;
        if(this.twerEffect[5] <= 0) {
        this.twerEffect[5] = randomDice[11][5];
        this.twerEffect[3] = 1;
        this.twerEffect[0] = randomDice[11][0];
        this.twerEffect[4] =(Math.floor(Math.random() * 12 + 6));
        this.range = 0;
        }
      } 
     } else if (color == 'fwImg') {
      // ctx.drawImage(bulletColor,x,y,bulletSize,bulletSize);
 
      ctx.drawImage(eval(color), x-gridSize/2,y-gridSize/2, width, height);
     }  else {
      ctx.fillStyle = color;
      ctx.fillRect(x-gridSize/2, y-gridSize/2, width, height);
    }

  }

} //end of tower class



