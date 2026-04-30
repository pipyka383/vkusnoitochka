import { useState } from 'react'
import menuData from '../data/menu.json'
import setBigSpeshal from '../assets/set_big_speshal.webp'
import paraBable from '../assets/para_bable.webp'
import paraFizz from '../assets/para_fizz.webp'
import setDliTwo from '../assets/set_dli_two.webp'

const images = {
  'set_big_speshal.webp': setBigSpeshal,
  'para_bable.webp': paraBable,
  'para_fizz.webp': paraFizz,
  'set_dli_two.webp': setDliTwo,
}

function Header({ onSelect, cartCount, onCartClick }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = menuData.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (item) => {
    setSearchOpen(false)
    setQuery('')
    onSelect(item)
  }

  return (
    <>
      <header>
        <div className="header-top">
          <div className="logo">Вкусно — и точка</div>

          <div className="header-actions">
            <div className="search-bar" onClick={() => setSearchOpen(true)}>
              <span className="search-bar__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input type="text" placeholder="Поиск" readOnly onFocus={() => setSearchOpen(true)} />
            </div>

            <div className="cart-icon" onClick={onCartClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        </div>

        <nav>
          <a href="#">Меню</a>
          <a href="#">Звёздное комбо</a>
          <a href="#">Кафе</a>
          <a href="#">Кидз Комбо</a>
          <a href="#">Качество</a>
          <a href="#">Мой Бонус</a>
          <a href="#">О нас</a>
        </nav>
      </header>

      {searchOpen && (
        <div className="search-overlay" onClick={() => { setSearchOpen(false); setQuery('') }}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <div className="search-modal__header">
              <input
                type="text"
                placeholder="Поиск по меню"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <span className="search-modal__close" onClick={() => { setSearchOpen(false); setQuery('') }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
            </div>
            {query && (
              <ul className="search-modal__results">
                {filtered.length > 0 ? (
                  filtered.map(item => (
                    <li key={item.id} className="search-result-item" onClick={() => handleSelect(item)}>
                      <div className="search-result-left">
                        {item.image && images[item.image] ? (
                          <img src={images[item.image]} alt="" className="search-result-img" />
                        ) : (
                          <div className="search-result-img search-result-img--empty" />
                        )}
                        <div className="search-result-info">
                          <span className="search-result-name">{item.name}</span>
                          <span className="search-result-meta">{item.weight} · {item.price} ₽</span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="no-result">Ничего не найдено</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header