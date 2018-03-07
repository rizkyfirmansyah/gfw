export const i18n = (strings, ...variables) => {
  let result = '';
  let translatedStrings = strings;
  const { Transifex } = window;
  if (typeof Transifex !== 'undefined') {
    translatedStrings = strings.map(str => Transifex.live.translateText(str));
  }
  translatedStrings.forEach((str, index) => {
    result += str + (variables[index] || '');
  });
  return result;
};
