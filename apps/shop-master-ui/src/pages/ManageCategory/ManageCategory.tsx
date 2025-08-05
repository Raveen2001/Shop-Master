import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LoadingButton,
  Snackbar,
  Alert,
  IconButton,
  Breadcrumbs,
  Link,
  LinearProgress,
} from "ui";
import { Add, ArrowBack } from "ui/icons";
import { createCategory } from "../../services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalStore } from "../../store/globalStore";
import { TCategoryFormSchema } from "schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryFormSchema } from "schema";

const ManageCategories = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [
    owner,
    selectedShop,
    categories,
    isCategoryDataFetching,
    setIsCategoryDataFetching,
  ] = useGlobalStore((store) => [
    store.owner,
    store.selectedShop,
    store.categories,
    store.isCategoryDataFetching,
    store.setIsCategoryDataFetching,
  ]);

  console.log("isCategoryDataFetching", isCategoryDataFetching);

  const queryClient = useQueryClient();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const [breadcrumbPath, setBreadcrumbPath] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // Filter categories by parent
  const filteredCategories = categories.filter((cat) =>
    categoryId ? cat.parentId === categoryId : cat.parentId == null
  );

  // Create category mutation
  const {
    mutate: createCategoryMutation,
    isPending: isCreatingCategory,
    isError: isCreateCategoryError,
    error: createCategoryError,
  } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      setIsCategoryDataFetching(true);
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "categories"],
      });
      setIsCreateModalOpen(false);
    },
  });

  // Form for creating category
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    reset,
  } = useForm<TCategoryFormSchema>({
    resolver: yupResolver(CategoryFormSchema as any),
  });

  const handleCreateCategory = handleSubmit((data) => {
    const categoryData = {
      ...data,
      shopId: selectedShop?.id || "",
      ownerId: owner?.id || "",
      parentId: categoryId || null,
    };
    createCategoryMutation(categoryData);
  });

  const handleCategoryClick = (category: { id: string; name: string }) => {
    const newPath = [
      ...breadcrumbPath,
      { id: category.id, name: category.name },
    ];
    setBreadcrumbPath(newPath);
    navigate(`/categories/${category.id}`);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = breadcrumbPath.slice(0, index + 1);
    setBreadcrumbPath(newPath);
    if (index === -1) {
      navigate("/categories");
    } else {
      navigate(`/categories/${newPath[index].id}`);
    }
  };

  const handleCreateProduct = () => {
    navigate(`/products/create?categoryId=${categoryId}`);
  };

  const handleBack = () => {
    if (breadcrumbPath.length > 0) {
      const newPath = breadcrumbPath.slice(0, -1);
      setBreadcrumbPath(newPath);
      if (newPath.length === 0) {
        navigate("/categories");
      } else {
        navigate(`/categories/${newPath[newPath.length - 1].id}`);
      }
    } else {
      navigate("/categories");
    }
  };

  const openCreateModal = () => {
    reset();
    setValue("shopId", selectedShop?.id || "");
    setValue("ownerId", owner?.id || "");
    setValue("parentId", categoryId || null);
    setIsCreateModalOpen(true);
  };

  return (
    <>
      <Box className="mb-8">
        {/* Header */}
        <Box className="mb-4 flex items-center justify-between">
          <Box className="flex items-center gap-4">
            {categoryId && (
              <IconButton onClick={handleBack}>
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h6">
              {categoryId ? "Sub Categories" : "Categories"}
            </Typography>
          </Box>

          <Box className="flex gap-2">
            {categoryId && (
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={handleCreateProduct}
              >
                Create Product
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={openCreateModal}
            >
              Create Category
            </Button>
          </Box>
        </Box>

        {/* Breadcrumbs */}
        {breadcrumbPath.length > 0 && (
          <Breadcrumbs className="mb-4">
            <Link
              component="button"
              variant="body1"
              onClick={() => handleBreadcrumbClick(-1)}
              className="cursor-pointer"
            >
              Categories
            </Link>
            {breadcrumbPath.map((item, index) => (
              <Link
                key={item.id}
                component="button"
                variant="body1"
                onClick={() => handleBreadcrumbClick(index)}
                className="cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </Breadcrumbs>
        )}
      </Box>

      {/* Category Grid */}
      {isCategoryDataFetching ? (
        <Box className="flex h-64 flex-col items-center justify-center gap-4">
          <Typography>Loading categories... </Typography>
          <LinearProgress className="w-96" />
        </Box>
      ) : filteredCategories.length === 0 ? (
        <Box className="flex h-64 items-center justify-center">
          <Typography variant="h6" color="textSecondary">
            {categoryId ? "No sub-categories found" : "No categories found"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <Card
                className="h-full cursor-pointer transition-shadow duration-200 hover:shadow-lg"
                onClick={() => handleCategoryClick(category)}
              >
                <Box className="p-4 text-center">
                  <Box className="mx-auto mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Typography variant="h4" color="textSecondary">
                        {category.name.charAt(0).toUpperCase()}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="h6" className="font-medium">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Click to view sub-categories
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Category Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Category</DialogTitle>
        <form onSubmit={handleCreateCategory}>
          <DialogContent>
            <TextField
              label="Category Name *"
              {...register("name")}
              error={!!formErrors.name}
              helperText={formErrors.name?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL (optional)"
              {...register("image")}
              error={!!formErrors.image}
              helperText={formErrors.image?.message}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <LoadingButton
              loading={isCreatingCategory}
              variant="contained"
              type="submit"
            >
              Create Category
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={isCreateCategoryError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {(createCategoryError as any)?.response?.data.error ??
            "Something went wrong, please try again later"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ManageCategories;
