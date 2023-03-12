// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Tabs } from 'antd'
import './MovieTabs.css'
import MovieList from '../MovieList/MovieList'
import Rated from '../Rated/Rated'

const MovieTabs = ({ error, getRatedMovies }) => {
    const items = [
        {
            key: '1',
            label: `Search`,
            children: <MovieList error={error} />,
        },
        {
            key: '2',
            label: `Rated`,
            children: <Rated getRatedMovies={getRatedMovies} />,
        },
    ]
    return (
        <div>
            <Tabs centered defaultActiveKey="1" items={items} destroyInactiveTabPane />
        </div>
    )
}

export default MovieTabs
