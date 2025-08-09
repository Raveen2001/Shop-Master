import { TCategoryData, TProductData } from "schema";

export const mergeProductData = <T extends TProductData | TProductData[]>(
  products: T,
  categories: TCategoryData[],
): T => {
  const productsArray = Array.isArray(products) ? products : [products];

  const updatedProducts: TProductData[] = productsArray.map((product) => {
    const category = categories.find(
      (category) => category.id === product.categoryId,
    );

    return {
      ...product,
      category,
    };
  });

  return Array.isArray(products)
    ? (updatedProducts as T)
    : (updatedProducts[0] as T);
};
