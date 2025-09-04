import { Box, Slide, Backdrop } from "ui";

type MobileDrawerProps = {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

// Drawer Handle Component
type DrawerHandleProps = {
  onToggle: () => void;
};

const DrawerHandle = ({ onToggle }: DrawerHandleProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      padding: "8px 0",
      cursor: "pointer",
    }}
    onClick={onToggle}
  >
    <Box
      sx={{
        width: "40px",
        height: "4px",
        backgroundColor: "#e0e0e0",
        borderRadius: "2px",
      }}
    />
  </Box>
);

// Mobile Drawer Component
const MobileDrawer = ({ isOpen, onToggle, children }: MobileDrawerProps) => (
  <>
    <Backdrop
      open={isOpen}
      onClick={onToggle}
      sx={{
        zIndex: 1199,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    />

    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
          maxHeight: "90dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHandle onToggle={onToggle} />
        <Box sx={{ overflow: "auto" }}>{children}</Box>
      </Box>
    </Slide>
  </>
);

export default MobileDrawer;
