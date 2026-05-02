import { useState } from 'react'

function Login({ onClose }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <div className="detail-overlay" onClick={onClose}>
        <div className="detail-modal" onClick={e => e.stopPropagation()}>
          <button className="detail-close" onClick={onClose}>✕</button>
          <p className="login-success">{mode === 'register' ? 'Регистрация успешна!' : 'Вы вошли в аккаунт!'}</p>
          <button className="detail-add-btn" onClick={onClose}>Ок</button>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>
        <h2 className="cart-title">{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="detail-add-btn">
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="login-toggle" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </p>
      </div>
    </div>
  )
}

export default Login