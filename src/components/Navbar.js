import React, { Component } from 'react'

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
                <h1>Movies App</h1>
                <h2>Favourites</h2>
            </div>
        )
    }
}