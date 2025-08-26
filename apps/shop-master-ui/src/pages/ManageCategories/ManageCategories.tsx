import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Dialog, Typography } from "ui";
import { useCategoryContext } from "./CategoryContext";
import CategoryHeader from "./CategoryHeader";
import CategoryGrid from "./CategoryGrid";
import ProductGrid from "./ProductGrid";
import CategoryForm from "../../components/CategoryForm";
import ProductForm from "../../components/ProductForm";
import { TCategoryData, TProductData } from "schema";

const ManageCategories = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<TCategoryData | null>(
    null
  );
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<TProductData | null>(null);

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

  const handleCategoryEdit = (category: TCategoryData) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleProductEdit = (product: TProductData) => {
    setProductToEdit(product);
    setIsEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    setIsEditProductModalOpen(false);
    setProductToEdit(null);
  };

  return (
    <Box>
      <CategoryHeader
        onBack={handleBack}
        onCreateCategory={openCreateModalHandler}
        onCreateProduct={openCreateProductModal}
        onBreadcrumbClick={handleBreadcrumbClick}
      />
      {/* Product Grid */}
      {currentCategoryId && (
        <Box className="mt-8">
          <Typography variant="h5" className="mb-4">
            Products in this category
          </Typography>
          <ProductGrid onProductEdit={handleProductEdit} />
        </Box>
      )}
      {/* Category Grid */}
      <Box className="mt-8">
        <Typography variant="h5" className="mb-4">
          Categories
        </Typography>
        <CategoryGrid
          onCategoryClick={handleCategoryClick}
          onCategoryEdit={handleCategoryEdit}
        />
      </Box>

      {/* Create Category Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        maxWidth="lg"
        fullWidth
      >
        <CategoryForm
          onSuccess={closeCreateModal}
          parentCategoryId={currentCategoryId}
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

      {/* Edit Category Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={closeEditModal}
        maxWidth="lg"
        fullWidth
      >
        <CategoryForm
          onSuccess={closeEditModal}
          category={categoryToEdit || undefined}
          parentCategoryId={categoryToEdit?.parentId}
        />
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog
        open={isEditProductModalOpen}
        onClose={closeEditProductModal}
        maxWidth="lg"
        fullWidth
      >
        <ProductForm
          onSuccess={closeEditProductModal}
          product={productToEdit || undefined}
          categoryId={productToEdit?.categoryId}
        />
      </Dialog>
    </Box>
  );
};

export default ManageCategories;
