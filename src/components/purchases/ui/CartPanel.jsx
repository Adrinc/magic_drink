import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  X,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { 
  $cart, 
  $cartTotal, 
  $cartItemCount,
  $selectedCostCenter,
  $budgetInfo,
  updateCartItemQty, 
  removeFromCart, 
  clearCart 
} from '../../../stores/purchasesStore';
import { getProductById, getContractPrice } from '../../../data/purchases/products';
import { formatCurrency } from '../../../data/purchases/seed';
import Badge from './Badge';
import styles from './ui.module.css';

const CartPanel = ({ onCreateRequest }) => {
  const cart = useStore($cart);
  const cartTotal = useStore($cartTotal);
  const cartItemCount = useStore($cartItemCount);
  const costCenter = useStore($selectedCostCenter);
  const budgetInfo = useStore($budgetInfo);
  const [isExpanded, setIsExpanded] = useState(true);

  const isEmpty = cart.length === 0;
  const wouldExceedBudget = budgetInfo.available < cartTotal;

  const handleQtyChange = (productId, useContract, delta) => {
    const item = cart.find(i => i.productId === productId && i.useContract === useContract);
    if (item) {
      const newQty = item.qty + delta;
      updateCartItemQty(productId, newQty, useContract);
    }
  };

  const handleRemove = (productId, useContract) => {
    removeFromCart(productId, useContract);
  };

  return (
    <aside className={styles.cartPanel}>
      
      {/* Header */}
      <div className={styles.cartHeader}>
        <div className={styles.cartHeaderContent}>
          <ShoppingCart size={20} />
          <h3 className={styles.cartTitle}>Carrito de Compras</h3>
          {cartItemCount > 0 && (
            <Badge variant="primary" size="sm">
              {cartItemCount}
            </Badge>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.cartToggle}
          aria-label={isExpanded ? 'Colapsar carrito' : 'Expandir carrito'}
        >
          {isExpanded ? <X size={18} /> : <ShoppingCart size={18} />}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Items List */}
          <div className={styles.cartItems}>
            {isEmpty ? (
              <div className={styles.cartEmpty}>
                <ShoppingCart size={48} />
                <p>Tu carrito está vacío</p>
                <span>Agrega productos del catálogo</span>
              </div>
            ) : (
              cart.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                
                const price = item.useContract 
                  ? getContractPrice(product) 
                  : product.price;
                const subtotal = price * item.qty;

                return (
                  <div key={`${item.productId}-${item.useContract}`} className={styles.cartItem}>
                    
                    {/* Image */}
                    <div className={styles.cartItemImage}>
                      <img 
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    {/* Content */}
                    <div className={styles.cartItemContent}>
                      <h4 className={styles.cartItemName}>{product.name}</h4>
                      
                      <div className={styles.cartItemPrice}>
                        <span>{formatCurrency(price)}</span>
                        {item.useContract && product.contractAvailable && (
                          <Badge variant="cyan" size="sm">Contrato</Badge>
                        )}
                      </div>

                      {/* Qty Controls */}
                      <div className={styles.cartItemActions}>
                        <div className={styles.qtyControls}>
                          <button
                            onClick={() => handleQtyChange(item.productId, item.useContract, -1)}
                            className={styles.qtyButton}
                            disabled={item.qty <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={styles.qtyValue}>{item.qty}</span>
                          <button
                            onClick={() => handleQtyChange(item.productId, item.useContract, 1)}
                            className={styles.qtyButton}
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.productId, item.useContract)}
                          className={styles.cartItemRemove}
                          aria-label="Eliminar del carrito"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className={styles.cartItemSubtotal}>
                        Subtotal: <strong>{formatCurrency(subtotal)}</strong>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {!isEmpty && (
            <>
              {/* Impact Summary */}
              <div className={styles.cartImpact}>
                <h4 className={styles.cartImpactTitle}>
                  <TrendingUp size={16} />
                  Impacto Estimado
                </h4>
                
                <div className={styles.cartImpactRow}>
                  <span>Centro de Costo:</span>
                  <strong>{costCenter}</strong>
                </div>
                
                <div className={styles.cartImpactRow}>
                  <span>Disponible:</span>
                  <strong>{formatCurrency(budgetInfo.available)}</strong>
                </div>
                
                <div className={styles.cartImpactRow}>
                  <span>A Comprometer:</span>
                  <strong className={styles.cartImpactHighlight}>
                    {formatCurrency(cartTotal)}
                  </strong>
                </div>

                <div className={styles.cartImpactRow}>
                  <span>Restante:</span>
                  <strong className={wouldExceedBudget ? styles.cartImpactError : ''}>
                    {formatCurrency(budgetInfo.available - cartTotal)}
                  </strong>
                </div>

                {wouldExceedBudget && (
                  <div className={styles.cartWarning}>
                    <AlertCircle size={16} />
                    <span>Excede presupuesto disponible</span>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className={styles.cartFooter}>
                <div className={styles.cartTotal}>
                  <span>Total:</span>
                  <strong>{formatCurrency(cartTotal)}</strong>
                </div>

                <button
                  onClick={onCreateRequest}
                  className={styles.cartButtonPrimary}
                  disabled={wouldExceedBudget}
                >
                  Crear Solicitud de Compra
                </button>

                <button
                  onClick={clearCart}
                  className={styles.cartButtonSecondary}
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </>
      )}
    </aside>
  );
};

export default CartPanel;
