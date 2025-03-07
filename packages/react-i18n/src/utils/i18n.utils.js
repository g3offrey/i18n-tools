import _ from 'lodash';
import { sprintf } from 'sprintf-js';

const pluralizeFunctions = {
  en: number => (number === 0 || number > 1 ? 'other' : 'one'),
  fr: number => (number > 1 ? 'other' : 'one'),
  hu: (number, general) => {
    if (!general) {
      return 'one';
    }

    return number > 1 ? 'other' : 'one';
  },
  hr: (number, general) => {
    // General plural
    if (general) {
      return number > 1 ? 'other' : 'one';
    }

    const numberInString = number.toString();
    const lastDigit = numberInString.charAt(numberInString.length - 1);

    if ((number > 4 && number < 21) || ['0', '5', '6', '7', '8', '9'].includes(lastDigit)) {
      // Third plural form
      return 'many';
    } else if (lastDigit === '1') {
      // First plural form and singular
      return 'one';
    } else if (lastDigit === '2' || lastDigit === '3' || lastDigit === '4') {
      // Second plural form
      return 'few';
    }

    return '';
  },
};

export const translate = (lang, i18nNames = {}) => {
  const pluralize = pluralizeFunctions[_.get(lang, '_i18n.lang')] || pluralizeFunctions.fr;

  return (key, data = {}, number, general) => {
    let combineKey = key;
    // Pluralize
    if (typeof number !== 'undefined') {
      combineKey = `${key}.${pluralize(number, general)}`;
    }

    const translation = _.get(lang, combineKey, combineKey);

    return sprintf(translation, { ...data, ...i18nNames, number });
  };
};

export const buildList = lang => (list, maxSize) => {
  const separator = _.get(lang, '_i18n.separator');
  const lastSeparator = _.get(lang, '_i18n.and');

  if (!list || !list.length) {
    return '';
  }

  if (list.length === 1) {
    return list[0];
  }

  const lastIndex = list.length - 1;
  const subList = list.slice(0, lastIndex).join(separator);
  const result = `${subList}${lastSeparator}${list[lastIndex]}`;

  return result.length > maxSize ? `${result.substring(0, maxSize)}...` : result;
};
