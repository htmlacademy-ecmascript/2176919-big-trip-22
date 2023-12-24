import AbstractView from '../framework/view/abstract-view.js';
import { TEXT_NO_EVENT } from '../mock/constants.js';

function createNoEventTemplate() {
  return (`<p class="trip-events__msg">${TEXT_NO_EVENT.everything}</p>`);
}

export default class NoEvent extends AbstractView {
  get template() {
    return createNoEventTemplate();
  }
}
