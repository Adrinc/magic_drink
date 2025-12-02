import { useStore } from '@nanostores/react';
import { isEnglish } from '../../data/variables';
import styles from './css/button.module.css';

/**
 * Button - Componente de botón reutilizable con gradiente CTA de Energy Media
 * 
 * @param {Object} props
 * @param {string} props.textEs - Texto en español
 * @param {string} props.textEn - Texto en inglés
 * @param {string} [props.href] - URL de destino (opcional). Si no se proporciona, el botón no navega
 * @param {string} [props.variant='primary'] - Variante del botón: 'primary' | 'secondary' | 'outline'
 * @param {string} [props.size='md'] - Tamaño: 'sm' | 'md' | 'lg'
 * @param {boolean} [props.fullWidth=false] - Si ocupa el 100% del ancho
 * @param {boolean} [props.showArrow=false] - Mostrar flecha al final
 * @param {string} [props.icon] - Icono al inicio (emoji o texto)
 * @param {string} [props.className] - Clases adicionales
 * @param {boolean} [props.external=false] - Si el link es externo (abre en nueva pestaña)
 * @param {Function} [props.onClick] - Función onClick personalizada
 * @param {string} [props.type='button'] - Tipo de botón: 'button' | 'submit'
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 */
const Button = ({
  textEs,
  textEn,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showArrow = false,
  icon,
  className = '',
  external = false,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const ingles = useStore(isEnglish);
  const text = ingles ? textEn : textEs;

  // Construir clases del botón
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  // Contenido interno del botón
  const ButtonContent = () => (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
      {showArrow && <span className={styles.arrow}>→</span>}
    </>
  );

  // Si tiene href, renderizar como enlace
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        <span className={styles.bgOverlay}></span>
        <ButtonContent />
      </a>
    );
  }

  // Si no tiene href, renderizar como botón
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.bgOverlay}></span>
      <ButtonContent />
    </button>
  );
};

export default Button;
