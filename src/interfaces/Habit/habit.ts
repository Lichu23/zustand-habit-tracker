export interface Habit {
    id:string,
    name:string 
    frequency: "daily" | "weekly"
    completedDates: string[]
    createdAt: string
}
