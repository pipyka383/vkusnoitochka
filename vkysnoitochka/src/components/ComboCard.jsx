function ComboCard({ name, weight, price }) {
  return (
    <div className="combo-card">
      <div className="combo-card__image">🍔</div>
      <h3>{name}</h3>
      <p>{weight}</p>
      <p className="combo-card__price">от {price} ₽</p>
    </div>
  )
}

export default ComboCard