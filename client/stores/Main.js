import { observable } from 'mobx';

class Main {
  @observable greet = 'hello from mobx';


}

export default new Main();
