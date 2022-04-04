import { movies } from './getMovies'
import React, { Component } from 'react';

export default class Movies extends Component {
    render() {
        let movieEle = '';
        let movie = movies.results;
        return  (
            <>
                {
                    movie.length == 0 ? 
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div>
                        <h3 className='text-center'><b>Trending</b></h3>
                        <div className='movies-list'>
                            {
                                movieEle = movie.map((movObj) => (
                                    <div className="card movies-card">
                                        <img src={`https://image.tmdb.org/t/p/original/${movObj.backdrop_path}`} className="card-img-top movies-img" alt="..." />
                                        <h5 className="card-title movies-title">{movObj.original_title}</h5>
                                        <div className='button-wrapper' style={{dislay: 'flex', width: '100%', justifyContent: 'center'}}>
                                            <a href='#' className='btn btn-primary movies-button'>Add to Favourites</a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </>
        )
    }
}