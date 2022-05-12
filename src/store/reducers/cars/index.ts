import { CarsAction, CarsActionEnum, CarsState } from './types';

const initialState: CarsState = {
  cars: [],
  carsError: '',
  carsIsLoading: false,
};

export default function CarsReducer(state = initialState, action: CarsAction): CarsState {
  switch (action.type) {
    case CarsActionEnum.GET_CARS:
      return { ...state, cars: action.payload, carsIsLoading: false };

    case CarsActionEnum.SET_CARS_IS_LOADING:
      return { ...state, carsIsLoading: action.payload };

    case CarsActionEnum.SET_CARS_ERROR:
      return { ...state, carsError: action.payload, carsIsLoading: false };

    default:
      return state;
  }
}
