import AbstractView from '../framework/view/abstract-view.js';
import { SORTING, SortType } from '../utils/constants.js';

function createSortingTemplate() {
  const sortType = Object.values(SortType);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORTING.map((item) => `<div div class="trip-sort__item  trip-sort__item--${item}" >
    <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}" ${sortType.includes(item) ? `data-sort-type="${item}"` : ''}>
      <label class="trip-sort__btn" for="sort-${item}">${item}</label>
    </div>`).join('')}
    </form>`);
}
export default class Sorting extends AbstractView {
  #handleSortTypeChange;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
