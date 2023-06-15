import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Indicator from "../components/Indicator";
import { CartContext } from "../context/ContextAPi";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const { appState } = useContext(CartContext);
  return (
    <nav>
      <ul className="navigation__left">
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li> 
        <Link to="/add_product">  Add Products </Link>

         </li>
        <li>
        <Link to="/add_rules">  Add Rules </Link>

         </li>
      </ul>
      <h2>Prismic Text</h2>
      <ul className="navigation__left">
        <li>
          <LockOpenIcon className="icon" />
          Login / Register
        </li>
        <li>
          <SearchIcon className="icon" />
        </li>
        <li>
          <FavoriteBorderIcon className="icon" />
          <Indicator>1</Indicator>
        </li>
        <li>
          <Link to="/checkout" className="checkout">
            <>
              <ShoppingCartIcon />
              <Indicator>
                {" "}
                {appState.items.length ? appState.items.length : 0}
              </Indicator>
            </>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
