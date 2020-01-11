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
