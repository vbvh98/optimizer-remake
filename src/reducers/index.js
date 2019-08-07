export const columnReducer = (initialState = 3, action) => {
    switch (action.type) {
        case "COLUMN_COUNT_3":
            return 3;
        case "COLUMN_COUNT_5":
            return 5;
        default:
            return initialState;
    }
};

export const tableReducer = (initialState = [], action) => {
    switch (action.type) {
        case "SET_TABLE_DATA":
            return action.payload;
        case "RESET_TABLE_DATA":
            return [];
        default:
            return initialState;
    }
};

export const profileReducer = (initialState = 0, action) => {
    switch (action.type) {
        case "SET_LENGTH":
            return action.payload;
        case "RESET_LENGTH":
            return 0;
        default:
            return initialState;
    }
};