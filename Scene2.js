/*
class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
        this.playing = true;
        this.collect = this.sound.add("collect");
        this.music = this.sound.add("music");
        this.loss = this.sound.add("oof");
        this.music.play();
        this.scoreLabel = this.add.bitmapText(20,20, "pixelFont", "SCORE ", 30).setDepth(100);
        this.score = 0;

        this.background=this.add.tileSprite(0,0,config.width, config.height, "sky");
        this.background.setOrigin(0,0);
        this.bgspeed = 0.5;
       
        this.temp = this.physics.add.staticGroup();
        this.temp.create(400, 480, "platform").setScale(2).refreshBody();
        this.temp.create(400, 540, "platform").setScale(2).refreshBody();
        this.temp.create(400, 600, "platform").setScale(2).refreshBody();

        this.numLives = 3; //add colliders that count
        this.lives = this.add.group();
        this.life1= this.lives.create(550, 50, "live");
        this.life2= this.lives.create(630, 50, "live");
        this.life3= this.lives.create(710, 50, "live");

        this.frog = this.physics.add.sprite(200,100, "frog");
        this.frog.body.gravity.y = 500;
        this.physics.add.collider(this.frog, this.temp);
        this.frog.setCollideWorldBounds(true).setScale(.5);
        this.frogAcc = 5000;
        this.frogLeft = -200;
        this.frogRight = 200;

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.obstacleGroup = this.physics.add.group();
        this.obsVelX = -150;
        let obstacleX = 700;
        for(let i = 0; i < 10; i++){
            let obstacle = this.obstacleGroup.create(obstacleX, 450, "obstacle");
            obstacle.setOrigin(0.5, 1).setScale(.6);
            obstacle.setImmovable(true).setScale(.3);
            obstacleX += Phaser.Math.Between(450, 550);
        }

        this.time.addEvent({
            delay: 60000, //1 min 60000 adjust prog and this to 1:30 min
            callback: this.finish,
            callbackScope: this,
            loop: false
        });
        this.progbar = this.add.sprite(300,30,"bar");
        this.progbar.setScale(1.5);
   
        this.anims.create({
            key: "prog_anim",
            frames: this.anims.generateFrameNumbers("bar"),
            frameRate: .8
        }); 
        this.progbar.play("prog_anim");

        this.bgspeed = 0.5;

        this.time.addEvent({  
            delay: 5000, 
            callback: this.newItems, 
            callbackScope: this, 
            loop: true
        });
    }
    newItems(){
        if(this.playing){
            this.items = this.physics.add.group({

                key: "item", 
                frame: [0,1,2,3,4,5,6,7,8,9,10],
                repeat: 12, 
                randomFrame: true,
                setXY: { x: 250, y: 0, stepX: Phaser.Math.Between(50, 150)}
            });
            this.physics.add.collider(this.items, this.temp);
            this.physics.add.collider(this.items, this.obstacleGroup);
  
            if(this.items.x<0){
                this.items.destroy();
            }
            this.items.children.iterate(function (child) {
                child.body.gravity.y = Phaser.Math.FloatBetween(300, 600);
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
            });
            this.physics.add.overlap(this.frog, this.items, this.collectItem, null, this);
        }
    }
   
    collectItem(player, item){
        this.collect.play();
        item.disableBody(true, true);
        
        //  Add and update the score
        this.score += 1;
        this.scoreLabel.text = "SCORE " + this.score;
        
        if (this.items.countActive(true) == 0){
            //  A new batch of stars to collect
        this.items.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

           });
        }

       
    }
    update(){ //i want to add a progress bar.
        this.obstacleGroup.setVelocityX(this.obsVelX); //needed
        this.background.tilePositionX+= this.bgspeed;
        
        

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
        
        this.physics.add.collider(this.frog, this.obstacleGroup, this.hurtPlayer, null, this);
        
        if(this.numLives==2 ){
       
            this.life1.play("dead");
        }else if(this.numLives==1){
          
            this.life2.play("dead");
        }else if (this.numLives==0){
           
            this.life3.play("dead");
        }else if(this.numLives==3){
            this.life1.play("alive");
            this.life2.play("alive");
            this.life3.play("alive");
        }else{
            this.music.stop();
            this.over();
        }
        //add another else for when the lives hit 0 == game over
    }
    
    hurtPlayer(){
        this.loss.play();
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
            duration: 2000,
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
        this.playing = false;
        this.obstacleGroup.clear(true,true);
     
        this.add.bitmapText(100,100, "pixelFont", "YOU'VE FINISHED!", 50);
        this.bgspeed = 0;

        this.bin = this.physics.add.sprite(500, 435,"bin");
        this.bin.setScale(2);
        this.bin.play("normal_anim");

        this.physics.add.overlap(this.frog, this.bin, this.fin, null, this);
    
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
        this.music.stop();
        this.scene.start("winGame", {Score: this.score, Lives: this.numLives});
    }
    over(){
        this.scene.start("endGame");
    }
    
*/

