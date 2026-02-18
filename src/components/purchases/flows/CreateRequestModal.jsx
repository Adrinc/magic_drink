import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Building2, 
  AlertTriangle,
  FileText,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';
import { 
  $cart, 
  $cartTotal,
  $selectedCostCenter,
  $budgetInfo,
  createRequest,
  setActiveTab
} from '../../../stores/purchasesStore';
import { getProductById } from '../../../data/purchases/products';
import { formatCurrency } from '../../../data/purchases/seed';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import styles from './flows.module.css';

const PRIORITIES = [
  { id: 'Normal', label: 'Normal', description: 'Tiempo estándar de entrega' },
  { id: 'Urgente', label: 'Urgente', description: 'Requiere aprobación expedita' }
];

const CreateRequestModal = ({ isOpen, onClose }) => {
  const cart = useStore($cart);
  const cartTotal = useStore($cartTotal);
  const costCenter = useStore($selectedCostCenter);
  const budgetInfo = useStore($budgetInfo);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    requesterName: '',
    costCenter: costCenter,
    priority: 'Normal',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const newRequest = createRequest(formData);
    
    if (newRequest) {
      // Cerrar modal
      onClose();
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        requesterName: '',
        costCenter: costCenter,
        priority: 'Normal',
        notes: ''
      });
      
      // Cambiar a tab Solicitudes
      setTimeout(() => {
        setActiveTab('requests');
      }, 100);
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setFormData({
      requesterName: '',
      costCenter: costCenter,
      priority: 'Normal',
      notes: ''
    });
    onClose();
  };

  const wouldExceedBudget = budgetInfo.available < cartTotal;
  const canSubmit = formData.requesterName.trim() && !wouldExceedBudget;

  // Step 1: Datos Generales
  const renderStep1 = () => (
    <div className={styles.wizardStep}>
      <div className={styles.wizardStepHeader}>
        <User size={24} className={styles.wizardStepIcon} />
        <div>
          <h3 className={styles.wizardStepTitle}>Datos Generales</h3>
          <p className={styles.wizardStepDescription}>
            Ingresa la información básica de la solicitud
          </p>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="requesterName" className={styles.formLabel}>
          Nombre del Solicitante <span className={styles.formRequired}>*</span>
        </label>
        <input
          id="requesterName"
          type="text"
          value={formData.requesterName}
          onChange={(e) => handleInputChange('requesterName', e.target.value)}
          placeholder="Tu nombre completo"
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="costCenter" className={styles.formLabel}>
          Centro de Costo <span className={styles.formRequired}>*</span>
        </label>
        <select
          id="costCenter"
          value={formData.costCenter}
          onChange={(e) => handleInputChange('costCenter', e.target.value)}
          className={styles.formSelect}
        >
          <option value="TI">TI</option>
          <option value="Oficina">Oficina</option>
          <option value="Marketing">Marketing</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Prioridad <span className={styles.formRequired}>*</span>
        </label>
        <div className={styles.radioGroup}>
          {PRIORITIES.map(priority => (
            <label key={priority.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="priority"
                value={priority.id}
                checked={formData.priority === priority.id}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.radioCard}>
                <span className={styles.radioTitle}>{priority.label}</span>
                <span className={styles.radioDescription}>{priority.description}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Resumen
  const renderStep2 = () => (
    <div className={styles.wizardStep}>
      <div className={styles.wizardStepHeader}>
        <ShoppingBag size={24} className={styles.wizardStepIcon} />
        <div>
          <h3 className={styles.wizardStepTitle}>Resumen de Items</h3>
          <p className={styles.wizardStepDescription}>
            Verifica los productos seleccionados
          </p>
        </div>
      </div>

      <div className={styles.summaryItems}>
        {cart.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          
          const price = product.price;
          const subtotal = price * item.qty;

          return (
            <div key={`${item.productId}-${item.useContract}`} className={styles.summaryItem}>
              <div className={styles.summaryItemImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.summaryItemInfo}>
                <h4 className={styles.summaryItemName}>{product.name}</h4>
                <div className={styles.summaryItemDetails}>
                  <span>Cantidad: {item.qty}</span>
                  <span>•</span>
                  <span>{formatCurrency(price)} c/u</span>
                  {item.useContract && product.contractAvailable && (
                    <>
                      <span>•</span>
                      <Badge variant="cyan" size="sm">Contrato</Badge>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.summaryItemSubtotal}>
                {formatCurrency(subtotal)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summaryTotals}>
        <div className={styles.summaryRow}>
          <span>Centro de Costo:</span>
          <strong>{formData.costCenter}</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Presupuesto Disponible:</span>
          <strong>{formatCurrency(budgetInfo.available)}</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Total a Comprometer:</span>
          <strong className={styles.summaryHighlight}>
            {formatCurrency(cartTotal)}
          </strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Restante:</span>
          <strong className={wouldExceedBudget ? styles.summaryError : ''}>
            {formatCurrency(budgetInfo.available - cartTotal)}
          </strong>
        </div>
      </div>

      {wouldExceedBudget && (
        <div className={styles.summaryWarning}>
          <AlertTriangle size={20} />
          <div>
            <strong>Presupuesto insuficiente</strong>
            <p>El monto total excede el presupuesto disponible para {formData.costCenter}</p>
          </div>
        </div>
      )}
    </div>
  );

  // Step 3: Notas
  const renderStep3 = () => (
    <div className={styles.wizardStep}>
      <div className={styles.wizardStepHeader}>
        <FileText size={24} className={styles.wizardStepIcon} />
        <div>
          <h3 className={styles.wizardStepTitle}>Notas y Justificación</h3>
          <p className={styles.wizardStepDescription}>
            Agrega información adicional (opcional)
          </p>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="notes" className={styles.formLabel}>
          Notas o Comentarios
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="Describe el propósito de esta compra, justificación, o información relevante..."
          className={styles.formTextarea}
          rows={6}
        />
        <span className={styles.formHint}>
          Máximo 500 caracteres ({formData.notes.length}/500)
        </span>
      </div>

      <div className={styles.summaryBox}>
        <div className={styles.summaryBoxHeader}>
          <CheckCircle size={20} />
          <h4>Resumen Final</h4>
        </div>
        <div className={styles.summaryBoxContent}>
          <div className={styles.summaryBoxRow}>
            <span>Solicitante:</span>
            <strong>{formData.requesterName || '-'}</strong>
          </div>
          <div className={styles.summaryBoxRow}>
            <span>Centro de Costo:</span>
            <strong>{formData.costCenter}</strong>
          </div>
          <div className={styles.summaryBoxRow}>
            <span>Prioridad:</span>
            <Badge variant={formData.priority === 'Urgente' ? 'error' : 'info'} size="sm">
              {formData.priority}
            </Badge>
          </div>
          <div className={styles.summaryBoxRow}>
            <span>Items:</span>
            <strong>{cart.length} producto{cart.length !== 1 ? 's' : ''}</strong>
          </div>
          <div className={styles.summaryBoxRow}>
            <span>Total:</span>
            <strong className={styles.summaryHighlight}>{formatCurrency(cartTotal)}</strong>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const footer = (
    <div className={styles.wizardFooter}>
      <div className={styles.wizardProgress}>
        <span className={styles.wizardProgressText}>
          Paso {currentStep} de 3
        </span>
        <div className={styles.wizardProgressBar}>
          {[1, 2, 3].map(step => (
            <div
              key={step}
              className={`${styles.wizardProgressDot} ${step <= currentStep ? styles.wizardProgressDotActive : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.wizardActions}>
        <button
          onClick={handleCancel}
          className={styles.wizardButtonSecondary}
        >
          Cancelar
        </button>

        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className={styles.wizardButtonSecondary}
          >
            <ChevronLeft size={18} />
            Anterior
          </button>
        )}

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className={styles.wizardButtonPrimary}
            disabled={currentStep === 1 && !formData.requesterName.trim()}
          >
            Siguiente
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={styles.wizardButtonPrimary}
            disabled={!canSubmit}
          >
            <CheckCircle size={18} />
            Crear Solicitud
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Nueva Solicitud de Compra"
      footer={footer}
      size="lg"
      closeOnOverlay={false}
    >
      {renderCurrentStep()}
    </Modal>
  );
};

export default CreateRequestModal;
