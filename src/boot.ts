import "phaser";
import * as WebFont from "webfontloader";

export class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: "Boot"
        });
    }
    public init() {
        //
    }
    public preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        progressBox.fillStyle(0x395ea8, 0.8);
        progressBox.fillRect(160, 455, 320, 50);

        this.load.on("progress", (value: number) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(170, 465, 300 * value, 30);
        });

        this.load.on("complete", () => {
            progressBar.destroy();
            progressBox.destroy();
        });

        this.load.image("obstacle", "assets/obstacle.png");
        this.load.image("ground", "assets/ground.png");
        this.load.image("ball", "assets/ball.png");
        this.load.image("obstacle", "assets/obstacle.png");
        this.load.image("particle", "assets/particle.png");
        this.load.image("particle2", "assets/particle2.png");
        //
        this.load.audio("back", [
            "assets/sounds/back.ogg",
            "assets/sounds/back.mp3"
        ]);
        this.load.audio("gameover", [
            "assets/sounds/gameover.ogg",
            "assets/sounds/gameover.mp3"
        ]);
        this.load.audio("hit", [
            "assets/sounds/hit.ogg",
            "assets/sounds/hit.mp3"
        ]);
    }
    public create() {
        WebFont.load({
            custom: {
                families: ["aire_exteriorregular"],
                urls: ["./assets/fonts/aire_exteriorregular/stylesheet.css"]
            },
            active: () => {
                this.scene.start("WelcomeScene");
            }
        });
    }
}
