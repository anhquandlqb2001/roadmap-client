type ServerType = 'node' | 'php'

const SERVER: ServerType = 'node'
export const ENDPOINT = `/api/${SERVER}`
export const SERVER_ENDPOINT = "http://localhost:5000"


/*
 * user endpoints
*/
// dang nhap local
export const LOGIN_LOCAL_ENDPOINT = `${ENDPOINT}/user/login_local`
// export const LOGIN_LOCAL_ENDPOINT = `${ENDPOINT}/user/login_local.php`
// dang nhap facebook
export const LOGIN_FACEBOOK_ENDPOINT = `${ENDPOINT}/user/login_facebook`
// dang ky
export const REGISTER_LOCAL_ENDPOINT = `${ENDPOINT}/user/register`
// du lieu ng dung
export const CURRENT_USER_ENDPOINT = `${ENDPOINT}/user/current`


/**
 * road endpoints
 */
//
export const ADD_NEW_MAP_ENDPOINT = `${ENDPOINT}/road/add_map`
// bat dau lo trinh moi 
export const START_MAP_ENDPOINT = `${ENDPOINT}/road/startmap`
export const GET_MAP_ENDPOINT = `${ENDPOINT}/user/get_map`
export const CHANGE_FIELD_MAP_ENDPOINT = `${ENDPOINT}/user/`


export const MAP_ENDPOINT = `${ENDPOINT}/map`

export const MAP_SERVICE_ENDPOINT = `${ENDPOINT}/service/map`

export const USER_ENDPOINT = `${ENDPOINT}/user`

export const USER_SERVICE_ENDPOINT = `${ENDPOINT}/service/user`