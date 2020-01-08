// import * as PIXI from "pixi.js";
// import * as WebFont from 'webfontloader';
// import { PreloaderManager } from './utils/preloader/preloader-manager';
// import { mainSlot } from 'index';
/**
 * Created by aniii526 on 1.09.2017.
 */
export class ResourcesLoader {
    protected loader: PIXI.Loader;
    protected fontFamilies: string[];
    protected fontUrls: string[];
    constructor() {
        this.loader = new PIXI.Loader();
    }
    public init() {
        return new Promise((resolve, reject) => {
            const version = 1;

            this.loader.add("back", "./assets/back.png?" + version);
            this.loader.add("5x5", "./assets/5x5.png?" + version);
            this.loader.add("4x4", "./assets/4x4.png?" + version);
            this.loader.add("3x3", "./assets/3x3.png?" + version);

            this.loader.add("s1", "./assets/s1.png?" + version);
            this.loader.add("s2", "./assets/s2.png?" + version);
            this.loader.add("s3", "./assets/s3.png?" + version);
            this.loader.add("s4", "./assets/s4.png?" + version);
            this.loader.add("s5", "./assets/s5.png?" + version);

            this.loader.on("progress", (loader, res) => {
                // (loader.progress);
                // PreloaderManager.instance.setProgress(loader.progress > 90 ? 90 : loader.progress)
            });

            this.loader.once("complete", (loader, res) => {
                // ('Нужно сделать загрузку шрифтов');
                // WebFont.load({
                //     custom: {
                //         families: this.fontFamilies,
                //         urls: this.fontUrls
                //     },
                //     active: () => {
                //         resolve();
                //     }
                // });
                resolve();
            });
            this.loader.on("error", () => {
                reject("ПРОИЗОШЛА ОШИБКА ЗАГРУЗКИ");
            });

            this.loader.load();
        });
    }
}
