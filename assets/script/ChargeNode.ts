
import { _decorator, Component, Node, SpriteFrame, SpriteComponent } from 'cc';
import { TrackNode } from './TrackNode';
import {Cargo,CargoType} from './Cargo';
import { Train } from './Train';
const { ccclass, property,type } = _decorator;

@ccclass('ChargeNode')
export class ChargeNode extends TrackNode {
    @type(Cargo)
    _cargo:Cargo|null=null;
        @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] =[];
    @type(Cargo)
    get cargo(){
        return this._cargo
    };
    set cargo(value){
        this._cargo = value;
        if(value){
            const spriteFrame = this.spriteFrameArray.find((frame,index)=>{ 
                return index -1 === value.type 
            });
            if(spriteFrame){
                this.getComponent(SpriteComponent)!.spriteFrame = spriteFrame;
            }
        } else {
            const spriteFrame = this.spriteFrameArray[0];
            this.getComponent(SpriteComponent)!.spriteFrame = spriteFrame;
        }
    }
    
    @type(CargoType)
    cargoType:CargoType = CargoType.Red;
    responeTrain(train:Train){
        const result =super.responeTrain(train);
        if(this.cargo && !train.cargo){
            train.cargo = this.cargo;
            this.cargo = null;
        } else if(!this.cargo && train.cargo && train.cargo.type === this.cargoType){
            this.cargo = train.cargo;
            train.cargo = null;
        }
        return result;
    }
}
