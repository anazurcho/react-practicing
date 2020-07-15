const userAuthenticated = () => {
    return {
        type: 'USER_AUTHENTICATED'
    };
}

const userLoggedOut = () => {
    return {
        type: 'USER_LOGGED_OUT'
    };
}
const userToken = () => {
    return {
        type: 'USER_TOKEN'
    };
}

const changeTheme = ( theme ) => {
    return {
        type: 'CHANGE_THEME',
        payload: theme
    };
}

export {
    userAuthenticated,
    userLoggedOut,
    changeTheme,
    userToken,
    USER_AUTHENTICATED,
    CHANGE_THEME,
    USER_TOKEN,
    USER_LOGGED_OUT
}


const USER_AUTHENTICATED = "USER_AUTHENTICATED";
const CHANGE_THEME = "CHANGE_THEME";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";
const USER_TOKEN = "USER_TOKEN";