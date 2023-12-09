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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productDetails" element={<ProductsDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/adminnav" element={<AdminNav />} />
          <Route path="/viewusers" element={<Users />} />
          <Route path="/vieworders" element={<ViewOrders />} />
          <Route path="/viewproducts" element={<ViewProducts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
