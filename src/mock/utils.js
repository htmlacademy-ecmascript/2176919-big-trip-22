import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
dayjs.extend(durationPlugin);
import { FilterType } from './constants.js';

const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizeDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const getDuration = (start, end) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(start)));
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }
  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
};

function checksTravelDates(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => checksTravelDates(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => checksTravelDates(point.dateFrom)),
  [FilterType.FUTURE]: (points) => points.filter((point) => checksTravelDates(point.dateFrom)),
};

export { getRandomInteger, getRandomArrayElement, humanizeDueDate, getDuration, filter };
