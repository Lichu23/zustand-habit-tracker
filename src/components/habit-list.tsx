import useHabitStore from "../store/store";
import { Box, Button, Grid, Grid2, Paper, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";

const HabitList = () => {
  const { habits, removeHabit, toggleHabit} = useHabitStore();

  const today = new Date().toISOString().split("T")[0]; //return date like this: '2024-12-13'
  return (
    <div>
      {habits.map((habit) => (
        <ul key={habit.id}>
          <Paper sx={{ padding: 2 }} elevation={3}>
            <Grid container alignItems="center">
              <Grid xs={10} sm={6}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography color="text.secondary">
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid xs={10} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                  onClick={() => toggleHabit(habit.id , today)}
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    variant="outlined"
                  >
                    {habit.completedDates.includes(today)
                      ? <CheckBoxOutlineBlankIcon/>
                      : <CheckBoxIcon />}
                  </Button>
                  <Button
                    onClick={() => removeHabit(habit.id)}
                    color="error"
                    variant="outlined"
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </ul>
      ))}
    </div>
  );
};

export default HabitList;
