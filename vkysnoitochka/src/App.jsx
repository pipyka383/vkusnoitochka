import { useState, useMemo } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import ComboCard from './components/ComboCard'
import menuData from './data/menu.json'

const categories = [
  'Новинки', 'Только в Доставке', 'Комбо', 'Сеты и пары',
  'Напитки', 'Бургеры и роллы'
]

const moreCategories = [
  'Картофель, снеки и салаты',
  'Десерты',
  'Кафе',
  'Кидз Комбо',
  'Соусы, пакет, салфетка'
]

function App() {
  const [activeCategory, setActiveCategory] = useState('Новинки')
  const [moreOpen, setMoreOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const filteredData = useMemo(() => {
    if (activeCategory === 'Только в Доставке') {
      return menuData
    }
    return []
  }, [activeCategory])

  return (
    <div className="container">
      <Header />
      <Banner />

      <h2 className="menu-title">Меню</h2>

      <div className="menu-sections">
        {categories.map(cat => (
          <button
            key={cat}
            className={cat === activeCategory ? 'active' : ''}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}

        <div className="more-wrap">
          <button
            className={`more-btn ${moreOpen ? 'active' : ''}`}
            onClick={() => setMoreOpen(!moreOpen)}
          >
            Ещё
            <span className="more-arrow">{moreOpen ? '▲' : '▼'}</span>
          </button>

          {moreOpen && (
            <div className="more-dropdown">
              {moreCategories.map(item => (
                <button key={item} onClick={() => { setActiveCategory(item); setMoreOpen(false) }}>
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="combo-list">
        {filteredData.map(item => (
          <ComboCard
            key={item.id}
            name={item.name}
            weight={item.weight}
            price={item.price}
            image={item.image}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {selectedItem && (
        <div className="detail-overlay" onClick={() => setSelectedItem(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setSelectedItem(null)}>✕</button>

            <div className="detail-top">
              {selectedItem.image ? (
                <img src={`/src/assets/${selectedItem.image}`} alt={selectedItem.name} className="detail-image" />
              ) : (
                <div className="detail-image" />
              )}
              <div className="detail-info">
                <h2 className="detail-name">{selectedItem.name}</h2>
              </div>
            </div>

            <div className="detail-status">Продукт доступен</div>
            <div className="detail-divider" />

            <h3>Описание</h3>
            <p className="detail-desc">
              {selectedItem.name} по выгодной цене. Доступно только в Доставке!
            </p>
            <div className="detail-divider" />

            <p className="detail-disclaimer">
              Цены и ассортименты продуктов на сайте указаны для выбранного вами региона и могут отличаться в конкретном предприятии. Наличие продуктов и цену уточняйте в выбранном предприятии.
            </p>

            <div className="detail-price">Сумма от {selectedItem.price} ₽</div>
            <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
              + {Math.round(selectedItem.price * 0.03)} бонусов на счет при заказе в приложении
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App