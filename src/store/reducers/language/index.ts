import { LanguageAction, LanguageActionEnum, LanguageState } from './types';

const initialState: LanguageState = {
  language: 'rus',
};

export default function LanguageReducer(state = initialState, action: LanguageAction) {
  switch (action.type) {
    case LanguageActionEnum.SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
