import "babel-polyfill";
import { Boot } from "./boot";
import { Demo } from "./demo";
import "./index.css";
import { ScoreScene } from "./score-scene";
import { WelcomeScene } from "./welcome-scene";

if ("serviceWorker" in navigator) {
    console.log(navigator.serviceWorker);
    navigator.serviceWorker
        .register("sw.js")
        .then(reg => {
            console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch(error => {
            console.error("Trouble with sw: ", error);
        });
}
export let ysdk: any;

(window as any).YaGames.init({
    adv: {
        onAdvClose: (wasShown: any) => {
            console.info("adv closed!", wasShown);
        }
    },
    screen: {
        fullscreen: false
    }
}).then((yasdk: any) => {
    ysdk = yasdk;
});

export const gameOptions = {
    bounceHeight: 300,
    ballGravity: 1200,
    ballPower: 1200,
    obstacleSpeed: 250,
    obstacleDistanceRange: [100, 250],
    localStorageName: "bestballscore",
    localStorageTime: "timeshowadv"
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

const lastTime = +(localStorage.getItem(gameOptions.localStorageTime) === null
    ? 0
    : localStorage.getItem(gameOptions.localStorageTime));
export let timeLastShowFullscreenAdv = { value: lastTime };

export const game = new Phaser.Game(config);
