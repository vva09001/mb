export const getToken = () => {
  const localStore = JSON.parse(localStorage.getItem('persist:root'));
  let token = '';
  if (localStore !== null) {
    const profile = JSON.parse(localStore.AuthReducer);
    token = profile.profile.token;
  }
  return token;
};

export const setLang = lang => {
  if (lang) {
    window.location.reload();
    return localStorage.setItem('lang', JSON.stringify(lang));
  }
  return null;
};

export const getLang = () => {
  const lang = JSON.parse(localStorage.getItem('lang'));
  if (lang) {
    return lang;
  }
  return 'vi';
};
