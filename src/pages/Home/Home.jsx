import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import styles from './Home.module.scss';
import Header from '../../components/Header';
import FoldersList from '../../components/FoldersList';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';
import { FOLDER_LIST } from '../../graphql/query/queryFolder';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(FOLDER_LIST);

    useEffect(() => {
        if (!loading && !error && data !== undefined && data.folders.length > 0) {
            navigate(`/folders/${data.folders[0].id}`);
        }
        if (!loading && !error && data !== undefined && data.folders.length === 0) {
            navigate(`/`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, error, data]);

    return (
        <div className={cx('home-background')}>
            <section className={cx('home-container')}>
                <Header />
                <section className={cx('home-body-container')}>
                    {loading || error ? <Loading /> : <FoldersList folders={data.folders} />}
                    {data !== undefined && data.folders.length === 0 ? <Empty /> : <Outlet />}
                </section>
            </section>
        </div>
    );
}

export default Home;
