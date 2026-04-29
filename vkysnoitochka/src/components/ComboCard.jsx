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

function ComboCard({ name, weight, price, image, onClick }) {
  return (
    <div className="combo-card" onClick={onClick}>
      {image ? (
        <img src={`/src/assets/${image}`} alt={name} className="combo-card__image" />
      ) : (
        <div className="combo-card__image" />
      )}
      <p className="combo-card__name">{name}</p>
      <p className="combo-card__weight">{weight}</p>
      <p className="combo-card__price">от {price} ₽</p>
    </div>
  )
}

export default ComboCard