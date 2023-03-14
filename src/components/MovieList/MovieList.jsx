// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react'
import { Empty, Row } from 'antd'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.css'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import SearchBar from '../SearchBar/SearchBar'
import { MovieConsumer } from '../../movieContext'
import Pagination from '../Pagination/Pagination'

const MoveiList = ({ error }) => {
    if (error) {
        return <Error error={error} />
    }

    return (
        <MovieConsumer>
            {({
                searchTerm,
                handleSearchTermChange,
                moviesData,
                totalResults,
                handlePaginationChange,
                currentPage,
                loading,
            }) => {
                return (
                    <>
                        <SearchBar
                            searchTerm={searchTerm}
                            handleSearchTermChange={handleSearchTermChange}
                        />
                        {loading ? (
                            <Spinner />
                        ) : moviesData.length === 0 ? (
                            <Empty style={{ marginTop: '50px' }} />
                        ) : (
                            <div className="movies-list">
                                <Row
                                    style={{ width: '100%' }}
                                    gutter={{ xs: 16, sm: 36 }}
                                    align="middle"
                                    justify="space-between"
                                    wrap
                                >
                                    {moviesData.map((movie) => {
                                        const { id, ...items } = movie
                                        return <MovieCard key={id} movies={items} id={id} />
                                    })}
                                </Row>
                                {totalResults > 20 ? (
                                    <Pagination
                                        handlePaginationChange={handlePaginationChange}
                                        defaultCurrent={1}
                                        currentPage={currentPage}
                                        totalResults={totalResults}
                                    />
                                ) : null}
                            </div>
                        )}
                    </>
                )
            }}
        </MovieConsumer>
    )
}

export default MoveiList
