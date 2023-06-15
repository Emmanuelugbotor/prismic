export const extractProductRules = <T, P extends { item_sku: string, rules: Array<string> }>(product: T[], productRule: P[]) => {

    const actualProductRule = [] as unknown[];

    const refinedProd = extractProductSku(product);
    productRule.forEach((element) => {
        refinedProd.forEach((product) => {
            if (element.item_sku == product.product.sku) {
                actualProductRule.push({
                    sku: product.product.sku,
                    totalSku: product.totalSku,
                    price: product.product.price,
                    rules: element.rules
                });
            }
        })
    });

    return actualProductRule
}

export const extractProductSku = <T>(product: T[]) => {
    return product?.map((items: any) => {
        return (
            {
                ...items,
                totalSku: items?.product?.sku.repeat(items?.quantity),
            }
        )
    });
}

export const checkout = <T extends { rules: Array<string>, price: number, sku: string }>(goods: string, rules: T[]) => {

    let productCounter = getProductCount(goods);
    let productQty = 1;
    let productQtyRule = [];
    let productPrice = 1;
    let totalPrice = 0;
    let ruleQty = 1

    rules.forEach((items: any) => {
        productQty = productCounter[items?.sku] as number;
        productQtyRule = items?.rules[0]?.split(" for ") as Array<string>;
        ruleQty = productQtyRule && parseFloat(productQtyRule[0]) as number;
        productPrice = items.price;

        if (productQtyRule) {
            if (productQty < ruleQty) {
                totalPrice += productPrice * productQty;
            }
            if (productQty === ruleQty) {
                totalPrice += parseFloat(productQtyRule[1]);
            }
            if (
                productQty > ruleQty &&
                productQty % ruleQty === 0
            ) {
                totalPrice +=
                    (productQty / ruleQty) *
                    parseFloat(productQtyRule[1]);
            }
            if (
                productQty > ruleQty &&
                productQty % ruleQty !== 0
            ) {
                totalPrice +=
                    Math.floor(productQty / ruleQty) *
                    parseFloat(productQtyRule[1]) +
                    (productQty % ruleQty) * productPrice;
            }
        } else {
            totalPrice += productPrice * productQty;
        }
    });

    return totalPrice
}

export const getProductCount = (goods: string) => {
    const goodsCounterObject: { [key: string]: number } = {};
    goods
        .split("")
        .forEach((items) =>
            goodsCounterObject.hasOwnProperty(items)
                ? (goodsCounterObject[items] = goodsCounterObject[items] + 1)
                : (goodsCounterObject[items] = 1)
        );

    return goodsCounterObject;
}