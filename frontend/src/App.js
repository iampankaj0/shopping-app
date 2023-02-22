import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Login from "./screens/Login";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart:id?" component={Cart} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
