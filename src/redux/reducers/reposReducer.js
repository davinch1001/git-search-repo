import axios from "axios";

const GET_REPO_DATA = 'GET_REPO_DATA'
const SEARCH_INPUT = 'SEARCH_INPUT'
const GET_README = 'GET_README'
const GET_USER_INFO = 'GET_USER_INFO'

const initState = {
    reposData: [],
    readme: '',
    searchInput: '',
    userInfor: []
}


export default (state = initState, action) => {
    switch (action.type) {
        case GET_USER_INFO:{
            return {...state, userInfor: action.userInfor}
        }
        case GET_README : {
            return {...state, readme: action.readme}

        }
        case SEARCH_INPUT: {
            return {...state, searchInput: action.searchInput}
        }
        case GET_REPO_DATA: {
            return {...state, reposData: action.reposData}
        }
        default:
            return state;
    }
}

export const getRepos = (userName) => {
    return (dispatch) => {
        axios(`https://api.github.com/users/${userName}/repos`)
            .then(({data}) => {
                return dispatch({type: GET_REPO_DATA, reposData: data})
            })
    }
}

export const getReadme = (full_name) => {
    return (dispatch) => {
        axios(`https://raw.githubusercontent.com/${full_name}/main/README.md`)
            .then(({data}) => dispatch({type: GET_README, readme: data}))
            .catch((err) => {
                if (err) {
                    axios(`https://raw.githubusercontent.com/${full_name}/master/README.md`)
                        .then(({data}) => dispatch({type: GET_README, readme: data}))
                        .catch(() => {
                            return dispatch({type: GET_README, readme: '# Not found README.md'})
                        })
                }
            })
    }
}

export const search = (newValue) => {
    return {type: SEARCH_INPUT, searchInput: newValue}
}

export const getUserInfo = (userName) => {
    return (dispatch) => {
        axios(`https://api.github.com/users/${userName}`)
            .then(({data}) => {
                return dispatch({type: GET_USER_INFO, userInfor: data})
            })
    }
}