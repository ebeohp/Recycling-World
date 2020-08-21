
class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.image("sky", "assets/images/sky.png");
        this.load.image("platform", "assets/images/platform.png");
        this.load.image("obstacle", "assets/images/daisy.png");
        this.load.image("title", "assets/images/title.png");
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
    
        this.load.audio("music", "assets/sound/50s-bit.mp3");
        this.load.audio("collect", "assets/sound/collect.mp3");
       // this.load.audio("success", "assets/sound/success.mp3");
        this.load.audio("oof", "assets/sound/loselife.mp3");
    
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
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bg = this.add.image(0,0,"sky");
        this.bg.setOrigin(0,0).setScale(1.5);
        
        this.items = this.physics.add.group({
            key: "item", //items are not loading on screen for me
            frame: [0,1,2,3,4,5,6,7,8,9,10],
            repeat: 6,
            randomFrame: true,
            setXY: { x: 0, y: 0, stepX: 10}
        });
        this.items.children.iterate(function (child) {
            child.body.gravity.y = Phaser.Math.FloatBetween(10, 200);
            child.setCollideWorldBounds(true);
        });

        this.title = this.add.image(400,300,"title");
        this.title.setScale(3);
        this.add.bitmapText(300,295, "pixelFont", "Hit SPACE to play!", 30);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.startGame();
        }
        
        
    }
    startGame(){
        this.scene.start("playGame");
    }

class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
        this.load.image("sky", "assets/images/sky.png");
        this.load.image("platform", "assets/images/platform.png");
        this.load.image("obstacle", "assets/images/daisy.png");
        this.load.image("title", "assets/images/title.png");
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
    
        this.load.audio("music", "assets/sound/50s-bit.mp3");
        this.load.audio("collect", "assets/sound/collect.mp3");
       // this.load.audio("success", "assets/sound/success.mp3");
        this.load.audio("oof", "assets/sound/loselife.mp3");
    
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
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bg = this.add.image(0,0,"sky");
        this.bg.setOrigin(0,0).setScale(1.5);
        
        this.items = this.physics.add.group({
            key: "item", //items are not loading on screen for me
            frame: [0,1,2,3,4,5,6,7,8,9,10],
            repeat: 6,
            randomFrame: true,
            setXY: { x: 0, y: 0, stepX: 10}
        });
        this.items.children.iterate(function (child) {
            child.body.gravity.y = Phaser.Math.FloatBetween(10, 200);
            child.setCollideWorldBounds(true);
        });

        this.title = this.add.image(400,300,"title");
        this.title.setScale(3);
        this.add.bitmapText(300,295, "pixelFont", "Hit SPACE to play!", 30);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.startGame();
        }
        
        
    }
    startGame(){
        this.scene.start("playGame");
    }


>>>>>>> 24f93aa1f10a60e10f802a98ec7f44ee6e2b9e13
}
