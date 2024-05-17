import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthService from "./services/auth.service";
import { useState } from "react";
import Register from "./Components/LoginForm/register";
import Header from "./Components/LoginForm/header";
import Login from "./Components/LoginForm/Login";
import Logout from "./Components/LoginForm/logout";
import Dashboard from "./Components/Dashboard/dashboard";
import Settings from "./Components/Settings/settings";
import DataList from "./Components/Dashboard/datalist";
import Home from "./Components/Landing/home";
import { AuthProvider } from "./Contexts/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import MissionDataList from "./Components/Landing/missonsdata";
import WebSocketComponent from "./Components/Landing/WebSocketComponent";

import Nav from "./Components/Navigation/Nav";
import Products from "./Components/Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";

import data from "./db/db";
import Category from "./Sidebar/Category/Category";
import Card from "./Components/Products/Card";
import Navbar from "./Components/Navbar/Navbar";

import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";

import SatelliteProduct from "./Components/Products/SatelliteProduct";

import DataTable from "./Components/Products/DataTable";
import ProductPage from "./Components/Products/ProductPage";
import GeoServerPage from "./Components/Products/GeoServerPage";

import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  const [datarange, setDatarange] = useState("");

  //-----------------Input Filter ---------------------
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredProducts = data.filter(
    (data) =>
      // if (selectedCategory === "All") {
      //   return product.name.toLowerCase().includes(query.toLowerCase());
      // } else {
      //   return (
      //     product.category === selectedCategory &&
      //     product.name.toLowerCase().includes(query.toLowerCase())
      //   );
      // }
      data.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
  );
  // );

  //-----------------Category Filter ---------------------
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  //-----------------DataRange Filter ---------------------
  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  //-----------------Filtered Data ------------------------
  function filtereddata(data, selected, query) {
    let datafiltered = data;
    if (query) {
      datafiltered = filteredProducts;
    }
    // Filtering input items
    if (selected) {
      datafiltered = data.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }
    // return datafiltered.map(({ img, title, star, reviews, newPrice }) => (
    //   <Card
    //     key={Math.random()}
    //     img={img}
    //     title={title}
    //     star={star}
    //     reviews={reviews}
    //     newPrice={newPrice}
    //   ></Card>
    // ));
  }

  const result = filtereddata(filteredProducts, selectedCategory, query);
  return (
    <AuthProvider>
      <Router>
        {/* <Sidebar handleChange={handleChange}></Sidebar> */}
        <Header />
        <Nav />
        <Navbar />

        <Routes>
          {/* Trial for product page with params */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/men" element={<ShopCategory category="men" />} />
          <Route path="/women" element={<ShopCategory category="women" />} />
          <Route path="/kids" element={<ShopCategory category="kids" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product result={result} />} />
          </Route>
          {/* from 4o */}
          <Route
            path="/productpage/:fileName"
            // element={(props) => <ProductPage {...props} data={result} />}
            element={<ProductPage data={result} />}
          />
          <Route
            path="/geoserver/:fileName"
            element={<GeoServerPage> </GeoServerPage>}
          />{" "}
          {/* from 4o */}
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Recommended handleClick={handleClick} />
        <SatelliteProduct result={result} />
        <DataTable result={result} />

        <Products result={result} />
        <Category handleChange={handleChange} />
        <Routes>
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/missions" element={<MissionDataList />} />
          <Route path="/ws" element={<WebSocketComponent />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                {" "}
                <Settings />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                {" "}
                <DataList />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} /> {/* Updated this line */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
