import { TFunction } from 'i18next';

const rules = (t: TFunction) => ({
  name: {
    required: {
      value: true,
      message: t('validation.auth.name.required'),
    },
    minLength: {
      value: 3,
      message: t('validation.auth.name.minLength'),
    },
  },
  login: {
    required: {
      value: true,
      message: t('validation.auth.login.required'),
    },
    minLength: {
      value: 3,
      message: t('validation.auth.login.minLength'),
    },
  },
  password: {
    required: {
      value: true,
      message: t('validation.auth.password.required'),
    },
    minLength: {
      value: 5,
      message: t('validation.auth.password.minLength'),
    },
  },
});

export default rules;
