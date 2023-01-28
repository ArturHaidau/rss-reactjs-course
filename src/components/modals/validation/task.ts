import { TFunction } from 'i18next';

const rules = (t: TFunction) => ({
  title: {
    required: {
      value: true,
      message: t('validation.task.title.required'),
    },
  },
  description: {
    required: {
      value: true,
      message: t('validation.task.description.required'),
    },
  },
});

export default rules;
