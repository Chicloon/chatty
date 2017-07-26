import { observable, action } from "mobx";

 class AppState {
  @observable test = 'hello from store';
}

export default new AppState();

