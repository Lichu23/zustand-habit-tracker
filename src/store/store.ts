import { create } from "zustand";
import { Habit } from "../interfaces/Habit/habit";
import { createJSONStorage, persist } from "zustand/middleware";

export interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
}
const useHabitStore = create<HabitState>()(
  persist(
    (set) => {
      return {
        habits: [],
        addHabit: (name, frequency) =>
          set((state) => {
            return {
              habits: [
                ...state.habits,
                {
                  id: Math.floor(Math.random() * 999).toString(),
                  name,
                  frequency,
                  createdAt: new Date().toISOString(),
                  completedDates: [],
                },
              ],
            };
          }),
          
        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),
    
        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((day) => day !== date) //remove date
                      : [...habit.completedDates, date] //add Date
                  }
                : habit
            ),
          })),
      }
    }, {
      name: "habit-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useHabitStore;
