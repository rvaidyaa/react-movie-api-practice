import React from "react";
import "./Selection.css"
//if we save the genre and slider information on this component no way to pass it back up with react
const Selection = ({ genre, genres, onGenreChange }) => (
    <div className="selection">
        <label>Genre</label>
        <select value={genre} onChange={onGenreChange}>
            {genres.map( genre => (
            <option key={genre.id} value={genre.name}>{genre.name}</option>
        ))}
        </select>
    </div>
)

export default Selection;
