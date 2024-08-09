export interface CreateGroup {
    Body: {
        description: string;
        active: number
    }
}

export interface UpdateGroup {
    Body: {
        id: number;
        description?: string;
        active?: number
    }
}