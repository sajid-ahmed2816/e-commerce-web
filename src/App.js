import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './config/redux/store/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import WebRoutes from './routes/WebRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {WebRoutes.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
