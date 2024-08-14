export interface SendInvitation {
    Body: {
        email: string;
        group_id: number;
    };
}

export interface HandleInvitation {
    Body: {
        id: number;
        action: string;
    };
}