// Header.jsx
import { useState } from 'react'

const allItems = [
  'Биг Хит', 'Чикен Премьер', 'Чикен Фреш Ролл',
  'Сет Чикен Премьер с Наггетсами', 'Биг Чикен Бургер',
  'Чикен Премьер Перец гриль', 'Комбо Олеси Иванченко',
  'Комбо Юрия Стоянова', 'Айс Матча Комбо', 'Бамбл кофе',
  'Молочный коктейль Черешня'
]

function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = allItems.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <header>
        <div className="header-top">
          <div className="logo">Вкусно — и точка</div>

          <div className="search-bar" onClick={() => setSearchOpen(true)}>
            <span className="search-bar__icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Поиск"
              readOnly
              onFocus={() => setSearchOpen(true)}
            />
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
        <div className="search-overlay">
          <div className="search-modal">
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
                  filtered.map(item => <li key={item}>{item}</li>)
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