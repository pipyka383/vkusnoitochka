import { useState } from 'react'
import { Link } from 'react-router-dom'
import menuData from '../data/menu.json'

import aceMatcha from '../assets/ace_matcha.webp'
import atlant from '../assets/atlant.webp'
import bableTi from '../assets/bable_ti.webp'
import bigChik from '../assets/big_chik.webp'
import dolcheMango from '../assets/dolche_mango.webp'
import expresTonik from '../assets/expres_tonik.webp'
import olesa from '../assets/olesa.webp'
import paraAtlantik from '../assets/para_atlantik.webp'
import paraBable from '../assets/para_bable.webp'
import paraBigHitGrand from '../assets/para_big-hit.grand.webp'
import paraBigHit from '../assets/para_big-hit.webp'
import paraFizz from '../assets/para_fizz.webp'
import premir from '../assets/premir.webp'
import setBigSpeshal from '../assets/set_big_speshal.webp'
import setBigSpesial from '../assets/set_big-spesial.webp'
import setDliTwo from '../assets/set_dli_two.webp'
import spesial from '../assets/spesial.webp'
import uri from '../assets/uri.webp'

const images = {
  'ace_matcha.webp': aceMatcha,
  'atlant.webp': atlant,
  'bable_ti.webp': bableTi,
  'big_chik.webp': bigChik,
  'dolche_mango.webp': dolcheMango,
  'expres_tonik.webp': expresTonik,
  'olesa.webp': olesa,
  'para_atlantik.webp': paraAtlantik,
  'para_bable.webp': paraBable,
  'para_big-hit_grand.webp': paraBigHitGrand,
  'para_big-hit.webp': paraBigHit,
  'para_fizz.webp': paraFizz,
  'premir.webp': premir,
  'set_big_speshal.webp': setBigSpeshal,
  'set_big-spesial.webp': setBigSpesial,
  'set_dli_two.webp': setDliTwo,
  'spesial.webp': spesial,
  'uri.webp': uri,
}

function Header({ onSelect, cartCount, onCartClick, onLoginClick }) {
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
          <Link to="/" className="logo">Вкусно — и точка</Link>

          <div className="header-actions">
            <div className="search-bar" onClick={() => setSearchOpen(true)}>
              <span className="search-bar__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input type="text" placeholder="Поиск" readOnly onFocus={() => setSearchOpen(true)} />
            </div>

            <div className="login-btn" onClick={onLoginClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>

            <div className="cart-icon" onClick={onCartClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        </div>

        <nav>
          <Link to="/">Меню</Link>
          <Link to="/super-combo">Звёздное комбо</Link>
          <Link to="/cafe">Кафе</Link>
          <Link to="/kids">Кидз Комбо</Link>
          <Link to="/quality">Качество</Link>
          <Link to="/bonus">Мой Бонус</Link>
          <Link to="/about">О нас</Link>
        </nav>
      </header>

      {searchOpen && (
        <div className="search-overlay" onClick={() => { setSearchOpen(false); setQuery('') }}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <div className="search-modal__header">
              <input type="text" placeholder="Поиск по меню" autoFocus value={query} onChange={e => setQuery(e.target.value)} />
              <span className="search-modal__close" onClick={() => { setSearchOpen(false); setQuery('') }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
            </div>
            {query && (
              <ul className="search-modal__results">
                {filtered.length > 0 ? (
                  filtered.map(item => (
                    <li key={item.id} className="search-result-item" onClick={() => handleSelect(item)}>
                      <div className="search-result-left">
                        {item.image && images[item.image] ? <img src={images[item.image]} alt="" className="search-result-img" /> : <div className="search-result-img search-result-img--empty" />}
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