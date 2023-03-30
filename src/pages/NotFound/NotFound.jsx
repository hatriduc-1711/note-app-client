import classNames from 'classnames/bind';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.scss';
import { AuthContext } from '../../context/AuthProvider';

const cx = classNames.bind(styles);

function NotFound() {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = () => {
        user?.uid ? navigate('/') : navigate('/login');
    };

    return (
        <div className={cx('not_found-container')}>
            <div className={cx('not_found-img')}>
                <img src="https://d8qbqtt58lzda.cloudfront.net/gosell-404.png" alt="" />
            </div>
            <h1 className={cx('title')}>No content was found 😓</h1>
            <p>The URL of this content has been changed or no longer exists</p>
            <p>If you are saving this URL, try accessing it again from the homepage instead of using the saved URL</p>
            <button onClick={handleClick} className={cx('btn')}>
                {user?.uid ? 'ACCESS HOME PAGE' : 'ACCESS LOGIN PAGE'}
            </button>
        </div>
    );
}

export default NotFound;
