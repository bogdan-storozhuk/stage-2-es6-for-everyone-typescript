import Fighter from './fighter.js';

class Battle {
    constructor(fighter1, fighter2) {
        this.fighter1 = new Fighter(fighter1);
        this.fighter2 = new Fighter(fighter2);

    }

    startBattle() {
        while (this.fighter1.health > 0 && this.fighter2.health > 0) {
            this.figtherHit(this.fighter1, this.fighter2);
            this.figtherHit(this.fighter2, this.fighter1);
        }

        if (this.fighter1.health < 0) {
            this.addMessage(`${this.fighter2.name} won`);
        }

        if (this.fighter2.health < 0) {
            this.addMessage(`${this.fighter1.name} won`);
        }
    }

    figtherHit(fighter1, fighter2) {
        const hitPower = fighter1.getHitPower();
        const blockPower = fighter2.getBlockPower();
        let damage = hitPower - blockPower;
        if (damage <= 0) {
            this.addMessage(` ${fighter2.name}  evaded the attack`);
            return;
        }
        fighter2.health = fighter2.health - damage;
        this.addMessage(` ${fighter1.name}  deals ${damage.toFixed(1)} damage to ${fighter2.name}`);
        this.addMessage(` ${fighter2.name}  has ${fighter2.health.toFixed(1)} HP.`);
    }


    addMessage(text) {
        let htmlText = `<p>${text}</p>`;
        $('#editPopup').append(htmlText);
    }
}
export default Battle;