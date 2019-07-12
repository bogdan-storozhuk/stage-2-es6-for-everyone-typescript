import View from './view';
import FighterView from './fighterView';
import {
  fighterService
} from './services/fightersService';
import Battle from './battle';

// interface IFighter {
//   name: string;
//   health: number;
//   attack: number;
//   defense: number;
// }
interface IFighterData {
  _id: number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  source:string;
}

interface IFightersView {
  fightersDetailsMap: Map<number, IFighterData>;
  battleParticipants: IFighterData[];
 

}
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: {
    checked: boolean
  }; 
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
}


class FightersView extends View implements IFightersView {
  handleClick: (event: Event, fighter: IFighterData) => Promise<void>;
  handleSelectedFighterClick!: (event: Event, fighter: IFighterData) => Promise<void>;
  element: HTMLElement | undefined;
  constructor(fighters: IFighterData[]) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.handleSelectFighterClick = this.handleSelectFighterClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap: Map<number, IFighterData> = new Map();
  battleParticipants: IFighterData[] = [];

  private createFighters(fighters:IFighterData[]) : HTMLElement | void{
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick, this.handleSelectedFighterClick);
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: 'div',
      className: 'fighters'
    });

    let button  = document.createElement("button") as HTMLButtonElement,
      rootElement  = document.getElementById('root') as HTMLElement;
    button.innerHTML = "Start battle";
    button.id = 'startBattle';
    button.classList.add('start');
    rootElement.appendChild(button);
    this.element.append(...fighterElements);


    button.addEventListener('click', event => this.initializeBattle(), false);
  }

  private initializeBattle():void {
    if (this.battleParticipants.length < 2) {
      alert(`Battle participants must be more than ${this.battleParticipants.length}`);
    }

    if (this.battleParticipants.length > 2) {
      alert(`Battle participants must be less than ${this.battleParticipants.length}`);
    }

    if (this.battleParticipants.length !== 2) {
      return;
    }

    let battle = new Battle(this.battleParticipants[0], this.battleParticipants[1]);
    this.openPopup();
    $('.popup-close').on('click', () => {
      this.closePopup();
    });
    battle.startBattle();
  }

  async handleSelectFighterClick(event:HTMLElementEvent<HTMLTextAreaElement>, fighter: IFighterData) :Promise<void> {
    await this.addFighterIfNotExist(fighter);
    let isChecked = event.target.checked;

    let participant = this.battleParticipants.find(participant => participant._id === fighter._id);


    if (isChecked && this.battleParticipants.length >= 2 && !participant) {
      event.target.checked = false;
    }

    if (isChecked && this.battleParticipants.length < 2 && !participant) {
      let fighterWithDetailInformation:IFighterData = this.fightersDetailsMap.get(fighter._id) as IFighterData;

      this.battleParticipants.push(fighterWithDetailInformation);
    }

    if (!isChecked && participant) {
      this.battleParticipants = this.battleParticipants.filter(participant => participant._id !== fighter._id);
    }
  }

  async handleFighterClick(event:Event, fighter:IFighterData):Promise<void>{
    await this.addFighterIfNotExist(fighter);
    let result :IFighterData = this.fightersDetailsMap.get(fighter._id) as IFighterData;
    this.openPopup();
    this.addEditDataToPopup(result);

    $('.popup-close').on('click', () => {
      this.closePopup();
    });
  }

  private addEditDataToPopup = (object : IFighterData):void => {
    let entries = Object.entries(object);

    let htmlText = '';

    entries.forEach((item, index) => {
      let disabled = false;
      if (index === 0 || index === 1) {
        disabled = true;
      }

      htmlText += `  <label for="${item[0]}"><b>${item[0]}</b></label>
                        <input type="text" id="${item[0]}" value="${item[1]}" 
                        placeholder="Enter ${item[0]}" name="${item[0]}" 
                        ${disabled ? "disabled" : ""}/> 
                        <br/>`;
    });

    htmlText += '<br/> <button id="editFighter">Edit</button>';
    $('#editPopup').append(htmlText);

    $('#editFighter').on('click', () => this.getChangedFighterData(object));
  }

  private async addFighterIfNotExist(fighter:IFighterData):Promise<void> {
    if (!this.fightersDetailsMap.has(fighter._id)) {
      this.fightersDetailsMap.set(fighter._id, fighter);
    }
  }

  //testretr
  private getChangedFighterData = async (object:any):Promise<void> => {
    let keys : Array<any> = Object.keys(object);
    keys.forEach(key => object[key] = $('#' + key).val());
    this.fightersDetailsMap.set(object._id, object);

    const isSuccess = await fighterService.updateFighterDetails(object);
    if (isSuccess) {
      alert("Fighter was edited successfully!");
    }

    this.closePopup();
  }

  private openPopup = ():void => {
    $('.overlay').css('display', 'block');
  }

  private closePopup = ():void => {
    $('.overlay').css('display', 'none');
    $('#editPopup').empty();
  }
}

export default FightersView;