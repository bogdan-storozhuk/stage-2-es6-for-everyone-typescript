import  Fighter from './fighter.js';

class Battle {
    constructor(fighter1,fighter2) {
        this.fighter1 = new Fighter(fighter1);
        this.fighter2 = new Fighter(fighter2);
        
    }
    startBattle(){

        while(this.fighter1.health > 0 && this.fighter2.health > 0 ){
           this.figtherHit(this.fighter1, this.fighter2);
           this.figtherHit(this.fighter2, this.fighter1);
        }

        if(this.fighter1.health < 0){
            this.addMessage(`${this.fighter2.name} won`);
        }

        if(this.fighter2.health < 0){
            this.addMessage(`${this.fighter1.name} won`);
        }      
    }

    figtherHit(fighter1, fighter2){
       const hitPower =  fighter1.getHitPower();
       const blockPower = fighter2.getBlockPower();
        fighter2.health =  fighter2.health - ( hitPower - blockPower);
        console.log(` ${fighter1.name}  hit   ${fighter2.name} with hit power ${hitPower} and blockPower ${blockPower}. `);
        this.addMessage(` ${fighter2.name}  have ${fighter2.health}. `);
    }


    addMessage(text){
       let htmlText =  `<p>${text}</p>`;
       $('#editPopup').append(htmlText);
    }
}
export default Battle;