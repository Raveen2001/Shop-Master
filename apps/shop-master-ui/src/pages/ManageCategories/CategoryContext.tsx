import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/category";
import { useGlobalStore } from "../../store/globalStore";
import { TCategoryData, TCategoryFormSchema } from "schema";

interface CategoryContextType {
  // State
  categories: TCategoryData[];
  isLoading: boolean;
  currentCategoryId: string | null;
  filteredCategories: TCategoryData[];
  breadcrumbPath: Array<{ id: string; name: string }>;
  isCreateModalOpen: boolean;

  // Methods
  setCurrentCategoryId: (id: string | null) => void;
  setBreadcrumbPath: (path: Array<{ id: string; name: string }>) => void;
  addToBreadcrumb: (category: { id: string; name: string }) => void;
  removeFromBreadcrumb: (index: number) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  createNewCategory: (data: TCategoryFormSchema) => Promise<void>;
  navigateToCategory: (category: { id: string; name: string }) => void;
  navigateBack: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );
  const [
    categories,
    selectedShop,
    owner,
    setIsCategoryDataFetching,
    isCategoryDataFetching,
  ] = useGlobalStore((store) => [
    store.categories,
    store.selectedShop,
    store.owner,
    store.setIsCategoryDataFetching,
    store.isCategoryDataFetching,
  ]);

  const [breadcrumbPath, setBreadcrumbPath] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const queryClient = useQueryClient();

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setIsCategoryDataFetching(true);
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
      closeCreateModal();
    },
  });

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      currentCategoryId ? cat.parentId === currentCategoryId : !cat.parentId
    );
  }, [categories, currentCategoryId]);

  // Methods
  const addToBreadcrumb = (category: { id: string; name: string }) => {
    const newPath = [...breadcrumbPath, category];
    setBreadcrumbPath(newPath);
  };

  const removeFromBreadcrumb = (index: number) => {
    const newPath = breadcrumbPath.slice(0, index + 1);
    setBreadcrumbPath(newPath);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const createNewCategory = async (data: TCategoryFormSchema) => {
    const categoryData = {
      ...data,
      shopId: selectedShop?.id || "",
      ownerId: owner?.id || "",
      parentId: currentCategoryId || null,
    };
    await createCategoryMutation.mutateAsync(categoryData);
  };

  const navigateToCategory = (category: { id: string; name: string }) => {
    addToBreadcrumb(category);
    setCurrentCategoryId(category.id);
  };

  const navigateBack = () => {
    if (breadcrumbPath.length > 0) {
      const newPath = breadcrumbPath.slice(0, -1);
      setBreadcrumbPath(newPath);
      if (newPath.length === 0) {
        setCurrentCategoryId(null);
      } else {
        setCurrentCategoryId(newPath[newPath.length - 1].id);
      }
    } else {
      setCurrentCategoryId(null);
    }
  };

  const contextValue: CategoryContextType = {
    // State
    categories,
    isLoading: isCategoryDataFetching,
    currentCategoryId,
    breadcrumbPath,
    isCreateModalOpen,
    filteredCategories,

    // Methods
    setCurrentCategoryId,
    setBreadcrumbPath,
    addToBreadcrumb,
    removeFromBreadcrumb,
    openCreateModal,
    closeCreateModal,
    createNewCategory,
    navigateToCategory,
    navigateBack,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
