import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Approuter from './config/Approuter';
import { Provider } from 'react-redux';
import store from './config/redux/store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Approuter />
      </Provider>
    </>
  );
}

export default App;
