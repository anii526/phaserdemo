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
