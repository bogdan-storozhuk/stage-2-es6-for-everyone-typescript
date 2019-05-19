class Fighter {
    constructor(object) {
        this.name = object.name;
        this.health = object.health;
        this.attack = object.attack;
        this.defense = object.defense;
    }
    getHitPower() {
        let criticalHitChance= this.getRandomNumber();
        return this.attack * criticalHitChance;
    }
    
    getBlockPower(){
        let dodgeChance= this.getRandomNumber();
        return this.defense * dodgeChance;
    }

    getRandomNumber() {
        return Math.random() + 1;
    }
}

export default Fighter;