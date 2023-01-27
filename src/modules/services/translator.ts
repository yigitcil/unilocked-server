let language: string = "tr";

export function tr(key: string) {
  const locale = require("../../locales/" + language + ".json");
  return locale[key] || key;
}

export function init(lang: string) {
  language = lang;
}
