export enum TaskStatus { Pending, Completed }

export interface Task {
    id: number;
    title: string;
    description: string;
    assignedUser: string;
    status: TaskStatus;
}