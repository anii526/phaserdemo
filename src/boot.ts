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
    }
    public create() {
        console.log(WebFont);
        WebFont.load({
            custom: {
                families: ["roboto_condensedregular", "roboto_condensedbold"],
                urls: [
                    "./assets/fonts/robotocondensed-regular/stylesheet.css",
                    "./assets/fonts/robotocondensed-bold/stylesheet.css"
                ]
            },
            active: () => {
                this.scene.start("WelcomeScene");
            }
        });
    }
}
