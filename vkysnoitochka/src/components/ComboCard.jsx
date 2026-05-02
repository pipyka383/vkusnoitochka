function ComboCard({ name, weight, price, image, onClick }) {
  return (
    <article className="combo-card" onClick={onClick}>
      {image ? (
        <img src={`/src/assets/${image}`} alt={name} className="combo-card__image" />
      ) : (
        <div className="combo-card__image" />
      )}
      <p className="combo-card__name">{name}</p>
      <p className="combo-card__weight">{weight}</p>
      <p className="combo-card__price">от {price} ₽</p>
    </article>
  )
}

export default ComboCard