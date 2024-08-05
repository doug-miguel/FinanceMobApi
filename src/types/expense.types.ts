export interface ExpenseRequest {
    Body: {
        title: string;
        notes: string;
        price: number;
        category_id: number;
        user_group?: number;
    }
};

export interface ExpenseUpdateRequest {
    Body: {
        id: number;
        title?: string;
        notes?: string;
        price?: number;
        category_id?: number;
        group_id?: number;
        user_group?: number;
    }
};