import View from './view';

class FighterView extends View {
  constructor(fighter, handleClick, handleSelectFighterClick) {
    super();

    this.createFighter(fighter, handleClick, handleSelectFighterClick);
  }

  createFighter(fighter, handleClick, handleSelectFighterClick) {
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

  createName(name) {
    const nameElement = this.createElement({
      tagName: 'span',
      className: 'name'
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
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

  createInput(inputType) {
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