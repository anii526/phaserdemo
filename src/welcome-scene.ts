import "phaser";

export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "WelcomeScene"
        });
    }
    create(): void {
        var titleText: string = "Hop Hop";
        this.title = this.add
            .text(375, 250, titleText, {
                fontFamily: "Helvetica",
                fontStyle: "Bold",
                fontSize: "128px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        var hintText: string = "Click to start";
        this.hint = this.add.text(300, 350, hintText, {
            fontFamily: "Helvetica",
            fontStyle: "Bold",
            fontSize: "28px",
            fill: "#FBFBAC"
        });
        this.input.on(
            "pointerdown",
            function(/*pointer*/) {
                this.scene.start("Demo");
            },
            this
        );
    }
}
