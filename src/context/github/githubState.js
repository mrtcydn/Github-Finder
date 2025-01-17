import React,{useReducer} from 'react'
import GithubReducer from './githubReducer'
import GithubContext from './githubContext'
import axios from 'axios'

const GithubState = (props) => {
    const initialState = {
        users : [],
        user : {},
        repos : [],
        loading : false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    const searchUsers = (keyword) => {
        setLoading();
        setTimeout(() => {
            axios
                .get(`https://api.github.com/search/users?q=${keyword}`)
                .then(res => {
                    dispatch({
                        payload : res.data.items,
                        type : "SEARCH_USERS",
                    })
                });
            }, 1000);
    }

    const clearResults = (e) => {
        dispatch({
            type : "CLEAR_RESULTS"
        })
        e.preventDefault();
    }

    const getUser = (username) => {
        setLoading(true);
        setTimeout(() => {
            axios
                .get(`https://api.github.com/users/${username}`)
                .then(res => {
                    dispatch({
                        type :"GET_USER",
                        payload : res.data
                    })
                });
        }, 1000);   
    }

    const getUserRepos = (username) => {
        setLoading(true);
        setTimeout(() => {
            axios
                .get(`https://api.github.com/users/${username}/repos`)
                .then(res => {
                    dispatch({
                        type : "GET_USER_REPOS",
                        payload : res.data
                    })
                });
        },1000);   
    }

    const setLoading = () => {
        dispatch({type: "SET_LOADING"})
    }

    return <GithubContext.Provider
        value = {{
            users : state.users,
            user : state.user,
            repos : state.repos,
            loading : state.loading,
            searchUsers,
            clearResults,
            getUser,
            getUserRepos,
        }}>
            {props.children}
    </GithubContext.Provider>
}

export default GithubState