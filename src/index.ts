import "babel-polyfill";
import { Boot } from "./boot";
import { Demo } from "./demo";
import "./index.css";
import { ScoreScene } from "./score-scene";
import { WelcomeScene } from "./welcome-scene";

// export const app = new App();
// app.init();

export const gameOptions = {
    bounceHeight: 300,
    ballGravity: 1200,
    ballPower: 1200,
    obstacleSpeed: 250,
    obstacleDistanceRange: [100, 250],
    localStorageName: "bestballscore"
};

export const config: Phaser.Types.Core.GameConfig = {
    title: "Starfall",
    type: Phaser.AUTO,
    backgroundColor: 0x87ceeb,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame",
        width: 640,
        height: 960
    },
    scene: [Boot, WelcomeScene, Demo, ScoreScene],
    physics: {
        default: "arcade"
        // arcade: {
        //     debug: true
        // }
    }
};

export const game = new Phaser.Game(config);
