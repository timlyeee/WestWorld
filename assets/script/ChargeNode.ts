
import { _decorator, Component, Node, SpriteFrame, SpriteComponent, CCString, find, Animation } from 'cc';
import { TrackNode } from './TrackNode';
import {Cargo,CargoType} from './Cargo';
import { Train } from './Train';
const { ccclass, property,type } = _decorator;

@ccclass('ChargeNode')
export class ChargeNode extends TrackNode {
    @type(Cargo)
    _cargo:Cargo|null=null;
    stationName: string = '';

    animation: Animation | null = null;
    @type(Cargo)
    get cargo(){
        return this._cargo
    };
    set cargo(value){
        this._cargo = value;
        if(value){
            if (this.animation) {
                this.animation.play(this.animation.clips[0]!.name);
            }
            
        } else {
            if (this.animation) {
                this.animation.play(this.animation.clips[1]!.name);
            }
        }
    }

    start () {
        this.animation = find(this.stationName)?.getComponent(Animation)!;
        if(this._cargo){
            if (this.animation) {
                this.animation.play(this.animation.clips[0]!.name);
            }
            
        } else {
            if (this.animation) {
                this.animation.play(this.animation.clips[1]!.name);
            }
        }
    }
    
    @type(CargoType)
    cargoType:CargoType = CargoType.PIG;
    responeTrain(train:Train){
        const result = super.responeTrain(train);
        if(train.forwardNode){
            if(this.cargo && !train.cargo){
                train.cargo = this.cargo;
                this.cargo = null;
            } else if(!this.cargo && train.cargo && train.cargo.type === this.cargoType){
                this.cargo = train.cargo;
                train.cargo = null;
            }
        }
        return result;
    }
}
