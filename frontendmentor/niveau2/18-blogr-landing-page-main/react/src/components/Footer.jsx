import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer>
      <div className="foot-block">
        <img src={logo} alt="logo" />
      </div>
      <div className="foot-block">
        <h3>Product</h3>
        <ul>
          <li><a href="#">Overview</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Marketplace</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Integrations</a></li>
        </ul>
      </div>
      <div className="foot-block">
        <h3>Company</h3>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      <div className="foot-block">
        <h3>Connect</h3>
        <ul>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Newsletter</a></li>
          <li><a href="#">LinkedIn</a></li>
        </ul>
      </div>
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
        Coded by <a href="#">Your Name Here</a>.
      </div>
    </footer>
  );
}