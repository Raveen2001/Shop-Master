import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, LinearProgress } from "ui";
import { useCategoryContext } from "./CategoryContext";
import CreateCategoryModal from "./CreateCategoryModal";
import CategoryHeader from "./CategoryHeader";
import CategoryGrid from "./CategoryGrid";

const ManageCategories = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const {
    isLoading,
    currentCategoryId,
    breadcrumbPath,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
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

  const handleCreateProduct = () => {
    navigate(`/products/create?categoryId=${currentCategoryId}`);
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
        onCreateProduct={handleCreateProduct}
        onBreadcrumbClick={handleBreadcrumbClick}
      />

      {/* Loading Progress */}
      {isLoading && (
        <Box className="mb-4">
          <LinearProgress />
        </Box>
      )}

      {/* Category Grid */}
      <CategoryGrid onCategoryClick={handleCategoryClick} />

      {/* Create Category Modal */}
      <CreateCategoryModal open={isCreateModalOpen} />
    </Box>
  );
};

export default ManageCategories;
