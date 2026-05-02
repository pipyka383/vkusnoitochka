import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

function App() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [orderName, setOrderName] = useState('')
  const [orderPhone, setOrderPhone] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <BrowserRouter>
      <main className="container">
        <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} onSelect={setSelectedItem} onLoginClick={() => setLoginOpen(true)} />

        <Routes>
          <Route path="/" element={<HomePage setSelectedItem={setSelectedItem} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />} />
          <Route path="*" element={<div style={{ padding: 40, textAlign: 'center' }}><h2>Страница в разработке</h2></div>} />
        </Routes>

        {selectedItem && (
          <div className="detail-overlay" onClick={() => setSelectedItem(null)}>
            <div className="detail-modal" onClick={e => e.stopPropagation()}>
              <button className="detail-close" onClick={() => setSelectedItem(null)}>✕</button>
              <div className="detail-top">
                {selectedItem.image ? <img src={`/src/assets/${selectedItem.image}`} alt="" className="detail-image" /> : <div className="detail-image" />}
                <div className="detail-info"><h2 className="detail-name">{selectedItem.name}</h2></div>
              </div>
              <div className="detail-status">Продукт доступен</div>
              <h3>Описание</h3>
              <p className="detail-desc">{selectedItem.name} по выгодной цене. Доступно только в Доставке!</p>
              <p className="detail-disclaimer">Цены и ассортименты продуктов на сайте указаны для выбранного вами региона и могут отличаться в конкретном предприятии. Наличие продуктов и цену уточняйте в выбранном предприятии.</p>
              <div className="detail-price-row">
                <p className="detail-price-label">Сумма</p>
                <p className="detail-price-amount">от {selectedItem.price} ₽</p>
                <p className="detail-bonus"><span>+ {Math.round(selectedItem.price * 0.03)} бонусов</span> на счет при заказе в приложении</p>
              </div>
              {cart.find(i => i.id === selectedItem?.id) ? (
                <div className="detail-qty">
                  <button className="detail-qty-btn" onClick={() => { const item = cart.find(i => i.id === selectedItem.id); if (item.qty === 1) removeFromCart(selectedItem.id); else setCart(prev => prev.map(i => i.id === selectedItem.id ? { ...i, qty: i.qty - 1 } : i)) }}>−</button>
                  <span className="detail-qty-num">{cart.find(i => i.id === selectedItem.id).qty}</span>
                  <button className="detail-qty-btn" onClick={() => addToCart(selectedItem)}>+</button>
                </div>
              ) : (
                <button className="detail-add-btn" onClick={() => addToCart(selectedItem)}>Добавить в корзину — {selectedItem.price} ₽</button>
              )}
            </div>
          </div>
        )}

        {cartOpen && !orderOpen && !orderDone && (
          <div className="detail-overlay" onClick={() => setCartOpen(false)}>
            <div className="detail-modal" onClick={e => e.stopPropagation()}>
              <button className="detail-close" onClick={() => setCartOpen(false)}>✕</button>
              <h2 className="cart-title">Корзина</h2>
              {cart.length === 0 ? <p className="cart-empty">Корзина пуста</p> : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div><p className="cart-item-name">{item.name}</p><p className="cart-item-qty">{item.qty} × {item.price} ₽</p></div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                  <div className="cart-total">Сумма: {cart.reduce((sum, i) => sum + i.price * i.qty, 0)} ₽</div>
                  <button className="detail-add-btn" onClick={() => setOrderOpen(true)}>Оформить заказ</button>
                </>
              )}
            </div>
          </div>
        )}

        {orderOpen && !orderDone && (
          <div className="detail-overlay" onClick={() => setOrderOpen(false)}>
            <div className="detail-modal" onClick={e => e.stopPropagation()}>
              <button className="detail-close" onClick={() => setOrderOpen(false)}>✕</button>
              <h2 className="cart-title">Оформление заказа</h2>
              <form className="login-form" onSubmit={(e) => { e.preventDefault(); setOrderDone(true); setCart([]) }}>
                <input type="text" placeholder="Имя" value={orderName} onChange={e => setOrderName(e.target.value)} required />
                <input type="tel" placeholder="Телефон" value={orderPhone} onChange={e => setOrderPhone(e.target.value)} required />
                <button type="submit" className="detail-add-btn">Заказать</button>
              </form>
            </div>
          </div>
        )}

        {orderDone && (
          <div className="detail-overlay" onClick={() => { setOrderDone(false); setCartOpen(false); setOrderName(''); setOrderPhone('') }}>
            <div className="detail-modal" onClick={e => e.stopPropagation()}>
              <button className="detail-close" onClick={() => { setOrderDone(false); setCartOpen(false); setOrderName(''); setOrderPhone('') }}>✕</button>
              <p className="login-success">Заказ оформлен! Ожидайте доставку.</p>
              <button className="detail-add-btn" onClick={() => { setOrderDone(false); setCartOpen(false); setOrderName(''); setOrderPhone('') }}>Ок</button>
            </div>
          </div>
        )}

        {loginOpen && <Login onClose={() => setLoginOpen(false)} />}
      </main>
    </BrowserRouter>
  )
}

export default App