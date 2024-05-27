import { Fragment, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { Images } from '../assets';
import AOS from "aos"
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    })
  }, []);

  return (
    <Fragment>
      <section className='about-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='blog-1' data-aos="fade-right">
                <div className='row'>
                  <div className='col-md-7'>
                    <div className='blog-para'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                  <div className='col-md-5'>
                    <LazyLoad>
                      <figure className='blog-img'>
                        <img
                          src={Images.bannerImg1}
                          alt='men'
                          width='100%'
                        />
                      </figure>
                    </LazyLoad>
                  </div>
                </div>
              </div>
              <div className='blog-2' data-aos="fade-left">
                <div className='row'>
                  <div className='col-md-5'>
                    <LazyLoad>
                      <figure className='blog-img'>
                        <img
                          src={Images.bannerImg2}
                          alt='women'
                          width='100%'
                        />
                      </figure>
                    </LazyLoad>
                  </div>
                  <div className='col-md-7'>
                    <div className='blog-para'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='blog-3' data-aos="fade-right">
                <div className='row'>
                  <div className='col-md-7'>
                    <div className='blog-para'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                  <div className='col-md-5'>
                    <LazyLoad>
                      <figure className='blog-img'>
                        <img
                          src={Images.bannerImg3}
                          alt='men'
                          width='100%'
                        />
                      </figure>
                    </LazyLoad>
                  </div>
                </div>
              </div>
              <div className='blog-4' data-aos="fade-left">
                <div className='row'>
                  <div className='col-md-5'>
                    <LazyLoad>
                      <figure className='blog-img'>
                        <img
                          src={Images.bannerImg4}
                          alt='women'
                          width='100%'
                        />
                      </figure>
                    </LazyLoad>
                  </div>
                  <div className='col-md-7'>
                    <div className='blog-para'>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default About