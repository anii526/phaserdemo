import "phaser";
export class ScoreScene extends Phaser.Scene {
    score: number;
    result: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "ScoreScene"
        });
    }
    init(params: any): void {
        this.score = params.starsCaught;
    }
    create(): void {
        var resultText: string = "Your score is " + this.score + "!";
        this.result = this.add
            .text(640 / 2, 960 / 2.5, resultText, {
                fontFamily: "Roboto Condensed",
                fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        var hintText: string = "Click to restart";
        this.hint = this.add
            .text(this.result.x, this.result.y + 130, hintText, {
                fontFamily: "Roboto Condensed",
                fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        this.input.on(
            "pointerdown",
            function(/*pointer*/) {
                this.scene.start("WelcomeScene");
            },
            this
        );
    }
}
