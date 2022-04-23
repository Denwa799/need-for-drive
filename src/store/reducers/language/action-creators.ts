import { SetLanguage, LanguageActionEnum } from './types';

export const LanguageActionCreators = {
  setLanguage: (payload: string): SetLanguage => ({
    type: LanguageActionEnum.SET_LANGUAGE,
    payload,
  }),
};
