import Spinner from 'react-bootstrap/Spinner'; // or any spinner you like

const Loader = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255,255,255,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <Spinner animation="border" variant="primary" />
  </div>
);

export default Loader;