// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { Input } from 'antd'
import './SearchBar.css'

const SearchBar = ({ searchTerm, handleSearchTermChange }) => {
    return (
        <div className="container">
            <Input
                placeholder="Type to seatch"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
        </div>
    )
}

export default SearchBar
