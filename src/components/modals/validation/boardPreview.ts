import { TFunction } from 'i18next';

const rules = (t: TFunction) => ({
  title: {
    required: {
      value: true,
      message: t('validation.boardPreview.title.required'),
    },
  },
  description: {
    required: {
      value: true,
      message: t('validation.boardPreview.description.required'),
    },
  },
});

export default rules;
