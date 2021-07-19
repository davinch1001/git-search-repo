import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import '../style.css'
import {getReadme, search} from "../redux/reducers/reposReducer";
import Header from "./header";

const RepoList = () => {
    const reposData = useSelector(s => s.reposReducer.reposData)
    const searchInput = useSelector(s => s.reposReducer.searchInput)
    const dispatch = useDispatch()
    const searchHandler = (e) => {
        dispatch(search(e.target.value))
    }

    return (
        <div>
            <Header repoName={reposData.map(el => el)}/>

            <div className='container'>
                <div className="repo-div">
                    <form action="">
                        <input className='repo-input' placeholder='search...' onChange={searchHandler} type="text"/>
                    </form>
                    {reposData.length === 0 ? <div>Такого пользователя не найде</div>:
                        reposData.filter((el) => {
                            return el.name.includes(searchInput)
                        }).map((repo) => {
                            return <Link onClick={() =>{dispatch(getReadme(`${repo.full_name}`))}} className="repo-btn" to={`/md/${repo.name}`}>{repo.name}</Link>

                        })}
                </div></div>

        </div>


    );
};

export default RepoList;