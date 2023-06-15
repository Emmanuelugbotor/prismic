import Layout from "../components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { IProductRules } from "../interface/product";
import RuleService from "../service/rules.service";
import ButtonWithRippleEffect from "../components/ButtonWithRippleEffect";
import { useNavigate } from "react-router-dom";
import ProductAdditionAlert from "../components/ProductAdditionAlert";

export default function AddRules() {
  const [showAlert, setShowAlert] = useState(false);
  const [rules, setRuleData] = useState<IProductRules[]>([]);
  const [err, setRuleErr] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const navigate = useNavigate();
  const refreshPage = () => navigate("/");

  const schema = z.object({
    item_sku: z
      .string({ invalid_type_error: "stock keeping unit is required" })
      .min(1, {
        message: "stock keeping unit should be at least 1 characters",
      }),

    special_Price_Qty: z.string().optional(),
    special_Price: z.string().optional(),
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
    const { item_sku, special_Price_Qty, special_Price } = data;
    const refinedData = {
      item_sku,
      rules:
        parseFloat(special_Price_Qty as string) &&
          parseFloat(special_Price as string)
          ? [special_Price_Qty + " for " + special_Price]
          : [],
    };
    const searchPreviousRules =
      rules && rules?.find((rule) => rule.item_sku === item_sku);
    if (searchPreviousRules) {
      setRuleErr("This SKU already exists");
      return false;
    }

    const postData = new RuleService().postRules(refinedData);
    setFeedback("Rule added successfully");
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      refreshPage();
    }, 3000);
    return postData;
  };

  const deleteRule = (ruleID: number | undefined) => {
    if (window.confirm("Are you sure you want to delete this rule")) {
      const postData = new RuleService().deleteRulesById(ruleID);
      setFeedback("Rule deleted successfully");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        refreshPage();
      }, 3000);
      return postData;
    }
  };

  const editRule = (ruleID: number | undefined) => {
    navigate(`/edit_rules/${ruleID}`)
  };

  const renderRules = async () => {
    const productRules = (await new RuleService()
      .getAllRules()
      .then((rules) => rules)
      .then((rules) => rules)) as IProductRules[];
    setRuleData(productRules);
    return productRules;
  };

  useEffect(() => {
    renderRules();
  }, []);

  return (
    <Layout>
      <div className="add__product">
        <div className="add__product__component">
          {showAlert && (
            <ProductAdditionAlert
              setShowAlert={setShowAlert}
              message={feedback}
            />
          )}
          <div className="right">
            <div className="basic__information">
              <h5>Add New Product Rule</h5>
              <h5> {err && err} </h5>

              <div className="flex">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex" }}>
                    <div className="input__label">
                      <label htmlFor=""> Sku </label>
                      <input
                        type="text"
                        required
                        placeholder="E"
                        {...register("item_sku")}
                      />
                      {errors["item_sku"] && (
                        <p className="text-danger">
                          {errors["item_sku"]["message"]}
                        </p>
                      )}
                    </div>

                    <div className="input__label">
                      <label htmlFor=""> Special Quantity</label>
                      <input
                        placeholder="3"
                        {...register("special_Price_Qty")}
                      />
                      {errors["special_Price_Qty"] && (
                        <p className="text-danger">
                          {errors["special_Price_Qty"]["message"]}
                        </p>
                      )}
                    </div>

                    <div className="input__label">
                      <label htmlFor=""> for </label>

                      <input type="button" placeholder="for" value={"for"} />
                    </div>

                    <div className="input__label">
                      <label htmlFor=""> Special Price</label>
                      <input placeholder="130" {...register("special_Price")} />
                      {errors["special_Price"] && (
                        <p className="text-danger">
                          {errors["special_Price"]["message"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <ButtonWithRippleEffect label="Submit" type="submit" />
                </form>
              </div>
            </div>
          </div>

          <div className="left">
            <div className="basic__information">
              <h5>Edit Available Product Rule</h5>

              <div
                className="flex"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <table className="table">
                  <thead>
                    <th>item</th>
                    <th>Special Price</th>
                    <th> for</th>
                    <th>Special Qty</th>
                  </thead>
                  {/* </table> */}

                  <tbody className="">
                    {rules &&
                      rules.map((rule: IProductRules, index: number) => {
                        return (
                          <tr key={index * 3}>
                            {/* <form
                        key={index * 3}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      > */}
                            <td className="">
                              <input placeholder={rule.item_sku} readOnly />
                            </td>

                            <td className="">
                              <input
                                type="number"
                                min={1}
                                placeholder={rule?.rules[0]?.split(" for ")[0]}
                                required
                                id={`item_sku_qty_${rule.id} `}
                              />
                            </td>

                            <td className="">
                              <input value={"for"} readOnly />
                            </td>

                            <td className="">
                              <input
                                type="text"
                                min={1}
                                placeholder={rule?.rules[0]?.split(" for ")[1]}
                                required
                                id={`item_sku_amt_${rule.id} `}
                              />
                            </td>

                            <div style={{ display: "flex" }}>
                              <input
                                value={"Delete"}
                                type="button"
                                onClick={() => deleteRule(rule.id)}
                                style={{
                                  background: "#e64040",
                                  border: "#e64040",
                                  color: "white",
                                  padding: "2px",
                                  marginRight: "4px",
                                  cursor: "pointer",
                                }}
                              />

                              <input
                                value={"Edit"}
                                type="submit"
                                onClick={() =>
                                  editRule(rule.id)
                                }
                                style={{
                                  background: "green",
                                  border: "green",
                                  color: "white",
                                  padding: "2px",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                            {/* </form> */}
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
      </div>
    </Layout>
  );
}