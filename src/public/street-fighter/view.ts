

export interface IElement {
  tagName: string ;
  className:string;
  attributes?: any ;
}
//testret
interface IView {
  createElement:(obj:IElement ) =>HTMLElement;
}

class View implements IView {

  createElement({
    tagName,
    className = '',
    attributes = {}
  }: IElement) {
    const element = document.createElement(tagName) as HTMLElement;
    element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;