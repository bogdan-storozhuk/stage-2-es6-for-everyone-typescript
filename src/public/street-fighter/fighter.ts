import { IFighterData } from "./helpers/apiHelper";

interface IFighter {
    name : string;
    health : number;
    attack : number;
    defense: number;
    getRandomNumber: () => number;
    getBlockPower:()=>number;
    getHitPower:()=>number;
  }
class Fighter implements IFighter {
    name: string;
    health:number;
    attack:number;
    defense:number
    constructor(object:IFighterData) {
        this.name = object.name;
        this.health = object.health;
        this.attack = object.attack;
        this.defense = object.defense;
    }
    getHitPower():number {
        let criticalHitChance = this.getRandomNumber();
        return this.attack * criticalHitChance;
    }

    getBlockPower() :number{
        let dodgeChance = this.getRandomNumber();
        return this.defense * dodgeChance;
    }

    getRandomNumber():number {
        return Math.random() + 1;
    }
}

export default Fighter;