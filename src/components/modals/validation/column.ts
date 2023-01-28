import { TFunction } from 'i18next';

const rules = (t: TFunction) => ({
  title: {
    required: {
      value: true,
      message: t('validation.column.title.required'),
    },
    maxLength: {
      value: 20,
      message: t('validation.column.title.maxLength'),
    },
  },
});

export default rules;
