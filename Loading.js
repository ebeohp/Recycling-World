class Loading extends Phaser.Scene{
    constructor(){
        super("loadGame");
    }
    preload(){
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.spritesheet("bar" , "assets/sprites/progress.png", {
            frameWidth: 200,
            frameHeight: 16
        });
        this.load.image("logo", "assets/images/logo.png");
    }
    create(){
        
        this.anims.create({
            key: "loading",
            frames: this.anims.generateFrameNumbers("bar"),
            frameRate: 12
        }); 
        this.progbar = this.add.sprite(400,350,"bar");
        this.progbar.play("loading").setScale(2);
        this.logo = this.add.image(400,230,"logo");
        this.logo.setScale(7);
        this.time.addEvent({  
            delay: 4000, 
            callback: this.finishLoad, 
            callbackScope: this, 
            loop: true
        });

        //this.add.bitmapText(370,370, "pixelFont", "Now Loading...", 20);
        //this.add.bitmapText(250,400, "pixelFont", "[Hit SPACE to try again!]", 30);
    }
    update(){

    }
    finishLoad(){
        this.scene.start("bootGame");
    }
}