type ServerType = 'node' | 'php'

const SERVER: ServerType = 'node'
const ENDPOINT = `/api/${SERVER}`
export const SERVER_ENDPOINT = "http://localhost:5000"

export const LOGIN_LOCAL_ENDPOINT = `${ENDPOINT}/user/login_local`
export const LOGIN_FACEBOOK_ENDPOINT = `${ENDPOINT}/user/login_facebook`
export const REGISTER_LOCAL_ENDPOINT = `${ENDPOINT}/user/register`
export const CURRENT_USER_ENDPOINT = `${ENDPOINT}/user/current`
export const ADD_NEW_MAP_ENDPOINT = `${ENDPOINT}/roadmap/add_map`
export const START_MAP_ENDPOINT = `${ENDPOINT}/user/startmap`
export const GET_MAP_ENDPOINT = `${ENDPOINT}/user/get_map`
export const CHANGE_FIELD_MAP_ENDPOINT = `${ENDPOINT}/user/`
