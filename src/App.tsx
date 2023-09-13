import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Products from './pages/Products/Products.tsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.tsx';
import Cart from './pages/Cart/Cart.tsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx';
import { ROUTES } from './consts/routes.ts';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={ROUTES.index} element={<Home />} />
          <Route path={ROUTES.catalog} element={<Products />} />
          <Route path={ROUTES.product} element={<ProductDetails />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path={ROUTES.notFound} element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
