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
    public obstacleSpeed: number;
    public particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    public emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    public particlesLoss: Phaser.GameObjects.Particles.ParticleEmitterManager;
    public emitterLoss: Phaser.GameObjects.Particles.ParticleEmitter;
    public soundBack: Phaser.Sound.BaseSound;
    public soundHit: Phaser.Sound.BaseSound;
    public soundGameOver: Phaser.Sound.BaseSound;
    constructor() {
        super("Demo");
    }
    public create() {
        this.soundBack = this.sound.add("back", {
            volume: 0,
            loop: true
        });
        this.soundHit = this.sound.add("hit", {
            volume: 1
        });
        this.soundGameOver = this.sound.add("gameover", {
            volume: 0.5
        });
        this.soundBack.play();
        this.tweens.add({
            targets: this.soundBack,
            volume: 0.5,
            duration: 300
        });

        this.obstacleSpeed = -gameOptions.obstacleSpeed;

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
        this.obstacleGroup.setVelocityX(this.obstacleSpeed);
        this.input.on("pointerdown", this.boost, this);
        this.score = 0;
        this.topScore = +(localStorage.getItem(gameOptions.localStorageName) ===
        null
            ? 0
            : localStorage.getItem(gameOptions.localStorageName));
        this.scoreText = this.add.text(10, 10, "", {
            fontFamily: "aire_exteriorregular",
            // fontStyle: "Bold",
            fontSize: "38px",
            fill: "#FBFBAC"
        });
        this.updateScore(this.score);

        this.particles = this.add.particles("particle");
        this.emitter = this.particles.createEmitter({
            angle: { min: 240, max: 300 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -200, max: 200 },
            quantity: 5,
            lifespan: 500,
            alpha: { start: 1, end: 0 },
            scale: { random: [1, 0.5] },
            // blendMode: "ADD",
            // gravityX: -350,
            on: false
        });

        this.particlesLoss = this.add.particles("particle2");
        this.emitterLoss = this.particlesLoss.createEmitter({
            angle: { min: 240, max: 300 },
            speedX: { min: -200, max: 200 },
            speedY: { min: -200, max: 200 },
            quantity: 5,
            lifespan: 500,
            alpha: { start: 1, end: 0 },
            scale: { random: [1, 0.5] },
            // blendMode: "ADD",
            // gravityX: -350,
            on: false
        });
    }
    public updateScore(inc: number) {
        this.score += inc;
        this.scoreText.text =
            "Результат: " + this.score + "\nЛучший результат: " + this.topScore;
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
                this.soundHit.play();
                this.emitter.setGravityX(this.obstacleSpeed);
                this.emitter.emitParticleAt(
                    this.ball.x,
                    this.ball.getBounds().bottom
                );
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
                this.emitterLoss.emitParticleAt(
                    this.ball.x,
                    this.ball.getBounds().bottom
                );

                this.tweens.add({
                    targets: this.soundBack,
                    volume: 0,
                    duration: 300,
                    onComplete: () => {
                        this.soundBack.stop();
                        this.scene.start("ScoreScene", {
                            score: this.score,
                            topscore: this.topScore
                        });
                    }
                });

                this.tweens.add({
                    targets: this.soundGameOver,
                    volume: 0.5,
                    duration: 300
                });
                this.soundGameOver.play();
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
                this.obstacleSpeed -= 7;
                this.obstacleGroup.setVelocityX(this.obstacleSpeed);
            }
        }, this);
    }
}
