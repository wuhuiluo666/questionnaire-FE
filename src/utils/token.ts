export const TokenKey = 'TOKEN_KEY'

export const setToken = (token: string) => window.localStorage.setItem(TokenKey,token) 

export const getToken = () => window.localStorage.getItem(TokenKey)