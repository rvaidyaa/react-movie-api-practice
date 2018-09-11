import React from 'react';
import './Navigation.css';
import Selection from './Selection.js';
import Slider from "./Slider";

class Navigation extends React.Component {
    state = {
        genre: "action",
        genres: [],
        year: {
            label: "year",
            min: 1980,
            max: 2017,
            step: 1,
            value: { min: 2000, max: 2017 }
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10,
            step: 1,
            value: { min: 8, max: 10 }
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: { min: 60, max: 120 }
        }
    }; //
    componentDidMount() { //fetch genres from api
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        fetch(genresURL)
            .then(response => response.json())//convert to javascript object notation
            .then(data => this.setState({genres: data.genres }))// take the list of genres from second promise and set it into state
            .catch(error => console.log(error));
    }
// when we call our genre select component we pass it a onGenreChange prop that will set the new genre in the state
    onGenreChange = event => {
        this.setState({
            genre: event.target.value
        });
    }
// whenw we call call our slider componenets we pass it a data property for year rating or runtime. data.type returns those 3 values so we set our state for that particular value. ...this.state[data.type] is a fresh object with runtime etc. Find the value and update it with user selected data value
    onChange = data => {
        this.setState({
            [data.type]: {
                ...this.state[data.type], //previous value of this.state.runtime(ex)
                value: data.value //update the value property
            }
        });
        console.log({...this.state[data.type]});
        console.log(data.type);
    };


    render () {
        return (
            <section className="navigation">
                <Selection
                genre={this.state.genre}
                genres={this.state.genres}
                onGenreChange={this.onGenreChange}
                />
                <Slider data={this.state.year} onChange={this.onChange} />
                <Slider data={this.state.rating} onChange={this.onChange} />
                <Slider data={this.state.runtime} onChange={this.onChange} />
            </section>
        );
    };
};

export default Navigation;
