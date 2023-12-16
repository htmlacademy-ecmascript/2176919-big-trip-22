import { createElement } from '../render.js';
import { humanizeDueDate } from '../mock/utils.js';
import { DATE_FORMAT, TYPE, CLASS_NAME } from '../mock/data.js';

function createFormEditTemplate(waypoint, offers, destination, offersType, destinationAll) {
  const idPoints = offers.map((item) => item.id);
  const { type, dateFrom, dateTo, basePrice, id } = waypoint;
  const { name: namePoint, description, photos } = destination;
  return (`<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${TYPE.map((item) => `<div class="event__type-item">
              <input id="event-type-${item}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
              <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-${id}">${item}</label>
            </div>`).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${namePoint}" list="destination-list-${id}">
        <datalist id="destination-list-${id}">
        ${destinationAll.map(({ name: nameDestination }) => `<option value="${nameDestination}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeDueDate(dateFrom, DATE_FORMAT.year)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeDueDate(dateTo, DATE_FORMAT.year)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offersType.offers.map(({ title: titleOffersType, id: idOfferType, price }) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${CLASS_NAME[titleOffersType]}-${idOfferType}" type="checkbox" name="event-offer-${CLASS_NAME[titleOffersType]}" ${idPoints.includes(idOfferType) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${CLASS_NAME[titleOffersType]}-${idOfferType}">
              <span class="event__offer-title">${titleOffersType}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`).join('')}

        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${photos.map(({ description: descriptionPhoto, src }) => `<img class="event__photo" src="${src}" alt="${descriptionPhoto}">`).join('')}
          </div>
        </div>
      </section>
    </section>
  </form>`);
}

export default class FormEdit {
  constructor({ waypoint, offers, destination, offersType, destinationAll }) {
    this.waypoint = waypoint;
    this.offers = offers;
    this.description = destination;
    this.offersType = offersType;
    this.destinationAll = destinationAll;
  }

  getTemplate() {
    return createFormEditTemplate(this.waypoint, this.offers, this.description, this.offersType, this.destinationAll);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
