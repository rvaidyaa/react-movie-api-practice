import React from 'react';
import './Movies.css';
import MovieListItem from './MovieListItem';

//const movies = ["Breaking bad", "Narcos", "Game of Thrones"];

class Movies extends React.Component {
    state = {
        movies: []
    };
    //great place to put an API call, when the component has mounted
    componentDidMount() { // apiUrl variable w/ key
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        //use fetch
        fetch(apiUrl) // because fetch takes time to respond it returns a promise , when this resolves (success) it returns response obj
            .then(response => response.json()) //response obj has a json method to convert raw data from api to the JS obj but doesnt return right away so we chain another then
            .then(data => {this.storeMovies(data)})//this takes the data and puts it through our storeMovies method
            .catch(error => console.log(error))
        console.log('before or after data?');
    }
    storeMovies = data => {
        const movies = data.results.map( result => {
            const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = result;
            return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };

        });
        console.log('store movies ran, incoming movies with our destructuring, console logging it')
        console.log(movies);// shove it into the state then render a component movelist item with properties from said state.
        this.setState({movies});
    }

    render() {
        return(
            <section>
                <ul className='movies'>
                    {
                        this.state.movies.map(movie =>(
                            <MovieListItem key={movie.id} movie={movie} />
                        ))
                    }
                </ul>
            </section>
        );
    };
};

export default Movies;
