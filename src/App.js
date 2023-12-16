import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/customer/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Orders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";
import Cart from "./pages/customer/ItemCart";
import About from "./pages/customer/About";
import ProductsDetails from "./pages/customer/ProductDetails";
import AdminHome from "./pages/admin/AdminHome";
import AddProducts from "./pages/admin/AddProducts";
import AdminNav from "./pages/admin/AdminNavBar";
import Users from "./pages/admin/ViewUsers";
import ViewOrders from "./pages/admin/ViewOrders";
import ViewProducts from "./pages/admin/ViewProducts";
import ItemCart from "./pages/customer/ItemCart";

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={isAuthenticated? (<Home />):(<SignIn />)} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/orders" element={isAuthenticated?(<Orders />): (<SignIn />) } />
          <Route path="/cart" element={isAuthenticated?(<Cart />): (<SignIn />)} />
          <Route path="/productDetails/:id" element={isAuthenticated? (<ProductsDetails />):(<SignIn />)} />
          <Route path="/profile" element={isAuthenticated?(<Profile />): (<SignIn />)} />
          <Route path="/stats" element={isAuthenticated?(<AdminHome />): (<SignIn />)} />
          <Route path="/addproducts" element={isAuthenticated?(<AddProducts />): (<SignIn />)} />
          <Route path="/adminnav" element={<AdminNav />} />
          <Route path="/viewusers" element={isAuthenticated?(<Users />): (<SignIn />)} />
          <Route path="/vieworders" element={isAuthenticated?(<ViewOrders />): (<SignIn />)} />
          <Route path="/viewproducts" element={isAuthenticated?(<ViewProducts />): (<SignIn />) } />
          <Route path="/about" element={isAuthenticated?(<About />): (<SignIn />)} />
          <Route path="/cart" element={isAuthenticated?(<ItemCart />): (<SignIn />) } />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
