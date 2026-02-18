import React from 'react';
import { ShoppingCart, Tag, TrendingDown } from 'lucide-react';
import { addToCart } from '../../../stores/purchasesStore';
import { getSupplierName } from '../../../data/purchases/suppliers';
import { getContractPrice } from '../../../data/purchases/products';
import { formatCurrency } from '../../../data/purchases/seed';
import Badge from './Badge';
import styles from './ui.module.css';

const ProductCard = ({ product }) => {
  const contractPrice = getContractPrice(product);
  const hasDiscount = product.contractAvailable && contractPrice < product.price;
  const supplierName = getSupplierName(product.supplierId);
  
  const handleAddToCart = (useContract = true) => {
    addToCart(product.id, 1, useContract);
  };

  return (
    <article className={styles.productCard}>
      
      {/* Image */}
      <div className={styles.productImage}>
        <img 
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.contractAvailable && (
          <div className={styles.productBadgeOverlay}>
            <Badge variant="cyan" size="sm">
              <Tag size={12} />
              <span>Por Contrato</span>
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.productContent}>
        
        {/* Category & Supplier */}
        <div className={styles.productMeta}>
          <span className={styles.productSupplier}>{supplierName}</span>
        </div>

        {/* Title */}
        <h3 className={styles.productTitle}>{product.name}</h3>

        {/* Description */}
        <p className={styles.productDescription}>{product.description}</p>

        {/* Price */}
        <div className={styles.productPricing}>
          {hasDiscount ? (
            <>
              <div className={styles.productPriceGroup}>
                <span className={styles.productPriceOld}>
                  {formatCurrency(product.price)}
                </span>
                <span className={styles.productPrice}>
                  {formatCurrency(contractPrice)}
                </span>
              </div>
              <div className={styles.productDiscount}>
                <TrendingDown size={14} />
                <span>{Math.round(product.contractDiscount * 100)}% OFF</span>
              </div>
            </>
          ) : (
            <span className={styles.productPrice}>
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <div className={styles.productStock}>
          <Badge 
            variant={product.stock === 'available' ? 'success' : 'warning'} 
            size="sm"
          >
            {product.stock === 'available' ? 'Disponible' : 'Bajo Pedido'}
          </Badge>
          <span className={styles.productLeadTime}>
            {product.leadTimeDays} días
          </span>
        </div>

        {/* Actions */}
        <div className={styles.productActions}>
          <button
            onClick={() => handleAddToCart(hasDiscount)}
            className={styles.productButton}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart size={18} />
            <span>Agregar al Carrito</span>
          </button>
        </div>

      </div>
    </article>
  );
};

export default ProductCard;
