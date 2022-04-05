import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        const styles = {
            display: 'flex', 
            alignItems: 'center',
            padding:'12px',
            gap: '2rem',
        }
        return (
            <div style={styles}>
                <Link to='/' style={{textDecoration:'none'}}><h1>Movies App</h1></Link>
                <Link to='/favourites' style={{textDecoration:'none'}}><h2>Favourites</h2></Link>
            </div>
        )
    }
}