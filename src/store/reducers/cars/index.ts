import { ICar } from 'models/ICar';
import { CarsAction, CarsActionEnum, CarsState } from './types';

const initialState: CarsState = {
  cars: [],
  carsIsLoading: false,
  carsError: '',
  car: {} as ICar,
  carIsLoading: false,
  carError: '',
  carIsCreate: false,
  carCreateIsLoading: false,
  carCreateError: '',
  carIsDelete: false,
  carDeleteIsLoading: false,
  carDeleteError: '',
};

export default function CarsReducer(state = initialState, action: CarsAction): CarsState {
  switch (action.type) {
    case CarsActionEnum.GET_CARS:
      return { ...state, cars: action.payload, carsIsLoading: false };

    case CarsActionEnum.SET_CARS_IS_LOADING:
      return { ...state, carsIsLoading: action.payload };

    case CarsActionEnum.SET_CARS_ERROR:
      return { ...state, carsError: action.payload, carsIsLoading: false };

    case CarsActionEnum.GET_CAR:
      return { ...state, car: action.payload, carIsLoading: false };

    case CarsActionEnum.SET_CAR_IS_LOADING:
      return { ...state, carIsLoading: action.payload };

    case CarsActionEnum.SET_CAR_ERROR:
      return { ...state, carError: action.payload, carIsLoading: false };

    case CarsActionEnum.SET_CAR_IS_CREATE:
      return { ...state, carIsCreate: action.payload };

    case CarsActionEnum.SET_CAR_CREATE_IS_LOADING:
      return { ...state, carCreateIsLoading: action.payload };

    case CarsActionEnum.SET_CAR_CREATE_ERROR:
      return { ...state, carCreateError: action.payload, carCreateIsLoading: false };

    case CarsActionEnum.SET_CAR_IS_DELETE:
      return { ...state, carIsDelete: action.payload };

    case CarsActionEnum.SET_CAR_DELETE_IS_LOADING:
      return { ...state, carDeleteIsLoading: action.payload };

    case CarsActionEnum.SET_CAR_DELETE_ERROR:
      return { ...state, carDeleteError: action.payload, carDeleteIsLoading: false };

    default:
      return state;
  }
}
