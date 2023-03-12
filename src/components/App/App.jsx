// eslint-disable-next-line no-unused-vars
import React, { Component, PureComponent } from 'react'
import debounce from 'lodash.debounce'
import CheckInternetConection from '../CheckInternetConection/CheckInternetConection'
import MovieTabs from '../MovieTabs/MovieTabs'
import './App.css'
import MoviesDB from '../../moviesDB'
import { MovieProvider } from '../movieContext/movieContext'

export default class App extends PureComponent {
    moviesDB = new MoviesDB()

    state = {
        searchTerm: 'harry',
        moviesData: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalResults: 0,
        genres: [],
        ratedMovies: [],
        totalRatedMovie: 0,
        currentRatedPage: 1,
    }

    componentDidMount() {
        this.getGenres()
        this.onSearchMovie()
    }

    componentDidUpdate(prevProps, prevState) {
        // eslint-disable-next-line react/destructuring-assignment
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.onSearchMovie()
        }
    }

    handleSearchTermChange = (e) => {
        const { value } = e.target
        this.setState({ searchTerm: value })
    }

    onSearchMovie = debounce(() => {
        const { searchTerm } = this.state
        this.setState({ loading: true })

        this.moviesDB
            .getResponse(searchTerm)
            .then((data) => {
                this.setState({
                    moviesData: data.results,
                    loading: false,
                    totalResults: data.total_results,
                })
            })
            .catch((error) => {
                this.setState({ error, loading: false })
            })
    }, 500)

    getRatedMovies = () => {
        this.setState({ loading: true })
        this.moviesDB.getRating().then((res) =>
            this.setState({
                ratedMovies: res.results,
                loading: false,
                totalRatedMovie: res.total_results,
            }),
        )
    }

    onChangeRating = (value, id) => {
        this.setState(({ moviesData }) => {
            const oldArray = JSON.parse(JSON.stringify(moviesData))
            const newArray = oldArray.map((movie) => {
                if (movie.id === id) {
                    return { ...movie, ratingValue: value }
                }
                return movie
            })
            return { moviesData: newArray }
        })
        this.moviesDB.postRating(value, id)
    }

    handlePaginationChange = (page) => {
        const { searchTerm } = this.state
        this.setState({ loading: true })
        this.moviesDB
            .getResponse(searchTerm, page)
            .then((data) => {
                this.setState({
                    moviesData: data.results,
                    loading: false,
                    currentPage: page,
                })
            })
            .catch((error) => {
                this.setState({ error, loading: false })
            })
    }

    handleRatedPagination = (page) => {
        this.setState({ loading: true })
        this.moviesDB.getGenre(page).then((data) => {
            this.setState({ ratedMovies: data.results, loading: false, currentRatedPage: page })
        })
    }

    getGenres = () => {
        this.moviesDB.getGenre().then(({ genres }) => this.setState({ genres }))
    }

    render() {
        const {
            moviesData,
            loading,
            error,
            searchTerm,
            currentPage,
            totalResults,
            value,
            genres,
            ratedMovies,
            totalRatedMovie,
            currentRatedPage,
        } = this.state

        return (
            <CheckInternetConection>
                <MovieProvider
                    value={{
                        moviesDB: this.moviesDB,
                        onChangeRating: this.onChangeRating,
                        handleSearchTermChange: this.handleSearchTermChange,
                        getRatedMovies: this.getRatedMovies,
                        handlePaginationChange: this.handlePaginationChange,
                        handleRatedPagination: this.handleRatedPagination,
                        moviesData,
                        ratingValue: value,
                        searchTerm,
                        totalResults,
                        currentPage,
                        genres,
                        loading,
                        ratedMovies,
                        totalRatedMovie,
                        currentRatedPage,
                    }} // для того чтобы все дочерние компоненты имели доступ к этим значениям
                >
                    <div>
                        <MovieTabs
                            moviesData={moviesData}
                            loading={loading}
                            error={error}
                            getRatedMovies={this.getRatedMovies}
                        />
                    </div>
                </MovieProvider>
            </CheckInternetConection>
        )
    }
}
