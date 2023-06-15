import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const AddRules = lazy(() => import("../pages/AddRules"));
const EditRules = lazy(() => import("../pages/EditRule"));

export const baseURL = "http://localhost:8080";

export const routeData = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/checkout",
      component: Cart,
    },
    {
      path: "/add_product",
      component: AddProduct,
    },
    {
      path: "/add_rules",
      component: AddRules,
    },
    {
      path: "/edit_rules/:id",
      component: EditRules,
    },
  ];