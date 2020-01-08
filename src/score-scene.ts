import "phaser";
export class ScoreScene extends Phaser.Scene {
    public score: number;
    public result: Phaser.GameObjects.Text;
    public hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "ScoreScene"
        });
    }
    public init(params: any): void {
        this.score = params.starsCaught;
    }
    public create(): void {
        const resultText: string = "Your score is " + this.score + "!";
        this.result = this.add
            .text(640 / 2, 960 / 2.5, resultText, {
                fontFamily: "roboto_condensedbold",
                // fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        const hintText: string = "Click to restart";
        this.hint = this.add
            .text(this.result.x, this.result.y + 130, hintText, {
                fontFamily: "roboto_condensedbold",
                // fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        this.input.on(
            "pointerdown",
            () => {
                this.scene.start("WelcomeScene");
            },
            this
        );
    }
}
