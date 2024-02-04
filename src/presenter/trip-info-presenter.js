import { replace, remove, render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class TripInfoPresenter {
  #tripInfoContainer;
  #waypointModel;
  #destinationModel;
  #offersModel;
  #tripInfoComponent = null;

  constructor({ tripInfoContainer, waypointModel, destinationModel, offersModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#waypointModel = waypointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;

    this.#waypointModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
  }

  get dateFrom() {
    const points = this.#waypointModel.waypoints;
    return points.at(0)?.dateFrom;
  }

  get dateTo() {
    const points = this.#waypointModel.waypoints;
    return points.at(-1)?.dateTo;
  }

  get destinationNames() {
    const points = this.#waypointModel.waypoints;
    const destinations = points.map((item) => this.#destinationModel.getDestinationsById(item.destination));
    const destinationNames = [];
    destinations.map((item) => {
      destinationNames.push(item.name);
    });
    return destinationNames;
  }

  get totalCost() {
    const points = this.#waypointModel.waypoints;
    const totalBasePrice = points.map((item) => item.basePrice).reduce((acc, number) => acc + number, 0);
    const allOffersWaypoints = points.map((item) => this.#offersModel.getOffersById(item.type, item.offersId));
    const allOffersWaypointsPrice = [];
    allOffersWaypoints.map((item) => {
      if (item !== null) {
        item.map((innerItem) => allOffersWaypointsPrice.push(innerItem.price));
      }
    });
    return allOffersWaypointsPrice.reduce((acc, number) => acc + number, 0) + totalBasePrice;
  }

  init() {
    const prevTripInfoComponents = this.#tripInfoComponent;
    const dateFrom = this.dateFrom;
    const dateTo = this.dateTo;
    const destinationNames = this.destinationNames;
    const totalCost = this.totalCost;
    if (totalCost === 0) {
      return;
    }
    this.#tripInfoComponent = new TripInfo({ dateFrom, dateTo, destinationNames, totalCost });

    if (prevTripInfoComponents === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponents);
    remove(prevTripInfoComponents);
  }

  destroy() {
    if (this.#tripInfoComponent === null) {
      return;
    }

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }

  #handleModelEvent = () => {
    this.init();
  };
}
