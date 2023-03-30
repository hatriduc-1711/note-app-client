import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';
import { AuthContext } from '../../context/AuthProvider';

const cx = classNames.bind(styles);

function Header() {
    const { photoURL, displayName, auth } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const refUser = useRef();

    const handleLogout = () => {
        auth.signOut();
        window.location.reload();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!refUser?.current?.contains(event.target)) setShow(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [refUser]);

    return (
        <section className={cx('header-container')}>
            <h1 className={cx('header-title')}>Note App 🚀</h1>
            <div className={cx('header-user')}>
                <h6 className={cx('name-user')}>{displayName}</h6>
                <img onClick={() => setShow(!show)} className={cx('avatar-user')} src={photoURL} alt="" />
                {show && (
                    <ul ref={refUser} className={cx('options-user')}>
                        <li onClick={handleLogout} className={cx('option')}>
                            Log Out
                        </li>
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Header;
