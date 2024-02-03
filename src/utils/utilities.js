import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
dayjs.extend(durationPlugin);
import { FilterType } from './constants.js';
const humanizeDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const HOURS_COUNT = 24;
const MINUTES_COUNT = 60;

const getDuration = (start, end) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  const totalDays = duration.asDays();
  const days = Math.floor(totalDays);
  let hours = Math.floor((totalDays - days) * HOURS_COUNT);
  let minutes = Math.floor(duration.asMinutes() - days * HOURS_COUNT * MINUTES_COUNT - hours * MINUTES_COUNT);
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
};

function checksTravelIsSame(point) {
  const { dateFrom, dateTo } = point;
  const currentDate = dayjs();

  for (let date = dayjs(dateFrom); date <= dayjs(dateTo); date = date.add(1, 'day')) {
    if (date.isSame(currentDate, 'day')) {
      return true;
    }
  }

  return false;
}

function checksTravelIsBefore(dueDate) {
  return dueDate && dayjs(dueDate).isBefore(dayjs());
}

function checksTravelIsAfter(dueDate) {
  return dueDate && dayjs(dueDate).isAfter(dayjs());
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => checksTravelIsBefore(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => checksTravelIsSame(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => checksTravelIsAfter(point.dateFrom)),
};

function sortWaypointByDate(waypointA, waypointB) {
  if (waypointA.dateFrom > waypointB.dateFrom) {
    return 1;
  }
  if (waypointA.dateFrom < waypointB.dateFrom) {
    return -1;
  }
  return 0;
}

function sortWaypointByDuration(waypointA, waypointB) {

  const getDurationBySort = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start)));

  if (getDurationBySort(waypointA.dateFrom, waypointA.dateTo) < getDurationBySort(waypointB.dateFrom, waypointB.dateTo)) {
    return 1;
  }
  if (getDurationBySort(waypointA.dateFrom, waypointA.dateTo) > getDurationBySort(waypointB.dateFrom, waypointB.dateTo)) {
    return -1;
  }
  return 0;
}

function sortWaypointByPrice(waypointA, waypointB) {
  if (Number(waypointA.basePrice) < Number(waypointB.basePrice)) {
    return 1;
  }
  if (Number(waypointA.basePrice) > Number(waypointB.basePrice)) {
    return -1;
  }
  return 0;
}

function formatNames(items) {
  items = structuredClone(items);
  if (items.length > 3) {
    items.splice(1, items.length - 2, '...');
  }
  return items.join(' — ');
}

function handleButtonDisabled(value, component) {
  component.element.disabled = value;
}

export { humanizeDueDate, getDuration, filter, sortWaypointByDate, sortWaypointByDuration, sortWaypointByPrice, formatNames, handleButtonDisabled };
