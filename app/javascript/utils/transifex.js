export const i18n = async (string, params) => {
  const { Transifex } = window;
  let translatedString = string;
  if (Transifex) {
    const test = await Transifex.live.translateText(string);
    console.log(test);
  }
  Object.keys(params).forEach(p => {
    translatedString = translatedString.replace(`{${p}}`, params[p]);
  });
  return translatedString;
};
