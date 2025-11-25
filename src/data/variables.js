import { atom } from 'nanostores';

export const isEnglish = atom(true); // Cambio: true = inglés por defecto
export let defaultLang = 'en'; // Cambio: 'en' por defecto

// Theme Management (Dark Mode por defecto)
export const isDarkMode = atom(
  typeof window !== 'undefined' && localStorage.getItem('theme')
    ? localStorage.getItem('theme') === 'dark'
    : true // Dark mode por defecto
);

// Sincronizar con localStorage
if (typeof window !== 'undefined') {
  isDarkMode.subscribe((value) => {
    localStorage.setItem('theme', value ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light');
  });
  
  // Aplicar tema inicial
  const initialTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);
}

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
