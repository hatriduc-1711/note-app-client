import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ApolloProvider } from '@apollo/client';

import client from './graphql/request';
import GlobalStyles from './components/GlobalStyles';
import router from './router';
import './firebase/config.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <GlobalStyles>
            <RouterProvider router={router} />
        </GlobalStyles>
    </ApolloProvider>,
);
