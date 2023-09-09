import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Products from './pages/Products/Products.tsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.tsx';
import Cart from './pages/Cart/Cart.tsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx';
import { routes } from './consts/routes.ts';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={routes.index} element={<Home />} />
          <Route path={routes.catalog} element={<Products />} />
          <Route path={routes.product} element={<ProductDetails />} />
          <Route path={routes.cart} element={<Cart />} />
          <Route path={routes.notFound} element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
