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
            .text(640 / 2, 960 / 2.5, titleText, {
                fontFamily: "Roboto Condensed",
                fontStyle: "Bold",
                fontSize: "128px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        var hintText: string = "Click to start";
        this.hint = this.add
            .text(this.title.x, this.title.y + 130, hintText, {
                fontFamily: "Roboto Condensed",
                fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        this.input.on(
            "pointerdown",
            function(/*pointer*/) {
                this.scene.start("Demo");
            },
            this
        );

        console.log(
            "WelcomeScene : ЭКРАН НА КОТОРЫЙ НУЖНО ПРОСТО КЛИКАТЬ БЫТЬ НЕ ДОЛЖНО"
        );
    }
}
