class Scene4 extends Phaser.Scene{
    constructor(){
        super("winGame");
    }
    init(data){
        
        this.score = data.Score;
        this.lives = data.Lives;
    

    }
    preload(){
        this.load.spritesheet("pose" , "assets/sprites/pose.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    }
    create(){
        this.music = this.sound.add("music");
        this.music.play();
        this.anims.create({
            key: "pose_anim",
            frames: this.anims.generateFrameNumbers("pose"),
            frameRate: 5,
            repeat: -1//loop animation
        });
        this.add.bitmapText(90,50, "pixelFont", "YOU'VE WON!", 80);
        this.add.bitmapText(110,150, "pixelFont", "Items Recycled: "+this.score, 50);
        this.add.bitmapText(110,200, "pixelFont", "Lives Left: "+ this.lives, 50);

        this.pose = this.add.sprite(560,300,"pose");
        this.pose.setScale(8);
        this.pose.play("pose_anim");

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.bitmapText(90,400, "pixelFont", "[Hit SPACE to play again!]", 30);
    }
    
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.restartGame();
 
        }
    }
    restartGame()
    {
        this.music.stop();
        this.scene.start("bootGame");
    }
   
    
}