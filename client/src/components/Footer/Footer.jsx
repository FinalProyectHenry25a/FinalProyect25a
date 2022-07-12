import { Link } from "react-router-dom";
import logo from "../../images/smartworld.jpg";
import styles from "../UserNavBar/usernavbar.module.css";


export default function Footer(){
    return(
        <div>
        <footer className="bg-light col-12 row text-white h-3 align-items-center justify-content-center ">
            <div className="col-5 align-items-center justify-content-center float-left mb-3">
            <img src={logo} alt="logo"  className={styles.logo}/>
            </div>
<div class=" align-items-center justify-content-center col-5">
      <Link to='/about'>
      <button class="btn btn-secondary align-items-center justify-content-center"><h4>conocenos...</h4></button>
      </Link>
    </div>
      <div className="col-2 float-right align-items-center justify-content-center">
      <a href="https://github.com/FinalProyectHenry25a/FinalProyect25a">
      <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
      </a>
      </div>
{/*         
  

      {/* <!-- Google --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #dd4b39;"
        href="#!"
        role="button"
        ><i className="fab fa-google"></i
      ></a>

      {/* <!-- Instagram --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #ac2bac;"
        href="#!"
        role="button"
        ><i className="fab fa-instagram"></i
      ></a>

      {/* <!-- Linkedin --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #0082ca;"
        href="#!"
        role="button"
        ><i className="fab fa-linkedin-in"></i
      ></a>
      {/* <!-- Github --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #333333;"
        href="#!"
        role="button"
        ><i className="fab fa-github"></i
      ></a>
    </section>
    {/* <!-- Section: Social media --> 
  </div>
  {/* <!-- Grid container --> 

  {/* <!-- Copyright --> 
  <div className="text-center p-3"> {/*style="background-color: rgba(0, 0, 0, 0.2)
    © 2020 Copyright:
    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  <!-- Copyright --> */}

</footer>
</div>
    )
}