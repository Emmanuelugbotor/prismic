import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CustomCard from "./ToolTip";
import { CartContext } from "../context/ContextAPi";
import { useContext, useEffect, useState } from "react";
import formattedPrice from "../utils/formattedPrice";
import { IProduct } from "../interface/product";
import { baseURL } from "../service/routes";
import ButtonWithRippleEffect from "./ButtonWithRippleEffect";
import ProductAdditionAlert from "./ProductAdditionAlert";

export default function BestSelling() {
  const [showAlert, setShowAlert] = useState(false);
  const { appDispatch } = useContext(CartContext);
  const [product, setProducts] = useState<IProduct[]>([]);

  function handleAddToCart(payload: IProduct) {
    appDispatch({ type: "ADD_TO_CART", payload: payload });
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  useEffect(() => {
    fetch(baseURL + "/data")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div className="bestSelling">
      {showAlert && (
        <ProductAdditionAlert
          setShowAlert={setShowAlert}
          message="Product added successfully"
        />
      )}
      <div className="title">Best Selling</div>
      {product.length === 0 &&
        <div style={{textAlign: 'center'}}>
          <span> To get the product list,  run this command  </span> <br />
          <strong> npm run json_server </strong>
        </div>
      }

      <ul className="gallery">
        {product &&
          product.map((product: IProduct) => (
            <li>
              <div className="image__container">
                <div className="image">
                  <img src={product.image} alt="" />
                </div>
                <div className="others">
                  <CustomCard label="Quick view">
                    <div className="icon__holder">
                      <SearchIcon />
                    </div>
                  </CustomCard>
                  <CustomCard label="Add to Compare">
                    <div className="icon__holder">
                      <CachedIcon />
                    </div>
                  </CustomCard>

                  <CustomCard label="Add to Wishlist">
                    <div className="icon__holder">
                      <FavoriteBorderIcon />
                    </div>
                  </CustomCard>
                </div>
                <ButtonWithRippleEffect
                  label="+ ADD TO CART"
                  handleAction={() => handleAddToCart(product)}
                />
              </div>
              <div className="description">
                <div className="desc">{product?.description}</div>
                <div className="price">{formattedPrice(product?.price)}</div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
