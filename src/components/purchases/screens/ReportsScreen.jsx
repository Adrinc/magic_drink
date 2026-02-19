import React from 'react';
import { useStore } from "@nanostores/react";
import { 
  DollarSign, TrendingUp, TrendingDown, Package, 
  FileText, ShoppingCart, PieChart, BarChart3 
} from 'lucide-react';
import { 
  $financialStats, 
  $requestsStats, 
  $ordersStats,
  $spendingByCategory,
  $spendingBySupplier
} from '../../../stores/purchasesStore';
import { formatCurrency } from '../../../data/purchases/seed';
import { categories } from '../../../data/purchases/categories';
import { suppliers } from '../../../data/purchases/suppliers';
import { BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './screens.module.css';

const COLORS = ['#3B82F6', '#22D3EE', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

const ReportsScreen = () => {
  const financial = useStore($financialStats);
  const requestsStats = useStore($requestsStats);
  const ordersStats = useStore($ordersStats);
  const spendingByCategory = useStore($spendingByCategory);
  const spendingBySupplier = useStore($spendingBySupplier);

  // Preparar datos para gráficas
  const categoryChartData = spendingByCategory.map(item => {
    const category = categories.find(c => c.id === item.categoryId);
    return {
      name: category?.name || item.categoryId,
      amount: item.amount
    };
  });

  const supplierChartData = spendingBySupplier.slice(0, 5).map(item => {
    const supplier = suppliers.find(s => s.id === item.supplierId);
    return {
      name: supplier?.name || item.supplierId,
      amount: item.total,
      orders: item.orderCount
    };
  });

  const budgetChartData = [
    { name: 'Disponible', value: financial.available, color: '#10B981' },
    { name: 'Comprometido', value: financial.committed, color: '#F59E0B' },
    { name: 'Gastado', value: financial.spent, color: '#3B82F6' }
  ];

  return (
    <div className={styles.screen}>

      {/* Hero Banner */}
      <div className={`${styles.screenHero} ${styles.reportsHeroBg}`}>
        <div className={styles.screenHeroContent}>
          <div className={styles.screenHeroIcon}>
            <BarChart3 size={28} />
          </div>
          <div className={styles.screenHeroText}>
            <h1>Reportes y Analítica</h1>
            <p>Monitorea el desempeño de compras y presupuesto</p>
          </div>
        </div>
      </div>

      <div className={styles.screenContent}>

        {/* KPIs Financieros */}
        <div className={styles.reportsSection}>
          <h2 className={styles.reportsSectionTitle}>
            <DollarSign size={20} />
            Resumen Financiero
          </h2>
          <div className={styles.reportsKpis}>
            <div className={styles.reportsKpiCard}>
              <div className={styles.reportsKpiIcon} style={{ background: '#3B82F620' }}>
                <DollarSign size={24} color="#3B82F6" />
              </div>
              <div className={styles.reportsKpiContent}>
                <div className={styles.reportsKpiLabel}>Presupuesto Total</div>
                <div className={styles.reportsKpiValue}>{formatCurrency(financial.allocated)}</div>
              </div>
            </div>

            <div className={styles.reportsKpiCard}>
              <div className={styles.reportsKpiIcon} style={{ background: '#F59E0B20' }}>
                <TrendingUp size={24} color="#F59E0B" />
              </div>
              <div className={styles.reportsKpiContent}>
                <div className={styles.reportsKpiLabel}>Comprometido</div>
                <div className={styles.reportsKpiValue}>{formatCurrency(financial.committed)}</div>
                <div className={styles.reportsKpiSubtext}>
                  {((financial.committed / financial.allocated) * 100).toFixed(1)}% del total
                </div>
              </div>
            </div>

            <div className={styles.reportsKpiCard}>
              <div className={styles.reportsKpiIcon} style={{ background: '#3B82F620' }}>
                <ShoppingCart size={24} color="#3B82F6" />
              </div>
              <div className={styles.reportsKpiContent}>
                <div className={styles.reportsKpiLabel}>Gastado</div>
                <div className={styles.reportsKpiValue}>{formatCurrency(financial.spent)}</div>
                <div className={styles.reportsKpiSubtext}>
                  {((financial.spent / financial.allocated) * 100).toFixed(1)}% del total
                </div>
              </div>
            </div>

            <div className={styles.reportsKpiCard}>
              <div className={styles.reportsKpiIcon} style={{ background: '#10B98120' }}>
                <TrendingDown size={24} color="#10B981" />
              </div>
              <div className={styles.reportsKpiContent}>
                <div className={styles.reportsKpiLabel}>Disponible</div>
                <div className={styles.reportsKpiValue}>{formatCurrency(financial.available)}</div>
                <div className={styles.reportsKpiSubtext}>
                  {financial.utilizationPercent}% utilizado
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Operacionales */}
        <div className={styles.reportsSection}>
          <h2 className={styles.reportsSectionTitle}>
            <BarChart3 size={20} />
            Actividad Operacional
          </h2>
          <div className={styles.reportsKpisSmall}>
            <div className={styles.reportsKpiCardSmall}>
              <FileText size={20} color="#3B82F6" />
              <div className={styles.reportsKpiSmallContent}>
                <div className={styles.reportsKpiSmallValue}>{requestsStats.total}</div>
                <div className={styles.reportsKpiSmallLabel}>Solicitudes Totales</div>
              </div>
            </div>

            <div className={styles.reportsKpiCardSmall}>
              <FileText size={20} color="#F59E0B" />
              <div className={styles.reportsKpiSmallContent}>
                <div className={styles.reportsKpiSmallValue}>{requestsStats.pending}</div>
                <div className={styles.reportsKpiSmallLabel}>Solicitudes Pendientes</div>
              </div>
            </div>

            <div className={styles.reportsKpiCardSmall}>
              <Package size={20} color="#22D3EE" />
              <div className={styles.reportsKpiSmallContent}>
                <div className={styles.reportsKpiSmallValue}>{ordersStats.total}</div>
                <div className={styles.reportsKpiSmallLabel}>Órdenes Totales</div>
              </div>
            </div>

            <div className={styles.reportsKpiCardSmall}>
              <Package size={20} color="#10B981" />
              <div className={styles.reportsKpiSmallContent}>
                <div className={styles.reportsKpiSmallValue}>{ordersStats.total - ordersStats.closed}</div>
                <div className={styles.reportsKpiSmallLabel}>Órdenes Activas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.reportsChartsGrid}>
          {/* Budget Distribution - Pie Chart */}
          <div className={styles.reportsChartCard}>
            <h3 className={styles.reportsChartTitle}>
              <PieChart size={18} />
              Distribución de Presupuesto
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={budgetChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </RechartsPie>
            </ResponsiveContainer>
          </div>

          {/* Spending by Category - Bar Chart */}
          <div className={styles.reportsChartCard}>
            <h3 className={styles.reportsChartTitle}>
              <BarChart3 size={18} />
              Gasto por Categoría
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0C1830" />
                <XAxis dataKey="name" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    background: '#0C1830', 
                    border: '1px solid #1E3A60', 
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Suppliers - Bar Chart */}
          <div className={styles.reportsChartCard}>
            <h3 className={styles.reportsChartTitle}>
              <BarChart3 size={18} />
              Top 5 Proveedores
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#0C1830" />
                <XAxis type="number" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#94A3B8" 
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                  width={120}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    background: '#0C1830', 
                    border: '1px solid #1E3A60', 
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                />
                <Bar dataKey="amount" fill="#22D3EE" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats Table */}
          <div className={styles.reportsChartCard}>
            <h3 className={styles.reportsChartTitle}>
              <FileText size={18} />
              Resumen de Proveedores
            </h3>
            <div className={styles.reportsTableSmall}>
              <table className={styles.reportsTable}>
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Órdenes</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierChartData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.orders}</td>
                      <td className={styles.reportsTableAmount}>{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsScreen;
