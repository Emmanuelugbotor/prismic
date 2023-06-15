import { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/ContextAPi";
import Layout from "../components/Layout";
import formattedPrice from "../utils/formattedPrice";
import PaginationRounded from "../components/Pagination";
import RuleService from "../service/rules.service";
import { checkout, extractProductRules } from "../utils/checkout";
import { CartItem, IProductRules, IProduct } from "../interface/product";

const itemsPerPage = 5;

export default function Cart() {

  const [currentPage, setCurrentPage] = useState(1);
  const { appState, appDispatch } = useContext(CartContext);
  const [rule, setRules] = useState<IProductRules[]>([]);

  const navigate = useNavigate();
  const redirectHome = () => navigate("/")

  const renderRules = async () => {
    const productRules = await new RuleService().getAllRules().then((rules) => rules).then((rules) => rules) as IProductRules[];
    setRules(productRules);
    return productRules;
  }
  const calculateIndividualSum = (value: CartItem) => {
    let totalPrice = 0
    const cartProductRules = extractProductRules([value], rule);
    cartProductRules.forEach((item: any) => totalPrice += checkout(item.totalSku, [item]))
    return formattedPrice(totalPrice);
  };

  const sumTotal = () => {
    let totalPrice = 0
    const cartProductRules = extractProductRules<CartItem, IProductRules>(appState.items, rule);
    cartProductRules.forEach((item: any) => totalPrice += checkout(item.totalSku, [item])
    )
    return formattedPrice(totalPrice);
  }

  const increment = (id: number | undefined) => appDispatch({ type: "INCREASE_QUANTITY", payload: id });
  const decrement = (id: number | undefined, qty: number) => qty > 1 && appDispatch({ type: "DECREASE_QUANTITY", payload: id });
  const handleRemoveCart = (id: number | undefined) => appDispatch({ type: "REMOVE_FROM_CART", payload: id });


  useEffect(() => {
    renderRules();
    const totalPages = Math.ceil(appState?.items.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [appState.items, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = appState?.items.slice(startIndex, endIndex);

  return (
    <Layout>
      <>
        <div className="cart">
          {currentItems?.length > 0 ? (
            <div className="productive_cart">
              <h1>Cart</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Sku</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item) => {
                    return (
                      <tr key={item?.product.id}>
                        <td onClick={() => handleRemoveCart(item?.product?.id)}>
                          <CloseIcon className="close" />
                        </td>

                        <td>
                          <img src={item.product.image} alt="default_img" />
                        </td>
                        <td>
                          {item?.product?.sku}
                        </td>
                        <td> {item.product.title} </td>
                        <td>{`${formattedPrice(item.product.price)}`}</td>
                        <td>
                          <div className="action">
                            <span className="res">{item.quantity}</span>
                            <div className="plus_minus">
                              <span
                                className="minus"
                                onClick={() =>
                                  decrement(item.product.id, item.quantity)
                                }
                              >
                                -
                              </span>
                              <span
                                className="plus"
                                onClick={() => increment(item.product.id)}
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{calculateIndividualSum(item)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="pagination_container">
                <PaginationRounded<CartItem>
                  data={appState.items}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={(event) => setCurrentPage(event)}
                  currentPage={currentPage}
                />
              </div>

              <div className="button_container">
                <button onClick={redirectHome}> Continue Shopping </button>
              </div>
              <div className="cart_total">
                <h3>Cart totals</h3>
                <ul>
                  <li>
                    <span>Subtotal</span>
                    <span>{`${sumTotal()}`}</span>
                  </li>
                  <li>
                    <span>Shipping</span>
                    <span>Flat Rate: $30</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="empty">
              <div className="empty_icon">
                <ShoppingCartIcon />
              </div>
              <h1>Your cart is empty!</h1>
              <p>Browse our categories and discover our best deals!</p>
              <button onClick={redirectHome}>Start Shopping</button>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
}