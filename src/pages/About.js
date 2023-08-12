import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <>
      <Header />

      <section className='about-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='blog-1 animate-slideFromTop'>
                <div className='row'>
                  <div className='col-md-8'>
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
                  <div className='col-md-4'>
                    <figure className='blog-img'>
                      <img 
                        src='https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-842811.jpg&fm=jpg'
                        alt='men'
                        width='100%'
                      />
                    </figure>
                  </div>
                </div>
              </div>
              <div className='blog-2 animate-slideFromLeft'>
                <div className='row'>
                  <div className='col-md-4'>
                    <figure className='blog-img'>
                      <img
                        src='https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-974911.jpg&fm=jpg'
                        alt='women'
                        width='100%'
                      />
                    </figure>
                  </div>
                  <div className='col-md-8'>
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
              <div className='blog-3 animate-slideFromRight'>
              <div className='row'>
                  <div className='col-md-8'>
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
                  <div className='col-md-4'>
                    <figure className='blog-img'>
                      <img 
                        src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg'
                        alt='men'
                        width='100%'
                      />
                    </figure>
                  </div>
                </div>
              </div>
              <div className='blog-4 animate-slideFromBottom'>
              <div className='row'>
                  <div className='col-md-4'>
                    <figure className='blog-img'>
                      <img
                        src='https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg?cs=srgb&dl=pexels-photomix-company-213162.jpg&fm=jpg'
                        alt='women'
                        width='100%'
                      />
                    </figure>
                  </div>
                  <div className='col-md-8'>
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

      <Footer />
    </>
  )
}

export default About