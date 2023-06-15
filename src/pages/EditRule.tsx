import Layout from "../components/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import APIClient from "../service/api-client";
import { useEffect, useState } from "react";
import { baseURL } from "../service/routes";
import { IProductRules } from "../interface/product";
import RuleService from "../service/rules.service";
import ButtonWithRippleEffect from "../components/ButtonWithRippleEffect";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductAdditionAlert from "../components/ProductAdditionAlert";

export default function EditRules(props: any) {

    const [showAlert, setShowAlert] = useState(false);
    const [rules, setRuleData] = useState<IProductRules[]>([]);
    const [editRule, setEditRule] = useState<IProductRules>();
    const [err, setRuleErr] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const { id } = useParams()

    const navigate = useNavigate();
    const refreshPage = () => navigate("/");

    const schema = z.object({

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
        const { special_Price_Qty, special_Price } = data;
        const refinedData = {
            item_sku: editRule?.item_sku,
            rules:
                parseFloat(special_Price_Qty as string) &&
                    parseFloat(special_Price as string)
                    ? [special_Price_Qty + " for " + special_Price]
                    : [],
        };


        const postData = new RuleService().update(id, refinedData);
        setFeedback("Rule Edited successfully");
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
            refreshPage();
        }, 3000);
        return postData;
    };

    const renderRules = async () => {
        const productRules = (await new RuleService()
            .getAllRules()
            .then((rules) => rules)
            .then((rules) => rules)) as IProductRules[];
        setRuleData(productRules);
        const searchPreviousRules = productRules.find((rule) => {
            return rule.id == id
        });
        setEditRule(searchPreviousRules)
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
                            <h5>Edit Product Rule</h5>
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
                                                placeholder={editRule?.item_sku}
                                                readOnly
                                            />
                                        </div>

                                        <div className="input__label">
                                            <label htmlFor=""> Special Quantity</label>
                                            <input
                                                placeholder={editRule?.rules[0].split(" for ")[0]}

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
                                            <input
                                                placeholder={editRule?.rules[0].split(" for ")[1]}

                                                {...register("special_Price")} />
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

                </div>
            </div>
        </Layout>
    );
}