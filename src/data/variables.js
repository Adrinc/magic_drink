import { atom } from 'nanostores';

export const isEnglish = atom(true); // Cambio: true = inglés por defecto
export let defaultLang = 'en'; // Cambio: 'en' por defecto

export function getLangFromUrl(url) {
    const [, lang] = url.pathname.split('/');
    if (lang=="en") return 'en';
    if (lang=="es") return 'es';
    return defaultLang;
  }

export async function getLangBoolean() {
   
    let pivote = isEnglish.value;

    return pivote;
  }

export const selectedCountry = atom(
  typeof window !== 'undefined' && localStorage.getItem('selectedCountry')
    ? localStorage.getItem('selectedCountry')
    : 'usa' // Cambio: 'usa' por defecto para coincidir con inglés
);

selectedCountry.subscribe((value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedCountry', value);
  }
});
