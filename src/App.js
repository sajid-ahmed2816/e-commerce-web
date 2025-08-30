import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import WebRoutes from './routes/WebRoutes';
import store, { persistor } from './config/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import PublicRoutes from './routes/PublicRoutes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              {WebRoutes.map((item, i) => (
                <Route key={i} path={item.path} element={item.component} />
              ))}
            </Route>
            {PublicRoutes.map((item, i) => (
              <Route key={i} path={item.path} element={item.component} />
            ))}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
