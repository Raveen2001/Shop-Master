import { Box, Stack, Typography } from "ui";

const Sidebar = () => {
  return (
    <Box className={"h-screen w-[250px] border-r-2 border-dotted p-4"}>
      <Stack>
        <Typography variant="h5" color={"primary"}>
          Shop Master
        </Typography>
      </Stack>
    </Box>
  );
};

export default Sidebar;
