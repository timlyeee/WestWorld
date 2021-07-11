
import { _decorator, Component, Node, JsonAsset, SpriteFrame, Sprite, Vec3, Layers, CCInteger, Prefab, instantiate } from 'cc';
import { Cargo } from './Cargo';
import { ChargeNode } from './ChargeNode';
import { SwitchNode } from './SwitchNode';
import { TargeNode } from './TargeNode';
import { TrackNode } from './TrackNode';
import { Train } from './Train';
const { ccclass, property, type } = _decorator;

declare class LevelConfiguration extends JsonAsset {
    json: {
        tile: Array<Array<number>>; 
        switchers: Record<number, { options: number[] }>;
        trainPosition: number[],
        carriageNumber: number,
        chargers: Record<number, { name: string, type: number, state: number, trackType: number }>,
        target: { requirements: number[], trackType: number },
    }
}

const uiLayer = 1 << 25;

function isSwitcher (type: number) {
    return type > 6 && type <= 20;
}

function isNormalTrack (type: number) {
    return type !== 0 && type <= 6;
}

function isCharger (type: number) {
    return type >= 21;
}

function isTarget (type: number) {
    return type >= 30;
}

@ccclass('LevelGenerated')
export class LevelGenerater extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @type(CCInteger)
    public levelIndex = 0;

    @type(JsonAsset)
    public levelConfigurations: LevelConfiguration[] = [];

    @type([SpriteFrame])
    public trackSpriteFrames: SpriteFrame[] = [];

    @type(Prefab)
    public trackPrefab: Prefab | null = null;

    @type(Prefab)
    public switcherPrefab: Prefab | null = null;

    @type(Prefab)
    public trainPrefab: Prefab | null = null;

    @type(Prefab)
    public carriagePrefab: Prefab | null = null;

    @type(Prefab)
    public chargerPrefab: Prefab | null = null;

    @type(Prefab)
    public markerPrefab: Prefab | null = null;

    @type([SpriteFrame])
    public cargoSpriteFrames: SpriteFrame[] = [];

    @type(Prefab)
    public targetPrefab: Prefab | null = null;

    @type(CCInteger)
    public tileSize: number = 40;

    public trackMatrix: Array<Array<TrackNode | null>> = [];
    public allNodes: Node[] = [];
    public train: Node | null = null;
    public carriages: Node[] = [];

    start(){
        this.loadScene(this.levelIndex);
    }

    loadScene (index : number) {
        this.levelIndex = index;
        const configurations = this.levelConfigurations[index].json;
        const tile = this.levelConfigurations[index].json.tile;
        const firstColumn = tile[0];
        const columnNumber = firstColumn.length;
        const rowNumber = tile.length;
        this.trackMatrix.length = rowNumber;
        for (let i = rowNumber - 1; i >= 0; i--) {
            this.trackMatrix[i] = new Array(columnNumber);
            for (let j = 0; j < columnNumber; ++j) {
                const type = tile[i][j];
                if (isNormalTrack(type)) {
                    const track = instantiate(this.trackPrefab!);
                    track.name = `Track ${i}, ${j}`;
                    this.allNodes.push(track);
                    const trackComp = track.getComponent(TrackNode);
                    this.trackMatrix[i][j] = trackComp;
                    trackComp!.spriteFrame = this.trackSpriteFrames[tile[i][j] - 1];
                    track.setParent(this.node);
                    track.layer = uiLayer;
                    track.position = new Vec3((j - columnNumber / 2) * this.tileSize + this.tileSize / 2, (rowNumber - 1 - i - rowNumber / 2) * this.tileSize + this.tileSize / 2, 0 );
                } else if (isSwitcher(type)) {
                    const switcher = instantiate(this.switcherPrefab!);
                    switcher.name = `Switcher ${i}, ${j}`;
                    this.allNodes.push(switcher);
                    const switcherComp = switcher.getComponent(SwitchNode);
                    switcherComp!.spriteFrameArray = configurations.switchers[type].options.map((val) => this.trackSpriteFrames[val - 1]);
                    switcherComp!.spriteFrame = this.trackSpriteFrames[configurations.switchers[type].options[0] - 1];
                    this.trackMatrix[i][j] = switcherComp;
                    switcher.setParent(this.node);
                    switcher.layer = uiLayer;
                    switcher.position = new Vec3((j - columnNumber / 2) * this.tileSize + this.tileSize / 2, (rowNumber - 1 - i - rowNumber / 2) * this.tileSize + this.tileSize / 2, 0 );
                } else if (isCharger(type)) {
                    const track = instantiate(this.chargerPrefab!);
                    track.name = `Charger ${i}, ${j}`;
                    this.allNodes.push(track);
                    const chargerComp = track.getComponent(ChargeNode);
                    chargerComp!.cargoType = configurations.chargers[type].type;
                    chargerComp!.stationName = `Canvas/LV${this.levelIndex + 1}/${configurations.chargers[type].name}`; 
                    if (configurations.chargers[type].state) {
                        chargerComp!.cargo = new Cargo();
                        chargerComp!.cargo.spriteFrame = this.cargoSpriteFrames[configurations.chargers[type].type];
                        chargerComp!.cargo.type = configurations.chargers[type].type;
                    }
                    this.trackMatrix[i][j] = chargerComp;
                    chargerComp!.spriteFrame = this.trackSpriteFrames[configurations.chargers[type].trackType - 1];
                    track.setParent(this.node);
                    track.layer = uiLayer;
                    track.position = new Vec3((j - columnNumber / 2) * this.tileSize + this.tileSize / 2, (rowNumber - 1 - i - rowNumber / 2) * this.tileSize + this.tileSize / 2, 0 );
                    const marker = instantiate(this.markerPrefab!);
                    // marker.getComponent(Sprite)!.spriteFrame = this.cargoSpriteFrames[configurations.chargers[type].type];
                    marker.setParent(track);
                    marker.layer = uiLayer;
                    marker.position = new Vec3(0, 0, 0);
                } else if (isTarget(type)) {
                    const track = instantiate(this.targetPrefab!);
                    track.name = `Target ${i}, ${j}`;
                    this.allNodes.push(track);
                    const targeNode = track.getComponent(TargeNode);
                    targeNode!.requirements = configurations.target.requirements;
                    this.trackMatrix[i][j] = targeNode;
                    targeNode!.spriteFrame = this.trackSpriteFrames[configurations.target.trackType - 1];
                    track.setParent(this.node);
                    track.layer = uiLayer;
                    track.position = new Vec3((j - columnNumber / 2) * this.tileSize + this.tileSize / 2, (rowNumber - 1 - i - rowNumber / 2) * this.tileSize + this.tileSize / 2, 0 );
                }
            }
        }
        const trackMatrix = this.trackMatrix;
        for (let i = 0; i < rowNumber; i++) {
            for (let j = 0; j < columnNumber; ++j) {
                const track = this.trackMatrix[i][j];
                if (!track) continue;
                if (track instanceof SwitchNode) {
                    const type = tile[i][j];
                    const top = trackMatrix[i - 1]?.[j];
                    const bottom = trackMatrix[i + 1]?.[j];
                    const left = trackMatrix[i]?.[j - 1];
                    const right = trackMatrix[i]?.[j + 1];
                    const switcher = configurations.switchers[type];
                    for (let k = 0; k < switcher.options.length; k++) {
                        const option = switcher.options[k];
                        switch (option) {
                            case 1: {
                                track.switchList.push(left!.node);
                                track.switchList.push(right!.node);
                                break;
                            }
                            case 2: 
                                track.switchList.push(top!.node);
                                track.switchList.push(bottom!.node);
                                break;
                                
                            case 3: 
                                track.switchList.push(top!.node);
                                track.switchList.push(right!.node);
                                
                                break; 
                            case 4:
                                track.switchList.push(top!.node);
                                track.switchList.push(left!.node);
                                break;
                            case 5:
                                track.switchList.push(right!.node);
                                track.switchList.push(bottom!.node);
                                break;  
                            case 6:
                                track.switchList.push(left!.node);
                                track.switchList.push(bottom!.node);
                                break;
                                
                        }
                    }
                    track.currentIndex = 0;
                    track.reconnect();
                } else {
                    
                    const top = trackMatrix[i - 1]?.[j];
                    const bottom = trackMatrix[i + 1]?.[j];
                    const left = trackMatrix[i]?.[j - 1];
                    const right = trackMatrix[i]?.[j + 1];
                    if (top && !(top instanceof SwitchNode)) {
                        track.linkedNodes.push(top.node);
                    } 
                    if (bottom && !(bottom instanceof SwitchNode)) {
                        track.linkedNodes.push(bottom.node);
                    } 
                    if (left && !(left instanceof SwitchNode)) {
                        track.linkedNodes.push(left.node);
                    } 
                    if (right && !(right instanceof SwitchNode)) {
                        track.linkedNodes.push(right.node);
                    }
                }
            }
        }

        this.train = instantiate(this.trainPrefab!);
        const trainComp = this.train.getComponent(Train);
        this.train!.setParent(this.node);
        this.train!.layer = uiLayer;
        const startPosRow = configurations.trainPosition[0];
        let startPosColumn = configurations.trainPosition[1];
        trainComp!.init(this.trackMatrix[startPosRow][startPosColumn]!);
        let lastTrainComp = trainComp;

        for (let i = 0; i < configurations.carriageNumber; i++ ) {
            const carriage = instantiate(this.carriagePrefab!);
            this.carriages.push(carriage);
            const carriageComp = carriage.getComponent(Train);
            lastTrainComp!.backwardNode = carriage;
            carriageComp!.forwardNode = lastTrainComp!.node;
            lastTrainComp = carriageComp;
            carriage!.setParent(this.node);
            carriage!.layer = uiLayer;
            carriageComp!.init(this.trackMatrix[startPosRow][--startPosColumn]!);
        }
        
        // [3]
    }

    clear () {
        this.allNodes.forEach(x => {
            x.destroy();
        });
        this.trackMatrix.length = 0;
        this.carriages.forEach(x => {
            x.destroy();
        });
        this.carriages.length = 0;
        this.train?.destroy();
        this.train = null;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
