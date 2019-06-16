/**
 * Created by ankur on 16/6/19.
 */

import React , {Component} from 'react';
// import {fetch as fetchPolyfill} from 'whatwg-fetch'
import 'whatwg-fetch'

class LeftPanel extends Component{

    constructor(props){
        super(props)
        this.state = {
            userData : {},
            isFetchComplete : false
        }

        this.fetchUserData = this.fetchUserData.bind(this)
    }

    componentWillMount(){

        this.fetchUserData()
    }

    fetchUserData(){
        let user_url = "https://api.github.com/users/supreetsingh247"

        fetch(user_url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=> {
            return response.json()
        }).then((result)=> {
            this.setState({
                ...result,
                isFetchComplete: true
            })
        }).catch((ex)=>{
            console.error("ERROR in fetching user data from API",ex)
            this.setState({
                userdata : {},
                isFetchComplete: false
            })
        })
    }

    render(){
        return (
            <div className="leftContainer">
                {renderer}
            </div>
        )
    }
}


export default LeftPanel;

