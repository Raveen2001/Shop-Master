//! depth decides if it is category or subCategory
//! depth 0 - category, 1 - subCategory.
export const isCategory = (depth: number) => {
  return depth === 0;
};

export const getEditLink = (id: string, depth: number) => {
  return "edit";
};
