import { TProductData, TCategoryData, TBrandData } from "schema";

export const mergeProductData = (
  products: TProductData[],
  brands: TBrandData[],
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

    const brand = brands.find((brand) => brand.id === product.brandId);

    return {
      ...product,
      category,
      subCategory,
      brand,
    };
  });

  return updatedProducts;
};
