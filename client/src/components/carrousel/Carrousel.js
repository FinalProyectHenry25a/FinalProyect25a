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
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="true">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active"  data-bs-interval="4000">
      <img src={iphone2} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div className="carousel-item"  data-bs-interval="4000">
      <img src={moto} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div className="carousel-item"  data-bs-interval="4000">
      <img src={samsung} style={{display: "block", width: 100 + "%", height: 500 + "px"}} alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="4000">
      <img src={note} style={{display: "block", width: 100 + "%", height: 500 + "px"}}alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={huawei} style={{display: "block", width: 100 + "%", height: 500 + "px"}}alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
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
