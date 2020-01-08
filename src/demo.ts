import "phaser";
import { game, gameOptions } from ".";
export class Demo extends Phaser.Scene {
    public obstacleGroup: Phaser.Physics.Arcade.Group;
    public firstBounce: number;
    public ground: Phaser.Physics.Arcade.Sprite;
    public ball: Phaser.Physics.Arcade.Sprite;
    public score: number;
    public topScore: number;
    public scoreText: Phaser.GameObjects.Text;
    constructor() {
        super("Demo");
    }
    public preload() {
        this.load.image("ground", "assets/ground.png");
        this.load.image("ball", "assets/ball.png");
        this.load.image("obstacle", "assets/obstacle.png");
    }
    public create() {
        this.obstacleGroup = this.physics.add.group();
        this.firstBounce = 0;
        this.ground = this.physics.add.sprite(
            (game.config.width as number) / 2,
            ((game.config.height as number) / 4) * 2.5,
            "ground"
        );
        this.ground.setImmovable(true);
        this.ball = this.physics.add.sprite(
            ((game.config.width as number) / 10) * 2,
            ((game.config.height as number) / 4) * 2.5 -
                gameOptions.bounceHeight,
            "ball"
        );
        this.ball.body.gravity.y = gameOptions.ballGravity;
        this.ball.setBounce(1);
        this.ball.setCircle(25);
        let obstacleX = game.config.width as number;
        for (let i = 0; i < 10; i++) {
            const obstacle = this.obstacleGroup.create(
                obstacleX,
                this.ground.getBounds().top,
                "obstacle"
            );
            obstacle.setOrigin(0.5, 1);
            obstacle.setImmovable(true);
            obstacleX += Phaser.Math.Between(
                gameOptions.obstacleDistanceRange[0],
                gameOptions.obstacleDistanceRange[1]
            );
        }
        this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);
        this.input.on("pointerdown", this.boost, this);
        this.score = 0;
        this.topScore = +(localStorage.getItem(gameOptions.localStorageName) ===
        null
            ? 0
            : localStorage.getItem(gameOptions.localStorageName));
        this.scoreText = this.add.text(10, 10, "", {
            fontFamily: "roboto_condensedbold",
            // fontStyle: "Bold",
            fontSize: "38px",
            fill: "#FBFBAC"
        });
        this.updateScore(this.score);
    }
    public updateScore(inc: number) {
        this.score += inc;
        this.scoreText.text =
            "Score: " + this.score + "\nBest: " + this.topScore;
    }
    public boost() {
        if (this.firstBounce !== 0) {
            this.ball.body.velocity.y = gameOptions.ballPower;
        }
    }
    public getRightmostObstacle() {
        let rightmostObstacle = 0;
        this.obstacleGroup.getChildren().forEach((obstacle: any) => {
            rightmostObstacle = Math.max(rightmostObstacle, obstacle.x);
        });
        return rightmostObstacle;
    }
    public update() {
        this.physics.world.collide(
            this.ground,
            this.ball,
            () => {
                if (this.firstBounce === 0) {
                    this.firstBounce = this.ball.body.velocity.y;
                } else {
                    this.ball.body.velocity.y = this.firstBounce;
                }
            },
            null,
            this
        );
        this.physics.world.collide(
            this.ball,
            this.obstacleGroup,
            () => {
                localStorage.setItem(
                    gameOptions.localStorageName,
                    Math.max(this.score, this.topScore).toString()
                );
                // this.scene.start("Demo");
                this.scene.start("ScoreScene");
            },
            null,
            this
        );
        this.obstacleGroup.getChildren().forEach((obstacle: any) => {
            if (obstacle.getBounds().right < 0) {
                this.updateScore(1);
                obstacle.x =
                    this.getRightmostObstacle() +
                    Phaser.Math.Between(
                        gameOptions.obstacleDistanceRange[0],
                        gameOptions.obstacleDistanceRange[1]
                    );
            }
        }, this);
    }
}
