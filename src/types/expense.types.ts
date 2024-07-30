export interface ExpenseRequest {
    Body: {
        title: string;
        notes: string;
        price: number;
        category_id: number;
        group_id?: number;
    }
};