import classNames from 'classnames/bind';
import { FcAddressBook } from 'react-icons/fc';
import styles from './Empty.module.scss';

const cx = classNames.bind(styles);

function Empty() {
    return (
        <section className={cx('empty')}>
            <h1>Add Note ...</h1>
            <FcAddressBook />
        </section>
    );
}

export default Empty;
