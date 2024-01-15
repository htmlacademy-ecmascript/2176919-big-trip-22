import Observable from '../framework/observable.js';
import { getRandomWaypoint } from '../mock/waypoints.js';

const WAYPOINT_COUNT = 7;

export default class WaypointModel extends Observable {
  /**
    * @type {RandomWaypoint[]}
    */
  #waypoints = Array.from({ length: WAYPOINT_COUNT }, getRandomWaypoint);

  /**
    * @returns {RandomWaypoint[]}
    */
  get waypoints() {
    return structuredClone(this.#waypoints);
  }
}
