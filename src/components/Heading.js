import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

export function Heading() {
  return (
    <Box paddingTop={4}>
      <Typography variant="h3" gutterBottom>
        Todo List
      </Typography>
    </Box>
  );
}
