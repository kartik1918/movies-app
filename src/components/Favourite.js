import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let data = JSON.parse(localStorage.getItem('movies-app') || '[]');
        let temp = [];
        data.forEach(movObj => {
            console.log(movObj)
            if (!temp.includes(genreids[movObj.genre_ids[0]])) {
                temp.push(genreids[movObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres')
        this.setState({
            genres: [...temp],
            movies: [...data]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currgen: genre
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currPage:page
        })
    }

    handleDelete = (id) => {
        let newarr = [];
        newarr = this.state.movies.filter((movieObj) => movieObj.id != id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr))
    }

    render() {
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let filterArr = [];

        if(this.state.currText === ''){
            filterArr = this.state.movies
        } else {
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }

        if(this.state.currgen != "All Genres"){
            filterArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen)
        }

        let pages = Math.ceil(filterArr.length / this.state.limit);
        let pagesarr = [];
        for(let i = 1; i <= pages; i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1) * this.state.limit;
        let ei = si + this.state.limit;
        filterArr = filterArr.slice(si, ei);
        
        return (
            <div>
                <>
                    <div className='main'>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                            <ul class="list-group favourites-genres">
                                {
                                    this.state.genres.map(genre => (
                                        this.state.currgen == genre ?
                                        <li class="list-group-item" style={{background:'#3f51b5', color: 'white', fontWeight:'bold'}}>{genre}</li> :
                                        <li class="list-group-item" style={{background:'white', color: '#3f51b5'}} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                            </div>
                            <div className='col-lg-9 favourites-table col-sm-12'>
                                <div className='row'>
                                    <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => this.setState({currText: e.target.value})}/>
                                    <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                                </div>
                                <div className='row'>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Popularity</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterArr.map(movObj => (
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original/${movObj.backdrop_path}`} style={{width: '5rem'}}/>{movObj.original_title}</td>
                                                        <td>{genreids[movObj.genre_ids[0]]}</td>
                                                        <td>{movObj.popularity}</td>
                                                        <td>{movObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesarr.map((page)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}