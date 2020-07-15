const initialState = {
    isAuthenticated: false,
    theme: "darkly",
    tokenLocal: ""
}

const rand = Math.random().toString(30).substr(2);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'USER_TOKEN':
            localStorage.setItem( "tokenLocal:", rand );
            return {
                ...state,
                tokenLocal: rand
            };
        case 'USER_LOGGED_OUT':
            localStorage.setItem( "tokenLocal:", "" );
            return {
                ...state,
                isAuthenticated: false,
                tokenLocal: ""
            };
        case 'CHANGE_THEME':
            return{
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
}

export default reducer;