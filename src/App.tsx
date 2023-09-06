import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Products from './pages/Products/Products.tsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.tsx';
import Cart from './pages/Cart/Cart.tsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx';
const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