class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
        this.playing = true;
        this.collect = this.sound.add("collect");
        this.music = this.sound.add("music");
        this.loss = this.sound.add("oof");
        this.music.play();
        this.scoreLabel = this.add.bitmapText(20,20, "pixelFont", "SCORE ", 30).setDepth(100);
        this.score = 0;

        this.background=this.add.tileSprite(0,0,config.width, config.height, "sky");
        this.background.setOrigin(0,0);
        this.bgspeed = 0.5;
       
        this.temp = this.physics.add.staticGroup();
        this.temp.create(400, 480, "platform").setScale(2).refreshBody();
        this.temp.create(400, 540, "platform").setScale(2).refreshBody();
        this.temp.create(400, 600, "platform").setScale(2).refreshBody();

        this.numLives = 3; //add colliders that count
        this.lives = this.add.group();
        this.life1= this.lives.create(550, 50, "live");
        this.life2= this.lives.create(630, 50, "live");
        this.life3= this.lives.create(710, 50, "live");

        this.frog = this.physics.add.sprite(200,100, "frog");
        this.frog.body.gravity.y = 500;
        this.physics.add.collider(this.frog, this.temp);
        this.frog.setCollideWorldBounds(true).setScale(.5);
        this.frogAcc = 5000;
        this.frogLeft = -200;
        this.frogRight = 200;

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.obstacleGroup = this.physics.add.group();
        this.obsVelX = -150;
        let obstacleX = 700;
        for(let i = 0; i < 10; i++){
            let obstacle = this.obstacleGroup.create(obstacleX, 450, "obstacle");
            obstacle.setOrigin(0.5, 1).setScale(.6);
            obstacle.setImmovable(true).setScale(.3);
            obstacleX += Phaser.Math.Between(450, 550);
        }

        this.time.addEvent({
            delay: 60000, //1 min 60000 adjust prog and this to 1:30 min
            callback: this.finish,
            callbackScope: this,
            loop: false
        });
        this.progbar = this.add.sprite(300,30,"bar");
        this.progbar.setScale(1.5);
   
        this.anims.create({
            key: "prog_anim",
            frames: this.anims.generateFrameNumbers("bar"),
            frameRate: .8
        }); 
        this.progbar.play("prog_anim");

        this.bgspeed = 0.5;

        this.time.addEvent({  
            delay: 5000, 
            callback: this.newItems, 
            callbackScope: this, 
            loop: true
        });
    }
    newItems(){
        if(this.playing){
            this.items = this.physics.add.group({

                key: "item", 
                frame: [0,1,2,3,4,5,6,7,8,9,10],
                repeat: 12, 
                randomFrame: true,
                setXY: { x: 250, y: 0, stepX: Phaser.Math.Between(50, 150)}
            });
            this.physics.add.collider(this.items, this.temp);
            this.physics.add.collider(this.items, this.obstacleGroup);
  
            if(this.items.x<0){
                this.items.destroy();
            }
            this.items.children.iterate(function (child) {
                child.body.gravity.y = Phaser.Math.FloatBetween(300, 600);
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
            });
            this.physics.add.overlap(this.frog, this.items, this.collectItem, null, this);
        }
    }
   
    collectItem(player, item){
        this.collect.play();
        item.disableBody(true, true);
        
        //  Add and update the score
        this.score += 1;
        this.scoreLabel.text = "SCORE " + this.score;
        
        if (this.items.countActive(true) == 0){
            //  A new batch of stars to collect
        this.items.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

           });
        }

       
    }
    update(){ //i want to add a progress bar.
        this.obstacleGroup.setVelocityX(this.obsVelX); //needed
        this.background.tilePositionX+= this.bgspeed;
        
        

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
        
        this.physics.add.collider(this.frog, this.obstacleGroup, this.hurtPlayer, null, this);
        
        if(this.numLives==2 ){
       
            this.life1.play("dead");
        }else if(this.numLives==1){
          
            this.life2.play("dead");
        }else if (this.numLives==0){
           
            this.life3.play("dead");
        }else if(this.numLives==3){
            this.life1.play("alive");
            this.life2.play("alive");
            this.life3.play("alive");
        }else{
            this.music.stop();
            this.over();
        }
        //add another else for when the lives hit 0 == game over
    }
    
    hurtPlayer(){
        this.loss.play();
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
            duration: 2000,
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
        this.playing = false;
        this.obstacleGroup.clear(true,true);
     
        this.add.bitmapText(100,100, "pixelFont", "YOU'VE FINISHED!", 50);
        this.bgspeed = 0;

        this.bin = this.physics.add.sprite(500, 435,"bin");
        this.bin.setScale(2);
        this.bin.play("normal_anim");

        this.physics.add.overlap(this.frog, this.bin, this.fin, null, this);
    
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
        this.music.stop();
        this.scene.start("winGame", {Score: this.score, Lives: this.numLives});
    }
    over(){
        this.scene.start("endGame");
    }
    
}
