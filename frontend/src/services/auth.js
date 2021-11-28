export const TOKEN_KEY = "&app-token";
export const ID_USER = "&id-user";
export const NAME_USER = "&name-user";

export const login = (token) => {
    return localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    return localStorage.clear();
};

export const setIdUser = (id) => {
    return localStorage.setItem(ID_USER, id);
};

export const getIdUser = () => {
    return localStorage.getItem(ID_USER);
};

export const setNameUser = (name) => {
    return localStorage.setItem(NAME_USER, name);
};

export const getNameUser = () => {
    return localStorage.getItem(NAME_USER);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};
