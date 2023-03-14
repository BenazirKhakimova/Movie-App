// eslint-disable-next-line no-unused-vars
import React, { PureComponent } from 'react'
import { Row } from 'antd'
import MovieCard from '../MovieCard/MovieCard'
import { MovieConsumer } from '../../movieContext'
import './Rated.css'
import Pagination from '../Pagination/Pagination'
import Spinner from '../Spinner/Spinner'

class Rated extends PureComponent {
    componentDidMount() {
        const { getRatedMovies } = this.props
        getRatedMovies()
    }

    render() {
        return (
            <MovieConsumer>
                {({
                    ratedMovies,
                    totalRatedMovie,
                    currentRatedPage,
                    handleRatedPagination,
                    loading,
                }) => {
                    return loading ? (
                        <Spinner />
                    ) : (
                        <div className="rated-list">
                            <Row
                                style={{ width: '100%' }}
                                gutter={[35, 35]}
                                align="middle"
                                justify="space-between"
                                wrap
                            >
                                {ratedMovies.map((movie) => {
                                    const { id, ...items } = movie
                                    return <MovieCard key={id} movies={items} id={id} />
                                })}
                            </Row>
                            {totalRatedMovie > 20 ? (
                                <Pagination
                                    handlePaginationChange={handleRatedPagination}
                                    defaultCurrent={1}
                                    currentPage={currentRatedPage}
                                    totalResults={totalRatedMovie}
                                />
                            ) : null}
                        </div>
                    )
                }}
            </MovieConsumer>
        )
    }
}

export default Rated
