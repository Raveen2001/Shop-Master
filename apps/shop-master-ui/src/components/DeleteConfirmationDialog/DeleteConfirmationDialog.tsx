import { FC } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "ui";
import { Warning } from "ui/icons";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName: string;
  isLoading?: boolean;
  error?: string | null;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isLoading = false,
  error = null,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box className="flex items-center gap-2">
          <Warning color="error" />
          <Typography variant="h6" color="error">
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box className="space-y-4">
          <Typography variant="body1">{message}</Typography>

          <Alert severity="warning" icon={<Warning />}>
            <Typography variant="body2">
              <strong>{`"${itemName}"`}</strong> will be permanently deleted and
              cannot be recovered.
            </Typography>
          </Alert>

          {error && (
            <Alert severity="error">
              <Typography variant="body2">{error}</Typography>
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
