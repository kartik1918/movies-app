import React, { Component } from 'react';

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }

    componentDidMount() {
        fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=6a2290aac1acc1d3c63e4a0db41012a4&language=en-US&page=${this.state.currPage}`)
        .then(res => res.json())
        .then(data => this.setState({
            movies: [...data.results]
        }))
    }

    changeMovies() {
        console.log(this.state.currPage)
        fetch(`
        https://api.themoviedb.org/3/movie/popular?api_key=6a2290aac1acc1d3c63e4a0db41012a4&language=en-US&page=${this.state.currPage}`)
        .then(res => res.json())
        .then(data => this.setState({
            movies: [...data.results]
        }))
    }

    handleRight = () => {
        console.log(this)
        let tempArr = [];
        for (let i = 1; i <= this.state.parr.length+1; i++) {
            tempArr.push(i)
        }
        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage+1
        }, this.changeMovies)
    }

    handleLeft = () => {
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }

    handleClick = (value) => {
        if (value != this.state.currPage) {
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }

    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter(mov => mov.id != movie.id)
        } else {
            oldData.push(movie)
        }
        localStorage.setItem('movies-app', JSON.stringify(oldData));
        this.handleFavouritesState();
    }

    handleFavouritesState = () => {
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie) => movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    render() {
        return  (
            <>
                {
                    this.state.movies.length == 0 ? 
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    <div>
                        <h3 className='text-center'><b>Trending</b></h3>
                        <div className='movies-list'>
                            {
                                this.state.movies.map((movObj) => (
                                    <div className="card movies-card" onMouseEnter={() => this.setState({hover: movObj.id})} onMouseLeave={() => this.setState({hover: ''})}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movObj.backdrop_path}`} className="card-img-top movies-img" alt="..." />
                                        <h5 className="card-title movies-title">{movObj.original_title}</h5>
                                        <div className='button-wrapper' style={{dislay: 'flex', width: '100%', justifyContent: 'center'}}>
                                            {
                                                this.state.hover == movObj.id && <a className='btn btn-primary movies-button' onClick={() => this.handleFavourites(movObj)}>{this.state.favourites.includes(movObj.id)?"Remove from favourites":"Add to favourites"}</a>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                    {
                                        this.state.parr.map(value => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                }
            </>
        )
    }
}