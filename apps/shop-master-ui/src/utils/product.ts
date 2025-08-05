import { TProductData, TCategoryData } from "schema";

export const mergeProductData = (
  products: TProductData[],
  categories: TCategoryData[]
): TProductData[] => {
  const updatedProducts = products.map((product) => {
    const category = categories.find(
      (category) => category.id === product.categoryId
    );

    return {
      ...product,
      category,
    };
  });

  return updatedProducts;
};
