class Scene3 extends Phaser.Scene{
    constructor(){
        super("endGame");
    }
    preload(){
        this.load.audio("gameover", "assets/sound/gameover.mp3" );
    }
    create(){
        this.over = this.sound.add("gameover");
        this.over.play();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.bitmapText(200,300, "pixelFont", "GAME OVER", 100);
        this.add.bitmapText(250,400, "pixelFont", "[Hit SPACE to try again!]", 30);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.playAgain();
        }
    }
    playAgain(){
        this.scene.start("bootGame");
    }
}