// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react'
import { Card, Col, Rate, Tooltip, Typography } from 'antd'
import { format } from 'date-fns'
import classNames from 'classnames'
import { MovieConsumer } from '../movieContext'

const { Text, Title, Paragraph } = Typography

const MovieCard = ({ movies, id }) => {
    const {
        title,
        release_date,
        overview,
        poster_path,
        vote_average,
        genre_ids,
        rating,
        ratingValue,
    } = movies
    const formatedDate = release_date
        ? format(new Date(release_date), 'MMMM dd, YYY')
        : 'release date not specified'

    const cutOverviews = (str, count) => {
        const splited = str.split(' ')
        if (splited.length > count) {
            return `${splited.slice(0, count).join(' ')}...`
        }
        return splited.join(' ')
    }
    const cutedOverview = cutOverviews(overview, 30)

    const ratingColor = classNames({
        'card-rating': true,
        bad: vote_average === 0 && vote_average < 3,
        normal: vote_average >= 3 && vote_average < 5,
        good: vote_average >= 5 && vote_average < 7,
        wonderful: vote_average >= 7,
    })

    return (
        <MovieConsumer>
            {({ onChangeRating, genres }) => {
                const movieGenres = genre_ids.map((genreId) => {
                    // eslint-disable-next-line array-callback-return, consistent-return
                    return genres.map((element) => {
                        if (genreId === element.id) {
                            return (
                                <Text key={element.id} code>
                                    {element.name}
                                </Text>
                            )
                        }
                    })
                })
                return (
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 12 }}
                        xxl={8}
                        style={{ paddingBottom: '36px' }}
                    >
                        <Card bordered hoverable>
                            <div className="card">
                                <img
                                    className="poster"
                                    src={
                                        poster_path === null
                                            ? `https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg`
                                            : `https://image.tmdb.org/t/p/original${poster_path}`
                                    }
                                    alt="poster"
                                />
                                <div className="card-body">
                                    <div className="card-header">
                                        <Tooltip title={title}>
                                            <Title style={{ margin: 0, width: '90%' }} level={3}>
                                                {title}
                                            </Title>
                                        </Tooltip>
                                        <div className={ratingColor}>{vote_average.toFixed(1)}</div>
                                    </div>

                                    <div className="card-date">
                                        <Text type="secondary">{formatedDate}</Text>
                                    </div>

                                    <div className="card-ganre">{movieGenres}</div>
                                    <div className="card-description">
                                        <Paragraph style={{ margin: 0 }}>{cutedOverview}</Paragraph>
                                    </div>
                                    <div className="card-rate">
                                        <Rate
                                            count={10}
                                            allowHalf
                                            value={rating || ratingValue}
                                            onChange={(value) => onChangeRating(value, id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                )
            }}
        </MovieConsumer>
    )
}

export default MovieCard
