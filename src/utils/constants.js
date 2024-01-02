const DATE_FORMAT = {
  day: 'MMM D',
  hoursMinutes: 'HH:mm',
  year: 'DD/MM/YY HH:mm',
  fullDate: 'YYYY-MM-DD',
};
const CLASS_NAME = {
  'Add luggage': 'luggage',
  'Switch to comfort class': 'comfort',
  'Add meal': 'meal',
  'Choose seats': 'seats',
  'Travel by train': 'train',
  'Order Uber': 'uber',
};
const TextNoEvent = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};
const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SORTING = ['day', 'event', 'time', 'price', 'offers'];
const SORT_TYPE = ['day', 'time', 'price'];

export { DATE_FORMAT, CLASS_NAME, TextNoEvent, FilterType, Mode, SORTING, SORT_TYPE };
