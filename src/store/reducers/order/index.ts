import { OrderAction, OrderActionEnum, OrderState } from './types';

const initialState: OrderState = {
  order: {
    updatedAt: 0,
    createdAt: 0,
    orderStatusId: {
      name: '',
      id: '',
    },
    cityId: {
      name: '',
      id: '',
    },
    pointId: {
      name: '',
      address: '',
      id: '',
    },
    carId: {
      description: '',
      priceMin: 0,
      priceMax: 0,
      name: '',
      number: '',
      categoryId: {
        name: '',
        description: '',
        id: '',
      },
      thumbnail: {
        size: 0,
        path: '',
        originalname: '',
        mimetype: '',
      },
      tank: 0,
      colors: [],
      id: '',
    },
    color: '',
    dateFrom: 0,
    dateTo: 0,
    rateId: {
      price: 0,
      rateTypeId: {
        unit: '',
        name: '',
        id: '',
      },
      id: '',
    },
    price: 0,
    isFullTanK: false,
    isNeedChildChair: false,
    isRightWheel: false,
    id: '',
  },
  orderId: '',
  orderError: '',
  orderIsLoading: false,
};

export default function OrderReducer(state = initialState, action: OrderAction): OrderState {
  switch (action.type) {
    case OrderActionEnum.GET_ORDER:
      return { ...state, order: action.payload };

    case OrderActionEnum.SET_ORDER_ID:
      return { ...state, orderId: action.payload };

    case OrderActionEnum.SET_ORDER_IS_LOADING:
      return { ...state, orderIsLoading: action.payload };

    case OrderActionEnum.SET_ORDER_ERROR:
      return { ...state, orderError: action.payload, orderIsLoading: false };

    default:
      return state;
  }
}
