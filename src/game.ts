import "phaser";
import Demo from "./demo";
import { WelcomeScene } from "./welcome-scene";
import { ScoreScene } from "./score-scene";

const config: Phaser.Types.Core.GameConfig = {
    title: "Starfall",
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 600,
    parent: "game",
    scene: [WelcomeScene, Demo, ScoreScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
