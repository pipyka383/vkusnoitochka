import { useState, useEffect } from 'react'
import Banner from '../components/Banner'
import ComboCard from '../components/ComboCard'
import menuData from '../data/menu.json'

const categories = [
  'Новинки', 'Только в Доставке', 'Комбо', 'Сеты и пары',
  'Напитки'
]

function HomePage({ setSelectedItem, addToCart, removeFromCart, cart }) {
  const [activeCategory, setActiveCategory] = useState('Новинки')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let result = []
      if (activeCategory === 'Только в Доставке') {
        result = menuData.filter(item => item.category === 'ТОЛЬКО В ДОСТАВКЕ')
      } else if (activeCategory === 'Сеты и пары') {
        result = menuData.filter(item => item.category === 'СЕТЫ И ПАРЫ')
      } else if (activeCategory === 'Напитки') {
        result = menuData.filter(item => item.category === 'НАПИТКИ')
      } else if (activeCategory === 'Новинки') {
        result = menuData.filter(item => item.category === 'НОВИНКИ')
      }
      else if (activeCategory === 'Комбо') {
      result = menuData.filter(item => item.category === 'КОМБО')
      }
      setData(result)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [activeCategory])

  return (
    <>
      <Banner />
      <h2 className="menu-title">Меню</h2>
      <div className="menu-sections">
        {categories.map(cat => (
          <button key={cat} className={cat === activeCategory ? 'active' : ''} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <section className="combo-list">
        {loading ? (
          <p className="loading-msg">Загрузка...</p>
        ) : (
          data.map(item => (
            <ComboCard key={item.id} name={item.name} weight={item.weight} price={item.price} image={item.image} onClick={() => setSelectedItem(item)} />
          ))
        )}
      </section>
      <footer className="site-footer">
        Цены и ассортименты продуктов на сайте указаны для выбранного вами региона и могут отличаться в конкретном предприятии. Наличие продуктов и цену уточняйте в выбранном предприятии. Компания не несет ответственности за деятельность третьих лиц, предлагающих услуги по доставке продукции на сторонних сайтах.
      </footer>
    </>
  )
}

export default HomePage