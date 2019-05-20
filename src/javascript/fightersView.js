import View from './view';
import FighterView from './fighterView';
import {
  fighterService
} from './services/fightersService';
import Battle from './battle';

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.handleSelectedFighterClick = this.handleSelectFighterClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();
  battleParticipants = [];

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick, this.handleSelectedFighterClick);
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: 'div',
      className: 'fighters'
    });

    let button = document.createElement("button"),
      rootElement = document.getElementById('root');
    button.innerHTML = "Start battle";
    button.id = 'startBattle';
    button.classList = 'start';
    rootElement.appendChild(button);
    this.element.append(...fighterElements);


    button.addEventListener('click', event => this.initializeBattle(event), false);
  }

  initializeBattle() {
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

  async handleSelectFighterClick(event, fighter) {
    await this.addFighterIfNotExist(fighter);
    let isChecked = event.toElement.checked;

    let participant = this.battleParticipants.find(participant => participant._id === fighter._id);


    if (isChecked && this.battleParticipants.length >= 2 && !participant) {
      event.toElement.checked = false;
    }

    if (isChecked && this.battleParticipants.length < 2 && !participant) {
      let fighterWithDetailInformation = this.fightersDetailsMap.get(fighter._id);

      this.battleParticipants.push(fighterWithDetailInformation);
    }

    if (!isChecked && participant) {
      this.battleParticipants = this.battleParticipants.filter(participant => participant._id !== fighter._id);
    }
  }

  async handleFighterClick(event, fighter) {

    await this.addFighterIfNotExist(fighter);

    let result = this.fightersDetailsMap.get(fighter._id);


    this.openPopup();

    this.addEditDataToPopup(result);

    $('.popup-close').on('click', () => {
      this.closePopup();
    });

    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  }

  addEditDataToPopup = (object) => {
    let entries = Object.entries(object);

    entries = entries.filter(entry => entry[0] !== '_id' && entry[0] !== 'source');
    let htmlText = '';
    entries.forEach(item => {
      htmlText += `  <label for="${item[0]}"><b>${item[0]}</b></label>
                        <input type="text" id="${item[0]}" value="${item[1]}" 
                        placeholder="Enter ${item[0]}" name="${item[0]}"/> 
                        <br/>`;
    });

    htmlText += '<br/> <button id="editFighter">Edit</button>';
    $('#editPopup').append(htmlText);

    $('#editFighter').on('click', () => this.getChangedFighterData(object));
  }

  async addFighterIfNotExist(fighter) {
    if (!this.fightersDetailsMap.has(fighter._id)) {
      const result = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, result);
    }
  }

  getChangedFighterData = (object) => {
    let keys = Object.keys(object);
    keys.forEach(key => object[key] = $('#' + key).val());
    this.fightersDetailsMap.set(object._id, object);
    this.closePopup();
  }

  openPopup = () => {
    $('.overlay').css('display', 'block');
  }

  closePopup = () => {
    $('.overlay').css('display', 'none');
    $('#editPopup').empty();
  }
}

export default FightersView;