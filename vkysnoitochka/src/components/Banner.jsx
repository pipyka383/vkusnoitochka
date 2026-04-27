import bannerImg from '../assets/banner.webp'

function Banner() {
  return (
    <section className="banner">
      <img src={bannerImg} alt="Баннер" className="banner__image" />
    </section>
  )
}

export default Banner