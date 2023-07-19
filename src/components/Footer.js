import '../App.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className="container">
        <div className='footer-part-1'>
          <div className='footer-items'>
            <h3 className='footer-link'>
              Fashion Brand
            </h3>
            <p>
              123 456 789
            </p>
          </div>
          <div>
            <h3 className='footer-link'>
              Products
            </h3>
            <p>
              Men Wear
            </p>
            <p>
              Women Wear
            </p>
            <p>
              Accessories
            </p>
          </div>
          <div>
            <h3 className='footer-link'>
              Support
            </h3>
            <p>
              Contact us
            </p>
            <p>
              About us
            </p>
          </div>
          <div>
            <h3 className='footer-link'>
              Quick links
            </h3>
            <p>
              My account
            </p>
            <p>
              Checkout
            </p>
            <p>
              Newsletter
            </p>
          </div>
        </div>
      </div>
      <div className='footer-part-2'>
        <p>
          Created by Sajid.Dev || 2023
        </p>
      </div>
    </footer>
  )
}

export default Footer