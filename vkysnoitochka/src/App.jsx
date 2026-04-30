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
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  const filteredData = useMemo(() => {
    if (activeCategory === 'Только в Доставке') {
      return menuData
    }
    return []
  }, [activeCategory])

  return (
    <div className="container">
      <Header onSelect={setSelectedItem} cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
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

            <h3>Описание</h3>
            <p className="detail-desc">
              {selectedItem.name} по выгодной цене. Доступно только в Доставке!
            </p>

            <p className="detail-disclaimer">
              Цены и ассортименты продуктов на сайте указаны для выбранного вами региона и могут отличаться в конкретном предприятии. Наличие продуктов и цену уточняйте в выбранном предприятии.
            </p>

            <button className="detail-add-btn" onClick={() => { addToCart(selectedItem); setSelectedItem(null) }}>
              Добавить в корзину — {selectedItem.price} ₽
            </button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="detail-overlay" onClick={() => setCartOpen(false)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setCartOpen(false)}>✕</button>
            <h2 className="cart-title">Корзина</h2>

            {cart.length === 0 ? (
              <p className="cart-empty">Корзина пуста</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-qty">{item.qty} × {item.price} ₽</p>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))}
                <div className="cart-total">
                  Сумма: {cart.reduce((sum, i) => sum + i.price * i.qty, 0)} ₽
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App