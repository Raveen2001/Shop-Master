import { TProductData, TCategoryData } from "schema";

export const mergeProductData = (
  products: TProductData[],
  categories: TCategoryData[]
): TProductData[] => {
  const updatedProducts = products.map((product) => {
    const category = categories.find(
      (category) => category.id === product.categoryId
    );

    const subCategories = category?.subCategories || [];
    const subCategory = subCategories.find(
      (subCategory) => subCategory.id === product.subCategoryId
    );

    return {
      ...product,
      category,
      subCategory,
    };
  });

  return updatedProducts;
};
