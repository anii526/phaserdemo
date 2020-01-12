import "phaser";

export class WelcomeScene extends Phaser.Scene {
    public title: Phaser.GameObjects.Text;
    public hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "WelcomeScene"
        });
    }
    public create(): void {
        const titleText: string = "Хоп Хоп";
        this.title = this.add
            .text(640 / 2, 960 / 2.5, titleText, {
                fontFamily: "aire_exteriorregular",
                // fontStyle: "Bold",
                fontSize: "128px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        const hintText: string = "Нажмите, чтобы начать";
        this.hint = this.add
            .text(this.title.x, this.title.y + 130, hintText, {
                fontFamily: "aire_exteriorregular",
                // fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        this.input.on(
            "pointerdown",
            () => {
                this.scene.start("Demo");
            },
            this
        );
    }
}
