import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AlgoliaSearchInput from './AlgoliaSearchInput';

const APP_ID = '393BU8WBBH';
const SEARCH_API_KEY = '860bd6d75eafc6aee108f3d23a50ced1';

const indexes = {
    'nba-teams': {
        label: 'Teams',
        primary: 'name'
    },
    'nba-players': {
        label: 'Players',
        primary: 'name',
        secondary: 'team',
    },
    airports: {
        label: 'Airports',
        primary: 'name',
        secondary: 'City',
    }
}

const Wrapper = () => (
    <div style={{ padding: '20px', width: '30%' }}>
        <AlgoliaSearchInput
            appId={APP_ID}
            indexes={indexes}
            inputLabel="Search NBA"
            searchApiKey={SEARCH_API_KEY} 
        />
    </div>
);

ReactDOM.render(
    <Wrapper />, 
    document.getElementById('root')
);
