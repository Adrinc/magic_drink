// Presupuestos por centro de costo
export const budgets = [
  {
    id: 'budget-ti',
    costCenter: 'TI',
    allocated: 500000,    // presupuesto asignado
    committed: 120000,    // comprometido (solicitudes enviadas/aprobadas)
    spent: 85000,         // gastado (órdenes cerradas)
    year: 2026,
    quarter: 'Q1'
  },
  {
    id: 'budget-oficina',
    costCenter: 'Oficina',
    allocated: 300000,
    committed: 45000,
    spent: 22000,
    year: 2026,
    quarter: 'Q1'
  },
  {
    id: 'budget-marketing',
    costCenter: 'Marketing',
    allocated: 200000,
    committed: 30000,
    spent: 18000,
    year: 2026,
    quarter: 'Q1'
  },
  {
    id: 'budget-mantenimiento',
    costCenter: 'Mantenimiento',
    allocated: 150000,
    committed: 20800,
    spent: 12000,
    year: 2026,
    quarter: 'Q1'
  }
];

export function getBudgetByCostCenter(costCenter) {
  return budgets.find(b => b.costCenter === costCenter);
}

export function getBudgetAvailable(costCenter) {
  const budget = getBudgetByCostCenter(costCenter);
  if (!budget) return 0;
  return budget.allocated - budget.committed - budget.spent;
}

export function getBudgetUtilization(costCenter) {
  const budget = getBudgetByCostCenter(costCenter);
  if (!budget || budget.allocated === 0) return 0;
  const used = budget.committed + budget.spent;
  return Math.round((used / budget.allocated) * 100);
}

export function getTotalBudget() {
  return {
    allocated: budgets.reduce((sum, b) => sum + b.allocated, 0),
    committed: budgets.reduce((sum, b) => sum + b.committed, 0),
    spent: budgets.reduce((sum, b) => sum + b.spent, 0)
  };
}

export function canCommit(costCenter, amount) {
  const available = getBudgetAvailable(costCenter);
  return available >= amount;
}
