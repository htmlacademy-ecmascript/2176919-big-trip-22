import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDueDate, getDuration } from '../mock/utils.js';
import { DATE_FORMAT } from '../mock/data.js';

function createWaypointTemplate(waypoint, offers, destination) {
  const { basePrice, type, dateFrom, dateTo, favorite
  } = waypoint;
  const { name } = destination;
  return (`<div class="event">
  <time class="event__date" datetime="${humanizeDueDate(dateFrom, DATE_FORMAT.fullDate)}">${humanizeDueDate(dateFrom, DATE_FORMAT.day)}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-18T10:30">${humanizeDueDate(dateFrom, DATE_FORMAT.hoursMinutes)}</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-18T11:00">${humanizeDueDate(dateTo, DATE_FORMAT.hoursMinutes)}</time>
    </p>
    <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
  ${offers.map(({ title, price }) => `<li class="event__offer" >
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </li> `).join('')}
  </ul>
  <button class="event__favorite-btn ${favorite ? 'event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>`);
}

export default class Waypoint extends AbstractView {
  #waypoint = null;
  #offers = null;
  #destination = null;
  #handleEditClick = null;

  constructor({ waypoint, offers, destination, onEditClick }) {
    super();
    this.#waypoint = waypoint;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createWaypointTemplate(this.#waypoint, this.#offers, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
