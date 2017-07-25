import { observable, action } from "mobx";

export default class AppState {
  @observable test = 'hello from store';
}
