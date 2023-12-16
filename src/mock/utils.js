import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 50) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizeDueDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';

const getDuration = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start))).format('DD[D] HH[H] mm[M]');

export { getRandomInteger, getRandomArrayElement, humanizeDueDate, getDuration };
