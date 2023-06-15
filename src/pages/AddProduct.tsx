import Layout from "../components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import RuleService from "../service/rules.service";
import { useNavigate } from "react-router-dom";
import { IProductRules } from "../interface/product";
import ProductService from "../service/products.service";
import ButtonWithRippleEffect from "../components/ButtonWithRippleEffect";
import ProductAdditionAlert from "../components/ProductAdditionAlert";

export default function AddProduct() {
  const [rule, setRules] = useState<IProductRules[]>([]);
  const [sku, setSku] = useState<string>();
  const [priceErr, setPriceErr] = useState<string>();
  const [showAlert, setShowAlert] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  const navigate = useNavigate();
  const redirectHome = () => navigate("/");

  const schema = z.object({
    title: z
      .string()
      .min(3, { message: "title should be atleast 3 characters" }),
    description: z
      .string()
      .min(3, { message: "description should be atleast 3 characters" }),
    price: z
      .number({ invalid_type_error: "Price is required and must be a number" })
      .min(1),
    image: z.string().min(3, { message: "image is required" }),
  });

  type MyFormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<MyFormValues> = (data) => {
    if (!sku) {
      setPriceErr("Kindly select at least an empty price rule");
      return false;
    }
    const newProduct = {
      ...data,
      sku: sku,
    };
    const postData = new ProductService().postProducts(newProduct);
    setFeedback("Products deleted successfully");
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      redirectHome();
    }, 3000);
    return postData;
  };

  const renderRules = async () => {
    const productRules = (await new RuleService()
      .getAllRules()
      .then((rules) => rules)
      .then((rules) => rules)) as IProductRules[];
    setRules(productRules);
    return productRules;
  };

  const selectPrice = (value: string) => setSku(value);

  useEffect(() => {
    renderRules();
  }, []);

  return (
    <Layout>
      {showAlert && (
        <ProductAdditionAlert
          setShowAlert={setShowAlert}
          message={feedback}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add__product">
          <div className="add__product__component">
            <div className="left">
              <div className="basic__information">
                <h5> Product infor</h5>
                <div className="input__label">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    placeholder="Brandix Screwdriver SCREW150"
                    {...register("title")}
                  />
                  {errors["title"] && (
                    <p className="text-danger">{errors["title"]["message"]}</p>
                  )}
                </div>
                <div className="input__label">
                  <label htmlFor="">Description</label>
                  <textarea
                    id=""
                    cols={30}
                    rows={10}
                    {...register("description")}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ornare, mi in ornare elementum, libero nibh lacinia urna, quis convallis lorem erat at purus. Maecenas eu varius nisi."
                  ></textarea>
                  {errors["description"] && (
                    <p className="text-danger">
                      {errors["description"]["message"]}
                    </p>
                  )}
                </div>
                <div className="input__label">
                  <label htmlFor="">Image</label>
                  <textarea
                    id=""
                    cols={30}
                    rows={3}
                    placeholder="Enter the image Url"
                    {...register("image")}
                  ></textarea>
                </div>
              </div>

              <div className="basic__information">
                <h5>Pricing</h5>
                <div className="input__label">
                  <label htmlFor=""> price</label>
                  <input
                    type="text"
                    placeholder=""
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors["price"] && (
                    <p className="text-danger">{errors["price"]["message"]}</p>
                  )}
                </div>

                <div className="input__label__wrapper">
                  <div className="input__label">
                    <label htmlFor=""> Apply rules </label>

                    <select onChange={(e) => selectPrice(e.target.value)}>
                      {rule &&
                        rule.length > 0 &&
                        rule.map((items: IProductRules, index: number) => {
                          return (
                            <option value={`${items.item_sku}`} key={index * 2}>
                              {" "}
                              {items.item_sku}
                            </option>
                          );
                        })}
                    </select>
                    <label htmlFor=""> {priceErr} </label>
                  </div>
                </div>
              </div>
              <ButtonWithRippleEffect label="+ Add Product" type="submit" />
            </div>
            <div className="right">
              <div className="basic__information">
                <h5>Product Rule</h5>

                <table className="table">
                  <thead>
                    <th>item</th>
                    <th>Special Price</th>
                  </thead>

                  <tbody className="">
                    {rule &&
                      rule.map((rule: IProductRules) => {
                        return (
                          <tr>
                            <td className="">{rule.item_sku}</td>
                            <td className="">{rule.rules}</td>
                          </tr>
                        );
                      })}
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}