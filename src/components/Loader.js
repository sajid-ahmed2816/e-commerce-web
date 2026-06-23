import Spinner from 'react-bootstrap/Spinner'; // or any spinner you like

const Loader = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255,255,255,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Spinner animation="glow" style={{ color: "#000000" }} />
  </div>
);

export default Loader;