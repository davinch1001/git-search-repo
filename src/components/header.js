import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const Header = (repoName) => {
    const userInfo = useSelector(s => s.reposReducer.userInfor)
    return (
        <div>
            <div  className='header'>

                <Link to='/'>
                <img className='user-avatar' src={userInfo.avatar_url} alt=""/>
                </Link>
                <h2>{userInfo.login}</h2>
            </div>

        </div>

    );
};

export default Header;