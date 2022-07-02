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
    backdrop: true,
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




const panelInitial = {
    signalsList: null,
    articles: null
}

export const panelReducer = (state = panelInitial, action) => {
    switch (action.type) {
        case 'SIGNAL_LIST':
            return {
                ...state,
                signalsList: action.payload.signalsList
            }
        case 'SIGNAL_LIST_ADD':
            return {
                ...state,
                signalsList: [action.payload.signal, ...state.signalsList]
            }
        case 'ARTICLE_LIST':
            return {
                ...state,
                articles: action.payload.articles
            }
        default:
            return { ...state };
    }
}
