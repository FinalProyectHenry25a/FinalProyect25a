import React from 'react'
import samsung from '../../images/samsung.jpg'
import huawei from '../../images/huawei.jpg'
import lg from '../../images/lg.jpg'
import iphone from '../../images/iphone.jpg'
import moto from '../../images/moto.jpg'
import styles from '../carrousel/Carrousel.module.css'
import IconLeft from '../icons/IconsLeft'
import IconRight from '../icons/IconsRight'

const Carrousel = () => {

  const slideShow = { current: null }
  // const slideShow = useRef(null)
  const next = () => {
    if (slideShow.current?.children?.length > 0) {
      const firstElement = slideShow.current?.children[0]
      slideShow.current.style.transition = '300ms ease-out all'
      const sizeSlide = slideShow?.current?.children[0].offsetWidth
      slideShow.current.style.transform = `translateX(-${sizeSlide}px)`

      const transicion = () => {
        slideShow.current.style.transition = 'none'
        slideShow.current.style.transform = 'translateX(0)'
        slideShow.current.appendChild(firstElement)
        slideShow.current.removeEventListener('transitionend', transicion)
      }
      slideShow.current?.addEventListener('transitionend', transicion)
    }
  }
  const previous = () => {
    if (slideShow.current.children.length > 0) {
      const index = slideShow.current.children.length
      const lastElement = slideShow.current.children[index - 1]
      slideShow.current.insertBefore(lastElement, slideShow.current.firstChild)
      slideShow.current.style.transition = 'none'
      const sizeSlide = slideShow.current.children[0].offsetWidth
      slideShow.current.style.transform = `translateX(-${sizeSlide}px)`

      setTimeout(() => {
        slideShow.current.style.transition = '300ms ease-out all'
        slideShow.current.style.transform = 'translateX(0)'
      }, 30)
    }
  }
  // useEffect(() => {
  //   setInterval(() => {
  //      next()
  //   }, 5000)
  // }, [])
  return (
    <main className={styles.mainContainer}>
      <div className={styles.principalContainer}>
        <div className={styles.slideContainer} ref={slideShow}>
          <div className={styles.slide}>
            <img src={huawei} alt="huawei" />
            
          </div>

          <div className={styles.slide}>
            <img src={samsung} alt="samsung" />
            
          </div>
          <div className={styles.slide}>
            <img src={iphone} alt="iphone" />
            
          </div>
          <div className={styles.slide}>
            <img src={lg} alt="lg" />
            
          </div>
          <div className={styles.slide}>
            <img src={moto} alt="moto" />
            
          </div>
        </div>
        <div className={styles.controlers}>
          <button onClick={previous} className={styles.btnLeft} ><IconLeft /></button>
          <button onClick={next} className={styles.btnRight}><IconRight /></button>
        </div>
      </div>
    </main>
  )
}

export default Carrousel