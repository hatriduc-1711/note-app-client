import classNames from 'classnames/bind';
import { RxReload } from 'react-icons/rx';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <section className={cx('loading')}>
            <RxReload className={cx('icon_reload')} />
        </section>
    );
}

export default Loading;
