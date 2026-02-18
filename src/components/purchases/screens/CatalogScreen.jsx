import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { Search, Filter, X } from 'lucide-react';
import { 
  $searchQuery, 
  $selectedCategory,
  $contractOnly,
  setSearchQuery,
  setSelectedCategory,
  setContractOnly
} from '../../../stores/purchasesStore';
import { products } from '../../../data/purchases/products';
import { categories } from '../../../data/purchases/categories';
import ProductCard from '../ui/ProductCard';
import CartPanel from '../ui/CartPanel';
import Badge from '../ui/Badge';
import styles from './screens.module.css';

const CatalogScreen = ({ onCreateRequest }) => {
  const searchQuery = useStore($searchQuery);
  const selectedCategory = useStore($selectedCategory);
  const contractOnly = useStore($contractOnly);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    // Búsqueda por texto
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      if (!matchesName && !matchesDescription) return false;
    }

    // Filtro por categoría
    if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
      return false;
    }

    // Filtro por contrato
    if (contractOnly && !product.contractAvailable) {
      return false;
    }

    return true;
  });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setContractOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || contractOnly;

  return (
    <div className={styles.catalogScreen}>
      
      {/* Hero Section */}
      <div className={styles.catalogHero}>
        <div className={styles.catalogHeroContent}>
          <h1 className={styles.catalogTitle}>Catálogo Interno</h1>
          <p className={styles.catalogDescription}>
            Explora productos y servicios autorizados para tu departamento
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.catalogSearchBar}>
        <div className={styles.searchInputWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={styles.searchClear}
              aria-label="Limpiar búsqueda"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={styles.filterButton}
        >
          <Filter size={18} />
          <span>Filtros</span>
          {hasActiveFilters && <Badge variant="primary" size="sm">•</Badge>}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={styles.catalogFilters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <input
                type="checkbox"
                checked={contractOnly}
                onChange={(e) => setContractOnly(e.target.checked)}
                className={styles.filterCheckbox}
              />
              <span>Solo con descuento por contrato</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className={styles.filterClear}
            >
              <X size={16} />
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Category Chips */}
      <div className={styles.catalogCategories}>
        <button
          onClick={() => handleCategoryChange('all')}
          className={`${styles.categoryChip} ${selectedCategory === 'all' ? styles.categoryChipActive : ''}`}
        >
          Todos
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`${styles.categoryChip} ${selectedCategory === category.id ? styles.categoryChipActive : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.catalogContent}>
        
        {/* Products Grid */}
        <div className={styles.catalogGrid}>
          {filteredProducts.length === 0 ? (
            <div className={styles.catalogEmpty}>
              <Search size={64} />
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar los filtros o la búsqueda</p>
              {hasActiveFilters && (
                <button onClick={handleClearFilters} className={styles.catalogEmptyButton}>
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Cart Panel */}
        <CartPanel onCreateRequest={onCreateRequest} />
      </div>

      {/* Results Count */}
      <div className={styles.catalogFooter}>
        <p className={styles.resultsCount}>
          {filteredProducts.length === 1 
            ? '1 producto encontrado'
            : `${filteredProducts.length} productos encontrados`
          }
        </p>
      </div>
    </div>
  );
};

export default CatalogScreen;
