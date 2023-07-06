export interface TodoModel {
    id: number
    user_id: number
    title: string
    due_on: string
    status: TodoStatus
}

export type TodoStatus = "completed"| "pending";