
import { _decorator, Component, Node } from 'cc';
import { Cargo, CargoType } from './Cargo';
import { TrackNode } from './TrackNode';
import { Train } from './Train';
import { UiManager } from './UiManager';
const { ccclass, property } = _decorator;

@ccclass('TargeNode')
export class TargeNode extends TrackNode {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    public requirements: CargoType[] = [];

    start () {
        // [3]
    }

    responeTrain (train: Train) {
        let carriage = train.backwardTrain;
        for (let i = 0; i < this.requirements.length; i++) {
            const requirement = this.requirements[i];
            if (requirement !== carriage!.cargo?.type) {
                UiManager.Instance?.OpenMenu('所需货物不对');
                Train.stop = true;
                return true;
            }
            carriage = carriage?.backwardTrain;
        }
        UiManager.Instance?.OpenMenu('通关成功');
        return true
        // const result = super.responeTrain(train);
        // return result;
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
