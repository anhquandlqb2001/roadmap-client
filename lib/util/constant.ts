type ServerType = 'node' | 'php'

const SERVER: ServerType = 'node'

export const SERVER_ENDPOINT = "http://localhost:5000"
export const LOGIN_LOCAL_ENDPOINT = `/api/${SERVER}/user/login_local`
export const LOGIN_FACEBOOK_ENDPOINT = `/api/${SERVER}/user/login_facebook`
export const REGISTER_LOCAL_ENDPOINT = `/api/${SERVER}/user/register`
export const CURRENT_USER_ENDPOINT = `/api/${SERVER}/user/current`
export const ADD_NEW_MAP_ENDPOINT = `/api/${SERVER}/roadmap/add_map`
export const START_REACT_MAP_ENDPOINT = `/api/${SERVER}/user/react/start`
export const GET_REACT_MAP_ENDPOINT = `/api/${SERVER}/user/react`
export const CHANGE_FIELD_REACT_MAP_ENDPOINT = `/api/${SERVER}/user/react`
