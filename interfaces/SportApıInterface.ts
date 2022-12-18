

export interface SportAPIInterface<T> {
    data: T;
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    }
}