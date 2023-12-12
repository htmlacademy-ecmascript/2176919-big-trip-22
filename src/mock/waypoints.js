import { PLACES, VEHICLES, CITIES, DESCRIPTION, PHOTO, OFFER_TITLE } from './data.js';
import { getRandomInteger, getRandomArrayElement } from './utils.js';

const mockOptions = [
  {
    'type': PLACES[0],
    'offers': [{
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': PLACES[1],
    'offers': [{
      'title': OFFER_TITLE[4],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[5],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': PLACES[2],
    'offers': [{
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': VEHICLES[0],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[1],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[5],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': VEHICLES[1],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': VEHICLES[2],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': VEHICLES[3],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': VEHICLES[4],
    'offers': [{
      'title': OFFER_TITLE[1],
      'price': getRandomInteger(50, 200),
    }]
  },
  {
    'type': VEHICLES[5],
    'offers': [{
      'title': OFFER_TITLE[0],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[1],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[2],
      'price': getRandomInteger(50, 200),
    },
    {
      'title': OFFER_TITLE[3],
      'price': getRandomInteger(50, 200),
    }]
  }
];

const mockDestination = [
  {
    'description': `${DESCRIPTION[0]}. ${DESCRIPTION[2]}`,
    'name': CITIES[0],
    'photos': [
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      }
    ],
  },
  {
    'description': `${DESCRIPTION[1]}. ${DESCRIPTION[3]}. ${DESCRIPTION[2]}`,
    'name': CITIES[1],
    'photos': [
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      }
    ],
  },
  {
    'description': `${DESCRIPTION[4]}. ${DESCRIPTION[2]}. ${DESCRIPTION[3]}. ${DESCRIPTION[1]}`,
    'name': CITIES[2],
    'photos': [
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      },
      {
        'src': `${PHOTO}${getRandomInteger(1, 20)}`,
      }
    ],
  }
];

const mockData = [
  {
    'date-from': new Date(),
    'date-to': new Date(),
    'is-favorite': false,
  },
  {
    'date-from': new Date(),
    'date-to': new Date(),
    'is-favorite': true,
  }
];

function getRandomWaypoint() {
  const options = getRandomArrayElement(mockOptions);
  const data = getRandomArrayElement(mockData);
  const { type, offers } = options;

  return [{
    totalAmount: offers.map((item) => item.price).reduce((a, b) => a + b, 0),
    dateFrom: data['date-from'],
    dateTo: data['date-to'],
    destination: getRandomArrayElement(mockDestination),
    favorite: data['is-favorite'],
    offers,
    type,
  }];
}

export { getRandomWaypoint };
