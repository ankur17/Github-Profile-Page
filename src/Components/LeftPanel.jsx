/**
 * Created by ankur on 16/6/19.
 */

import React , {Component} from 'react';
import Loading from './Helpers/Loading'
import {USER_API_URL} from './Helpers/Constants'
import 'whatwg-fetch'

class LeftPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            userData : {},
            isFetchComplete : false
        };

        this.fetchUserData = this.fetchUserData.bind(this)
    }

    componentWillMount(){

        this.fetchUserData()
    }

    fetchUserData(){

        fetch(USER_API_URL,{
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

    dataRender(state,props){
        let {login,avatar_url,name,bio,company,location,email} = state
        return (
            <div key="hugabuga">
                <div className="imageContainer">
                    <img src={avatar_url} alt="Logo" />
                </div>
                <p className="leftContainerName">{name}</p>
                <p className="leftContainerLogin">{login}</p>
                <p className="leftContainerBio">{bio}</p>

                <button type="button" className="editInfoBtn">Edit Bio</button>

                <div className="divideLine" />

                <p className="leftContainerCompany"><span className="glyphicon glyphicon-user" aria-hidden="true"/>&nbsp;{company}</p>

                <p className="leftContainerLocation"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"/> &nbsp;{location}</p>
                <p className="leftContainerEmail "><span className="glyphicon glyphicon-envelope" aria-hidden="true"/> &nbsp;{email || "none"}</p>

            </div>
        )
    }

    render(){
        let renderer = null
        if(this.state.isFetchComplete)
            renderer = this.dataRender(this.state,this.props)
        else
            renderer = <Loading/>
        return (
            <div className="leftContainer">

                {renderer}

            </div>
        )
    }
}


export default LeftPanel;

