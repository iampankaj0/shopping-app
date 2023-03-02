import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import RegisterScreen from "./screens/RegisterScreen";
import "./bootstrap.min.css";
import ProfileScreen from "./screens/ProfileScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/updateprofile" component={UpdateProfileScreen} />
            <Route path="/updatepassword" component={UpdatePasswordScreen} />
            <Route path="/shipping" component={CheckoutScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
