import AbstractView from '../framework/view/abstract-view.js';
import { SORTING, SORT_TYPE } from '../mock/constants.js';

function createSortingTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORTING.map((item) => `<div div class="trip-sort__item  trip-sort__item--${item}" >
    <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" ${SORT_TYPE.includes(item) ? `data-sort-type="${item}"` : 'disabled'}>
      <label class="trip-sort__btn" for="sort-${item}">${item}</label>
    </div>`).join('')}
    </form>`);
}
export default class Sorting extends AbstractView {
  get template() {
    return createSortingTemplate();
  }
}
