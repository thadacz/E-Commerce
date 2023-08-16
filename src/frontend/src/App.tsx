import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Store } from "./components/Store";
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { Cart } from "./components/Cart"
import Login from "./components/Login";
import Registration from "./components/Registration";
import DeliveryForm from "./components/DeliveryForm";
import Payment from "./components/Payment";
import AddProduct from "./components/AddProduct"
import ProductsList from "./components/ProductList"
import Product from "./components/Product"
import Completion from "./components/Completion";
import { CategoryProducts } from "./components/CategoryProducts";
import AddCategory from "./components/AddCategory"
import CategoriesList from "./components/CategoryList"
import Category from "./components/Category"
import SalesView  from "./components/SalesView"
import UsersList from "./components/UserList";

function App() {
  
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/delivery-form" element={<DeliveryForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/sales-view" element={<SalesView />} />
          <Route path="/users" element={<UsersList/>}/>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App
