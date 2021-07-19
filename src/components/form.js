import React from 'react';
import {getRepos, getUserInfo} from "../redux/reducers/reposReducer";
import {useDispatch} from "react-redux";
import '../style.css';
import RepoList from "./repoList";
import {useHistory} from "react-router";

const Form = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const formHandler = (e) => {
        e.preventDefault();
        dispatch(getUserInfo(e.target[0].value))
        if (e.target.children[0].value !== "") {
            dispatch(getRepos(e.target.children[0].value));
            history.push('/user')
        }
        e.target.children[0].value = ''

    }
    return (
        <div className="form-div">
            <div className='border-for-form'>
                <form onSubmit={formHandler} className='form' action="">
                    <input className='form-input' placeholder='enter user name' type="text"/>
                    <button  type="submit" className='form-btn'>View</button>
                </form>
            </div>

        </div>
    );
}
export default Form;