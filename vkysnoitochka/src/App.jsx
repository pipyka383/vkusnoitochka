import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import ComboCard from './components/ComboCard'
import menuData from './data/menu.json'

const categories = [
  'Новинки',
  'Только в Доставке',
  'Комбо',
  'Сеты и пары',
  'Напитки',
  'Бургеры и роллы',
  'Ещё'
]

function App() {
  const [activeCategory, setActiveCategory] = useState('Новинки')

  return (
    <div>
      <Header />
      <Banner />

      <h2 className="menu-title">Наше меню</h2>

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
      </div>

      <div className="combo-list">
        {menuData.map(item => (
          <ComboCard
            key={item.id}
            name={item.name}
            weight={item.weight}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default App