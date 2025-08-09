import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Dialog, Typography } from "ui";
import { useCategoryContext } from "./CategoryContext";
import CategoryHeader from "./CategoryHeader";
import CategoryGrid from "./CategoryGrid";
import ProductGrid from "./ProductGrid";
import CategoryForm from "../../components/CategoryForm";
import ProductForm from "../../components/ProductForm";
import ProductVariantForm from "../ProductVariantForm/ProductVariantForm";

const ManageCategories = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const {
    currentCategoryId,
    breadcrumbPath,
    isCreateModalOpen,
    isCreateProductModalOpen,

    openCreateModal,
    closeCreateModal,
    openCreateProductModal,
    closeCreateProductModal,

    navigateToCategory,
    navigateBack,
    setCurrentCategoryId,
    removeFromBreadcrumb,
  } = useCategoryContext();

  // Sync URL params with context
  useEffect(() => {
    setCurrentCategoryId(categoryId || null);
  }, [categoryId, setCurrentCategoryId]);

  const handleCategoryClick = (category: { id: string; name: string }) => {
    navigateToCategory(category);
    navigate(`/categories/${category.id}`);
  };

  const handleBreadcrumbClick = (index: number) => {
    removeFromBreadcrumb(index);
    if (index === -1) {
      navigate("/categories");
    } else {
      navigate(`/categories/${breadcrumbPath[index].id}`);
    }
  };

  const handleBack = () => {
    navigateBack();
    if (breadcrumbPath.length === 0) {
      navigate("/categories");
    } else {
      navigate(`/categories/${breadcrumbPath[breadcrumbPath.length - 1].id}`);
    }
  };

  const openCreateModalHandler = () => {
    openCreateModal();
  };

  return (
    <Box>
      <CategoryHeader
        onBack={handleBack}
        onCreateCategory={openCreateModalHandler}
        onCreateProduct={openCreateProductModal}
        onBreadcrumbClick={handleBreadcrumbClick}
      />

      {/* Category Grid */}
      <Box className="mt-8">
        <CategoryGrid onCategoryClick={handleCategoryClick} />
      </Box>

      {/* Product Grid */}
      {currentCategoryId && (
        <Box className="mt-8">
          <Typography variant="h5" className="mb-4">
            Products in this category
          </Typography>
          <ProductGrid />
        </Box>
      )}

      {/* Create Category Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        maxWidth="lg"
        fullWidth
      >
        <CategoryForm
          onSuccess={closeCreateModal}
          parentCategoryId={categoryId}
        />
      </Dialog>

      {/* Create Product Modal */}
      <Dialog
        open={isCreateProductModalOpen}
        onClose={closeCreateProductModal}
        maxWidth="lg"
        fullWidth
      >
        <ProductForm
          onSuccess={closeCreateProductModal}
          categoryId={currentCategoryId}
        />
      </Dialog>
    </Box>
  );
};

export default ManageCategories;
