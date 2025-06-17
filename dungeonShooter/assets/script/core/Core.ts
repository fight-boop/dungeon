import { AudioClip, AudioSource, director, instantiate, Node, Prefab, resources } from "cc";
import { EGameEvent, EPath, EPrefabName } from "./Config";
import { PlayerData } from "../game/PlayerData";

export class EventManager {
    private _events: [id: EGameEvent, callback: Function, target: any][] = [];

    public on(id: EGameEvent, callback: Function, target: any) {
        for (let i = 0; i < this._events.length; i++) {
            if (this._events[i][0] == id && this._events[i][1] == callback && this._events[i][2] == target) {
                return;
            }
        }
        this._events.push([id, callback, target]);
    }
    public off(id: EGameEvent, callback: Function, target: any) {
        for (let i = 0; i < this._events.length; i++) {
            if (this._events[i][0] == id && this._events[i][1] == callback && this._events[i][2] == target) {
                this._events.splice(i, 1);
                return;
            }
        }
    }
    public emit(id: EGameEvent, ...args: any[]) {
        for (let i = 0; i < this._events.length; i++) {
            if (this._events[i][0] == id) {
                this._events[i][1].apply(this._events[i][2], ...args);
            }
        }
    }
}


export class audioManager {
    private static _instance: audioManager = null;

    public static get instance(): audioManager {
        if (this._instance == null) {
            this._instance = new audioManager();
        }
        return this._instance;
    }

    private _audioCaches: Record<string, AudioClip> = {};
    private _audioSource: AudioSource;
    private constructor() {
    }

    init(audioSource: AudioSource) {
        this._audioSource = audioSource;
        console.log("音效管理器加载成功");
    }
    public playEffect(effectName: string, volume: number = 1.0) {
        let url = EPath.AUDIO_EFEECT + effectName;
        if (!this._audioSource) { return; }
        if (this._audioCaches[url]) {
            this._audioSource?.playOneShot(this._audioCaches[url], volume)
            return;
        }
        // 播放音频
        resources.load(url, (err, audioClip) => {
            if (err) {
                console.error(err);
                return;
            }
            this._audioCaches[url] = audioClip as AudioClip;
            this._audioSource?.playOneShot(this._audioCaches[url], volume)
        });
    }

    public playMusic(musicName: string, volume: number = 1.0) {
        let url = EPath.AUDIO_MUSIC + musicName;
        if (!this._audioSource) { return; }
        if (this._audioCaches[url]) {
            this._audioSource.clip = this._audioCaches[url];
            this._audioSource.volume = volume;
            this._audioSource.loop = true;
            this._audioSource.play();
        } else {
            resources.load(url, (err, audioClip) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this._audioCaches[url] = audioClip as AudioClip;
                this._audioSource.clip = this._audioCaches[url];
                this._audioSource.volume = volume;
                this._audioSource.loop = true;
                this._audioSource.play();
            });
        }
    }

}

function saveToLocal(key, data: {}) {
    let json = JSON.stringify(data);
    localStorage.setItem('gameData' + key, json);
}
function loadFromLocal(): {} {
    try {
        let data = localStorage.getItem('gameData');
        if (data && data.length > 0) {
            return JSON.parse(data);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error loading from local storage:", error);
        return null;
    }
}

export class Core {
    private static _instance: Core = null;

    public static get instance(): Core {
        if (this._instance == null) {
            this._instance = new Core();
        }
        return this._instance;
    }
    private constructor() {

    }

    private _prefabCaches: Record<string, Prefab> = {}; // 预制体缓存
    public playerData: PlayerData = new PlayerData(); // 玩家数据
    event: EventManager = new EventManager(); // 事件管理器
    init(onfinished?: () => void) {
        let presistNode = new Node('AudioSourceNode');
        director.getScene().addChild(presistNode);
        director.addPersistRootNode(presistNode);
        audioManager.instance.init(presistNode.addComponent(AudioSource));

        let data = loadFromLocal();
        if (data) {
            this.playerData.setPackage(data);
            console.log("老玩家数据加载成功", this.playerData);
        } else {
            //新用户
            console.log("新用户数据加载");
        }
        this.playerData.loginTime = Date.now();
        console.log("玩家登录", this.playerData);

        let tasks: Promise<void>[] = [];
        Object.keys(EPrefabName).forEach((key) => {
            let name = EPrefabName[key];
            let url = EPath.PREFAB_PATH + name;
            let task = new Promise<void>((resolve, reject) => {
                resources.load(url, Prefab, (err, prefab) => {
                    if (err) {
                        console.error(err);
                        reject();
                        return;
                    }
                    this._prefabCaches[key] = prefab as Prefab;
                    resolve();
                })
            });
            tasks.push(task);
        })
        Promise.all(tasks).then(() => {
            console.log("预制体加载成功");
            if (onfinished) {
                onfinished();
            }
        }).catch((err) => {
            console.error("预制体加载失败", err);
        });
    }


    createNode(name: string, parent?: Node) {
        let prefab = this._prefabCaches[name];
        if (!prefab) {
            console.error(`Prefab ${name} not found`);
            return null;
        }
        let node = instantiate(prefab);
        parent.addChild(node);
        return node;
    }
    save() {
        saveToLocal('gameData', this.playerData.getPackage());
    }
}