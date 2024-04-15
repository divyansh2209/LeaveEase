export type Employee = {
    id: number;
    name: string;
    position: string;
};

export type LeaveRequest = {
    id: number;
    title: string;
    type: string;
    message: string;
    userId: number,
    status: string,
    start_date: string,
    end_date: string,
    feedback: string,
    created_at: Date,
};

