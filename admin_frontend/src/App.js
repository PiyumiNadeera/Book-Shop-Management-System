import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomeLayout} from "./utils/Layout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books/Books";
import Login from "./auth/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AddNewBook from "./pages/Books/AddNewBook";
import UpdateBook from "./pages/Books/UpdateBook"
import Categories from "./pages/Categories/Categories";
import AddNewCategory from "./pages/Categories/AddNewCategory";
import Authors from "./pages/Authors/Authors";
import AddNewAuthor from "./pages/Authors/AddNewAuthor";
import Publications from "./pages/Publications/Publications";
import AddNewPublication from "./pages/Publications/AddNewPublication";
import Discounts from "./pages/Discounts/Discounts";
import AddNewDiscount from "./pages/Discounts/AddNewDiscount";
import Customers from "./pages/Customers/Customers";
import Orders from "./pages/Orders";
import CustomerInfo from "./pages/Customers/CustomerInfo";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
          <Route element={<HomeLayout/>}>
              <Route element={<ProtectedRoutes/>}>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/books" element={<Books/>}></Route>
                  <Route path="/addNewBook" element={<AddNewBook/>}></Route>
                  <Route path="/updateBook" element={<UpdateBook/>}></Route>
                  <Route path="/categories" element={<Categories/>}></Route>
                  <Route path="/addNewCategory" element={<AddNewCategory/>}></Route>
                  <Route path="/authors" element={<Authors/>}></Route>
                  <Route path="/addNewAuthor" element={<AddNewAuthor/>}></Route>
                  <Route path="/publications" element={<Publications/>}></Route>
                  <Route path="/addNewPublication" element={<AddNewPublication/>}></Route>
                  <Route path="/discounts" element={<Discounts/>}></Route>
                  <Route path="/addNewDiscount" element={<AddNewDiscount/>}></Route>
                  <Route path="/customers" element={<Customers/>}></Route>
                  <Route path="/orders" element={<Orders/>}></Route>
                  <Route path="/customerInfo/*" element={<CustomerInfo/>}></Route>
              </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
