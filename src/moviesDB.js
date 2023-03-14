export default class MoviesDB {
    _apiKey = 'a1cd1f11019307c450f5947de0ff619f'

    _guestSessionId = '6ebf1636c7724f7ff1e21889b0726666'

    _database = `https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}`

    _language = 'en-US'

    getResponse = async (search, page = 1) => {
        const res = await fetch(
            `${this._database}&query=${search}&language=${this._language}&page=${page}`,
        )
        if (!res.ok) {
            throw new Error('Network response was not ok. If it keeps happening please contact us.')
        }
        const data = await res.json()
        return data
    }

    getGenre = async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=${this._language}`,
        )
        const data = await res.json()
        return data
    }

    postRating = async (value, id) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${this._guestSessionId}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    value,
                }),
            },
        )
        if (!res.ok) {
            throw new Error('Network response was not ok. If it keeps happening please contact us.')
        }
    }

    getRating = async (page = 1) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/guest_session/${this._guestSessionId}/rated/movies?api_key=${this._apiKey}&language=${this._language}&sort_by=created_at.desc&page=${page}`,
        )
        if (!res.ok) {
            throw new Error('Network response was not ok. If it keeps happening please contact us.')
        }
        const data = await res.json()
        return data
    }
}
