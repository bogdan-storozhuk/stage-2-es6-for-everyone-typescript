import View from './view';
import { IFighterData } from './helpers/apiHelper';



interface IFighterView {
  createFighter:(fighter:IFighterData, handleClick:Function, handleSelectFighterClick:Function)=>void;
}



class FighterView extends View implements IFighterView{
  
  element: any;
  constructor(fighter:IFighterData, handleClick:Function, handleSelectFighterClick:Function) {
    super();

    this.createFighter(fighter, handleClick, handleSelectFighterClick);
  }

  createFighter(fighter:IFighterData, handleClick:Function, handleSelectFighterClick:Function):void {
    const {
      name,
      source
    } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const inputElement = this.createInput('checkbox');
    this.element = this.createElement({
      tagName: 'div',
      className: 'fighter'
    });
    this.element.append(imageElement, nameElement, inputElement);


    imageElement.addEventListener('click', event => handleClick(event, fighter), false);
    inputElement.addEventListener('click', event => handleSelectFighterClick(event, fighter), false);
  }

  private createName(name:string):HTMLElement {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'name'
    });
    nameElement.innerText = name;

    return nameElement;
  }

  private createImage(source:string):HTMLElement {
    const attributes = {
      src: source
    };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  private createInput(inputType:string):HTMLElement {
    const attributes = {
      type: inputType
    };
    const inputElement = this.createElement({
      tagName: 'input',
      className: 'check',
      attributes
    });

    return inputElement;
  }
}

export default FighterView;