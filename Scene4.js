class Scene4 extends Phaser.Scene{
    constructor(){
        super("winGame");
    }
    init(){


    }
    preload(){
        this.load.spritesheet("pose" , "assets/sprites/pose.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    }
    create(){
        
        
        this.anims.create({
            key: "pose_anim",
            frames: this.anims.generateFrameNumbers("pose"),
            frameRate: 5,
            repeat: -1//loop animation
        });
        this.add.bitmapText(100,50, "pixelFont", "YOU'VE WON!  ", 80);
        this.add.bitmapText(120,150, "pixelFont", "Items Recycled:  ", 50);
        this.add.bitmapText(120,200, "pixelFont", "Lives Left:  ", 50);

        this.pose = this.add.sprite(530,300,"pose");
        this.pose.setScale(8);
        this.pose.play("pose_anim");

    }
    
    
    update(){

    }
   
    
}