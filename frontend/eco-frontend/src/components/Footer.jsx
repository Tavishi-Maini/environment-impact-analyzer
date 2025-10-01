import './css/Footer.css';

function Footer({ year }) {
  return (
    <footer className='footer'>
      <p>© {new Date().getFullYear()} Environment Impact Analyzer | Built with ❤️</p>
    </footer>
  );
}

export default Footer;
