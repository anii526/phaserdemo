import "phaser";
import { gameOptions, timeLastShowFullscreenAdv, ysdk } from ".";
export class ScoreScene extends Phaser.Scene {
    public score: number;
    public topScore: number;
    public result: Phaser.GameObjects.Text;
    public bestResult: Phaser.GameObjects.Text;
    public hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "ScoreScene"
        });
    }
    public init(params: any): void {
        this.score = params.score;
        this.topScore = params.topscore;
    }
    public create(): void {
        const resultText: string = "Ваш результат: " + this.score;
        this.result = this.add
            .text(640 / 2, 960 / 2.5, resultText, {
                fontFamily: "aire_exteriorregular",
                // fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        const bestResultText: string =
            "Лучший результат: " + Math.max(this.score, this.topScore);
        this.bestResult = this.add
            .text(640 / 2, this.result.y + 50, bestResultText, {
                fontFamily: "aire_exteriorregular",
                // fontStyle: "Bold",
                fontSize: "38px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);
        const hintText: string = "Нажмите, чтобы попробовать снова";
        this.hint = this.add
            .text(this.result.x, this.result.y + 170, hintText, {
                fontFamily: "aire_exteriorregular",
                // fontStyle: "Bold",
                fontSize: "32px",
                fill: "#FBFBAC"
            })
            .setOrigin(0.5, 0.5);

        const data = new Date();
        const sec = data.getTime();
        const resultSec = Math.round(
            (sec - timeLastShowFullscreenAdv.value) / 1000
        );
        console.log(resultSec);
        if (resultSec > 180) {
            timeLastShowFullscreenAdv.value = sec;
            localStorage.setItem(
                gameOptions.localStorageTime,
                timeLastShowFullscreenAdv.value.toString()
            );

            ysdk.adv.showFullscreenAdv({
                callbacks: {
                    onClose() {
                        // some action after close
                    },
                    onError() {
                        // some action on error
                    }
                }
            });
        }

        this.input.on(
            "pointerdown",
            () => {
                this.scene.start("WelcomeScene");
            },
            this
        );
    }
}
