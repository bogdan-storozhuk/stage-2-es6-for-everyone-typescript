import FightersView from './fightersView';
import {
  fighterService
} from './services/fightersService';
import { IFighterData } from './helpers/apiHelper';
interface IApp {
  startApp: () => Promise<void>;

}
class App implements IApp {
  constructor() {
    this.startApp();
  }

  static rootElement: HTMLElement = document.getElementById('root') as HTMLElement;
  static loadingElement: HTMLElement = document.getElementById('loading-overlay') as HTMLElement;

  async startApp(): Promise<void> {
    try {
      App.loadingElement.style.visibility = 'visible';

      const fighters: Array<IFighterData> = await fighterService.getFighters();
      const fightersView: FightersView = new FightersView(fighters);
      const fightersElement = fightersView.element as HTMLElement;
      App.rootElement.prepend(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;