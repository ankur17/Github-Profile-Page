/**
 * Created by ankur on 16/6/19.
 */
import React , {Component} from 'react';
import './../../Styles/loading.css'
import loading from './../../Styles/loading.svg'


export default function Loading() {
    return (
        <div className="loading centerElement">
            <div>
                <img src={loading} alt=""/>
                <p>Loading...</p>
            </div>

        </div>
    )
}
