import React from 'react';
import {useSelector} from "react-redux";
import '../style.css'
import ReactMarkdown from "react-markdown";
import Header from "./header";
import {Link} from "react-router-dom";

const Readme = () => {
    const readme = useSelector(s => s.reposReducer.readme)
    return (
        <div className='readme-page'>
            <Header/>
            <Link className='link-header-btn' to='/user'>❮ back to Repolist</Link>
            <div className='readme-text'>
                <ReactMarkdown>
                    {readme}
                </ReactMarkdown></div>

        </div>


    );
};

export default Readme;