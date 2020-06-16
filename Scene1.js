class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.image("sky", "assets/images/sky.png");
        this.load.image("platform", "assets/images/platform.png");
        this.load.image("ground", "assets/images/ground.png");
        this.load.image("obstacle", "assets/images/daisy.png");
        this.load.spritesheet("frog" , "assets/sprites/frog.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("live" , "assets/sprites/live.png", {
            frameWidth: 128,
            frameHeight: 128
        });
    }
    create(){
        
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("frog", { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1//loop animation
        });
    
        this.anims.create({
            key: "land",
            frames: [ { key: "frog", frame: 2 } ],
            frameRate: 0
        });

        this.anims.create({
            key: "alive",
            frames: [ { key: "live", frame: 0} ],
            frameRate: 0
        });
        this.anims.create({
            key: "dead",
            frames: [ { key: "live", frame: 1 } ],
            frameRate: 0
        });

        this.scene.start("playGame");
    }
    update(){

    }


}