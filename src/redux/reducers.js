import moment from "moment"


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
    newsList: null,
    licenseOk: false,
    openLicenseDialog: false
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
        case 'SIGNAL_RESULT':
            const ii = state.signalsList.findIndex((v) => v.id === action.payload.signal.id)
            state.signalsList[ii] = action.payload.signal
            return {
                ...state,
                signalsList: [...state.signalsList]
            }
        case 'NEWS_LIST':
            return {
                ...state,
                newsList: action.payload.newsList
            }
        case 'NEWS_LIST_ADD':
            if (!action.payload.news.id) {
                action.payload.news.created_datetime = moment().toISOString()
            }
            return {
                ...state,
                newsList: [action.payload.news, ...state.newsList]
            }
        case 'LICENSE_OK':
            return {
                ...state,
                licenseOk: action.payload.licenseOk
            }
        case 'LICENSE_OPEN':
            return {
                ...state,
                openLicenseDialog: action.payload.open
            }
        default:
            return { ...state };
    }
}
