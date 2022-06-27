import React from "react";
import samsung from "../../images/samsung.png";
import iphone2 from "../../images/iphone2.webp";
import huawei from "../../images/huawei.png";
import iphone from "../../images/iphone.jpg";
import moto from "../../images/motoedge30.png";
import note from "../../images/galaxy.jpg"
import { BsLock } from "react-icons/bs";
//import styles from "../carrousel/Carrousel.module.css";
//import IconLeft from "../icons/IconsLeft";
//import IconRight from "../icons/IconsRight";

const Carrousel = () => {
 //const slideShow = { current: null };
  // const slideShow = useRef(null)
  /* const next = () => {
    if (slideShow.current?.children?.length > 0) {
      const firstElement = slideShow.current?.children[0];
      slideShow.current.style.transition = "300ms ease-out all";
      const sizeSlide = slideShow?.current?.children[0].offsetWidth;
      slideShow.current.style.transform = `translateX(-${sizeSlide}px)`;

      const transicion = () => {
        slideShow.current.style.transition = "none";
        slideShow.current.style.transform = "translateX(0)";
        slideShow.current.appendChild(firstElement);
        slideShow.current.removeEventListener("transitionend", transicion);
      };
      slideShow.current?.addEventListener("transitionend", transicion);
    }
  };
  const previous = () => {
    if (slideShow.current.children.length > 0) {
      const index = slideShow.current.children.length;
      const lastElement = slideShow.current.children[index - 1];
      slideShow.current.insertBefore(lastElement, slideShow.current.firstChild);
      slideShow.current.style.transition = "none";
      const sizeSlide = slideShow.current.children[0].offsetWidth;
      slideShow.current.style.transform = `translateX(-${sizeSlide}px)`;

      setTimeout(() => {
        slideShow.current.style.transition = "300ms ease-out all";
        slideShow.current.style.transform = "translateX(0)";
      }, 30);
    }
  }; */
  // useEffect(() => {
  //   setInterval(() => {
  //      next()
  //   }, 5000)
  // }, [])
  return (
  <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="2000">
      <img src={iphone2} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src={moto} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src={huawei}  style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src={samsung} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={note} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  );
};
{
  /*     <main className={styles.mainContainer}>
      <div className={styles.principalContainer}>
        <div className={styles.slideContainer} ref={slideShow}>
          <div className={styles.slide}>
            <img className={style.image} src={huawei} alt="huawei" />
            
          </div>

          <div className={styles.slide}>
            <img className={style.image} src={samsung} alt="samsung" />
            
          </div>
          <div className={styles.slide}>
            <img className={style.image} src={iphone} alt="iphone" />
            
          </div>
          <div className={styles.slide}>
            <img className={style.image} src={lg} alt="lg" />
            
          </div>
          <div className={styles.slide}>
            <img className={style.image} src={moto} alt="moto" />
            
          </div>
        </div>
        <div className={styles.controlers}>
          <button onClick={previous} className={styles.btnLeft} ><IconLeft /></button>
          <button onClick={next} className={styles.btnRight}><IconRight /></button>
        </div>
      </div>
    </main> */
}

export default Carrousel;
