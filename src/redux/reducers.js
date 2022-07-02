const authInitial = {
    user: null
}
export const authReducer = (state = authInitial, action) => {
    switch (action.type) {
        case 'USER_INFO':
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return { ...state };
    }
}



const appInitial = {
    backdrop: true
}
export const appReducer = (state = appInitial, action) => {
    switch (action.type) {
        case 'BACKDROP':
            return {
                ...state,
                backdrop: action.payload.backdrop
            }
        default:
            return { ...state };
    }
}