import { Box, Stack, Typography } from "ui";

const Sidebar = () => {
  return (
    <Box className={"w-[250px] bg-slate-500 p-4"}>
      <Stack>
        <Typography variant="h5" color={"primary"}>
          Shop Master
        </Typography>
      </Stack>
    </Box>
  );
};

export default Sidebar;
