class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){

        this.add.bitmapText(20,20, "pixelFont", "Playing Game",20).setDepth(100);
      
        this.background=this.add.tileSprite(0,0,config.width, config.height, "sky");
        this.background.setOrigin(0,0);
       
        this.temp = this.physics.add.staticGroup();
        this.temp.create(400, 480, "platform").setScale(2).refreshBody();
        this.temp.create(400, 540, "platform").setScale(2).refreshBody();
        this.temp.create(400, 600, "platform").setScale(2).refreshBody();

        this.frog = this.physics.add.sprite(200,100);
        this.frog.body.gravity.y = 500;
        //this.frog.setImmovable(true);
        this.physics.add.collider(this.frog, this.temp);
        this.frog.setCollideWorldBounds(true).setScale(.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.obstacleGroup = this.physics.add.group();
        let obstacleX = 800;
        for(let i = 0; i < 10; i++){
            
            let obstacle = this.obstacleGroup.create(obstacleX, 500, "obstacle");
            obstacle.setOrigin(0.5, 1).setScale(.6);
            obstacle.setImmovable(true);
            obstacleX += Phaser.Math.Between(350, 450);
        }
        this.obstacleGroup.setVelocityX(-150);
        
        this.numLives = 3; //add colliders that count
        this.lives = this.add.group();
        //let lifeX = 550;
        /*for(let i = 0; i < 3; i++){
            let life = this.lives.create(lifeX, 50, "live");
            life.play("alive");
            lifeX+=80;
        }*/
        this.life1= this.lives.create(550, 50, "live");
        this.life2= this.lives.create(630, 50, "live");
        this.life3= this.lives.create(710, 50, "live");
    }
    update(){
        if(this.frog.body.touching.down)
        {
            this.frog.play("land"); 
            
            var timedEvent = this.time.addEvent({  
                delay: 100, 
                callback: this.onEvent, 
                callbackScope: this, 
                loop: false
            });
        }else{
            this.frog.play("fly"); //figure out why cape anim not working
            if(this.cursors.down.isDown){
                this.frog.setAcceleration(0,5000);
            }else{
                this.frog.setAcceleration(0,0);
            }
            if(this.cursors.left.isDown){
                this.frog.setVelocityX(-200);   
            }else if(this.cursors.right.isDown){
                this.frog.setVelocityX(200);
            }else{
                this.frog.setVelocityX(0);
            }
        }


        this.obstacleGroup.getChildren().forEach(function(obstacle){
            if(obstacle.getBounds().right < 0){
                obstacle.x = this.getRightmostObstacle() + Phaser.Math.Between(200, 350);
            }
        }, this)
        
        this.background.tilePositionX+= 0.5;

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
            callback: this.resetPos,
            callbackScope: this,
            loop: false
        });
        this.numLives-=1;
        console.log(this.numLives);
        
    }
    resetPos(){
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
   
    onEvent(){
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


}