import logoImg from '../assets/logo.png'

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logoImg} alt="Логотип" className="logo__img" />
        <span>Вкусно — и точка</span>
      </div>
      <nav>
        <a href="#">Меню</a>
        <a href="#">Кафе</a>
        <a href="#">Кидз Комбо</a>
        <a href="#">Качество</a>
        <a href="#">Мой Бонус</a>
        <a href="#">О нас</a>
      </nav>
    </header>
  )
}

export default Header