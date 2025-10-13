// LangWrapper.jsx
import { LangProvider } from "./signals"; // El archivo que ya tienes con el contexto
import PropTypes from "prop-types"; // Para definir tipos de props, útil si usas TypeScript

const LangWrapper = ({ children, defaultLang = "en" }) => { // Cambio: "en" por defecto
  // Este puede ser un valor predeterminado, pero si ya estás gestionando el idioma en signals.jsx, podemos dejarlo como está.
  return (
    <LangProvider>
      {children}
    </LangProvider>
  );
};

// Definimos las props que aceptará nuestro wrapper (esto es opcional)
LangWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Se espera que sea un nodo React
  defaultLang: PropTypes.string, // Opcional, el idioma predeterminado
};

export default LangWrapper;