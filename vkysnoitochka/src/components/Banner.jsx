import { useState, useEffect } from 'react'
import banner1 from '../assets/banner.webp'
import banner2 from '../assets/banner_cofe.webp'
import banner3 from '../assets/banner_combo.webp'

const slides = [
  { image: banner1, alt: 'Баннер 1' },
  { image: banner2, alt: 'Баннер 2' },
  { image: banner3, alt: 'Баннер 3' },
]

function Banner() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent(prev => (prev + 1) % slides.length)
  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(next, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="banner">
      <button className="banner__arrow banner__arrow--left" onClick={prev}>‹</button>
      <img src={slides[current].image} alt={slides[current].alt} className="banner__image" />
      <button className="banner__arrow banner__arrow--right" onClick={next}>›</button>
    </section>
  )
}

export default Banner