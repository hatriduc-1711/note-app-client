import { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../context/AuthProvider';
import { useMutation } from '@apollo/client';

import styles from './Login.module.scss';
import { REGISTER } from '../../graphql/mutation/mutationAuth';

const cx = classNames.bind(styles);

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const [register] = useMutation(REGISTER);

    const handleLoginWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        const {
            user: { uid, displayName },
        } = await signInWithPopup(auth, googleProvider);
        register({
            variables: {
                uid: uid,
                name: displayName,
            },
        });
        if (uid) navigate('/');
    };

    const handleLoginWithFacebook = async () => {
        const facebookProvider = new FacebookAuthProvider();
        const {
            user: { uid, displayName },
        } = await signInWithPopup(auth, facebookProvider);
        register({
            variables: {
                uid: uid,
                name: displayName,
            },
        });
        if (uid) navigate('/');
    };

    if (user?.uid) return <Navigate to="/" />;

    return (
        <div className={cx('login-background')}>
            <section className={cx('login-container')}>
                <img
                    className={cx('login-image')}
                    src="https://i.pinimg.com/564x/b4/33/4b/b4334bf5e183be2b62e1202aa9f870b6.jpg"
                    alt=""
                />
                <h1>Login Note App . . . 🚀</h1>
                <div className={cx('login-btn')}>
                    <button className={cx('btn')} onClick={handleLoginWithGoogle}>
                        <FcGoogle className={cx('icon-btn')} />
                        Login with Google
                    </button>
                    <button className={cx('btn')} onClick={handleLoginWithFacebook}>
                        <FaFacebookSquare className={cx('icon-btn')} />
                        Login with Facebook
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Login;
