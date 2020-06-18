class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.image("sky", "assets/images/sky.png");
        this.load.image("platform", "assets/images/platform.png");
        
        this.load.image("obstacle", "assets/images/daisy.png");
        this.load.spritesheet("bin" , "assets/sprites/finale.png", {
            frameWidth: 160,
            frameHeight: 160
        });
        this.load.spritesheet("frog" , "assets/sprites/frog.png", {
            frameWidth: 192,
            frameHeight: 150
        });
        this.load.spritesheet("live" , "assets/sprites/live.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet("item" , "assets/sprites/recycle_items.png", {
            frameWidth: 100,
            frameHeight: 64
        });
        this.load.spritesheet("bar" , "assets/sprites/progress.png", {
            frameWidth: 200,
            frameHeight: 16
        });
    }
    create(){
        
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("frog", { start: 0, end: 1 }),
            frameRate: 20,
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

        this.anims.create({
            key: "normal_anim",
            frames: [ { key: "bin", frame: 0 } ],
            frameRate: 0
        });
        this.anims.create({
            key: "filled_anim",
            frames: this.anims.generateFrameNumbers("bin"),
            frameRate: 8
        });

        
        this.scene.start("playGame");
    }
    update(){

    }


}