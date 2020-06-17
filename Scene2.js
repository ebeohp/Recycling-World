class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){

        //this.add.bitmapText(20,20, "pixelFont", "Playing Game",20).setDepth(100);
        this.add.bitmapText(20,20, "pixelFont", "SCORE ", 30).setDepth(100);
        
        this.background=this.add.tileSprite(0,0,config.width, config.height, "sky");
        this.background.setOrigin(0,0);
       
        this.temp = this.physics.add.staticGroup();
        this.temp.create(400, 480, "platform").setScale(2).refreshBody();
        this.temp.create(400, 540, "platform").setScale(2).refreshBody();
        this.temp.create(400, 600, "platform").setScale(2).refreshBody();

        this.frog = this.physics.add.sprite(200,100, "frog");
        this.frog.body.gravity.y = 500;

        this.physics.add.collider(this.frog, this.temp);

        this.frog.setCollideWorldBounds(true).setScale(.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.obstacleGroup = this.physics.add.group();
        this.obsVelX = -150;
        let obstacleX = 800;
        for(let i = 0; i < 10; i++){
            let obstacle = this.obstacleGroup.create(obstacleX, 500, "obstacle");
            obstacle.setOrigin(0.5, 1).setScale(.6);
            obstacle.setImmovable(true);
            obstacleX += Phaser.Math.Between(450, 550);
        }
        
        this.numLives = 3; //add colliders that count
        this.lives = this.add.group();
        this.life1= this.lives.create(550, 50, "live");
        this.life2= this.lives.create(630, 50, "live");
        this.life3= this.lives.create(710, 50, "live");

        this.frogAcc = 5000;
        this.frogLeft = -200;
        this.frogRight = 200;

        this.time.addEvent({
            delay: 120000, //2minutes 120000
            callback: this.finish,
            callbackScope: this,
            loop: false
        });

        this.bgspeed = 0.5;

        this.time.addEvent({  
            delay: 10000, 
            callback: this.newItems, 
            callbackScope: this, 
            loop: true
        });
        
    }
    newItems(){
        var items = this.physics.add.group({
            key: "item", //items are not loading on screen for me
            repeat: 5,
            setXY: { x: 400, y: 0, stepX: 70 }
        });
        this.physics.add.collider(items, this.temp);
        this.physics.add.collider(items, this.obstacleGroup);
        
        items.children.iterate(function (child) {
            child.body.gravity.y = 500;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            if(child.x<0){
                child.destroy();
            }
        });
    }
    update(){
        this.obstacleGroup.setVelocityX(this.obsVelX);

        if(this.frog.body.touching.down)
        {
            this.frog.play("land"); 
            
            this.time.addEvent({  
                delay: 100, 
                callback: this.jump, 
                callbackScope: this, 
                loop: false
            });
        }else{
            this.frog.play("fly"); //figure out why cape anim not working
            if(this.cursors.down.isDown){
                this.frog.setAcceleration(0,this.frogAcc);
            }else{
                this.frog.setAcceleration(0,0);
            }
            if(this.cursors.left.isDown){
                this.frog.setVelocityX(this.frogLeft);   
            }else if(this.cursors.right.isDown){
                this.frog.setVelocityX(this.frogRight);
            }else{
                this.frog.setVelocityX(0);
            }
        }
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            if(obstacle.getBounds().right < 0){
                obstacle.x = this.getRightmostObstacle() + Phaser.Math.Between(200, 350);
            }
        }, this)
        
        this.background.tilePositionX+= this.bgspeed;

        this.physics.add.collider(this.frog, this.obstacleGroup, this.hurtPlayer, null, this);
        
        if(this.numLives==2){
            this.life1.play("dead");
        }else if(this.numLives==1){
            this.life2.play("dead");
        }else if (this.numLives==0){
            this.life3.play("dead");
        }else{
            this.life1.play("alive");
            this.life2.play("alive");
            this.life3.play("alive");
        } //add another else for when the lives hit 0 == game over
    }

    hurtPlayer(){
        if(this.frog.alpha <1){
            return;
        }
        this.frog.disableBody(true, true);

        this.time.addEvent({
            delay: 1000,
            callback: this.resetFrog,
            callbackScope: this,
            loop: false
        });
        this.numLives-=1;
        console.log(this.numLives);
        
    }
    resetFrog(){
        var x= 200;
        var y= -100;
        this.frog.enableBody(true, x,y,true,true);
        this.frog.alpha = 0.5;

        var tween = this.tweens.add({
            targets: this.frog,
            y: 200,
            ease: "Power1",
            duration: 3000,
            repeat: 0,
            onComplete: function(){
                this.frog.alpha = 1;
            },
            callbackScope: this
        });
    }
   
    jump(){
        this.frog.setAcceleration(0,-100);
        this.frog.setVelocityY(-600);
    }
    getRightmostObstacle(){ //retrieves the daisies from the edge
        let rightmostObstacle = 0;
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            rightmostObstacle = Math.max(rightmostObstacle, obstacle.x);
        });
        return rightmostObstacle;
    }
    finish(){
        this.obstacleGroup.clear(true,true);
        this.add.bitmapText(100,100, "pixelFont", "YOU'VE FINISHED!", 50);
        this.bgspeed = 0;

        this.bin = this.physics.add.sprite(500, 435,"bin");
        this.bin.setScale(2);
        this.bin.play("normal_anim");
        

        this.physics.add.overlap(this.frog, this.bin, this.fin, null, this);
        //this.scene.start("winGame");
    }
    fin(){
        this.frog.disableBody(true,true);
        this.bin.play("filled_anim");
        this.time.addEvent({
            delay: 1500,
            callback: this.win,
            callbackScope: this,
            loop: false
        });
     
    }
    win(){
        this.scene.start("winGame");
    }
    


}