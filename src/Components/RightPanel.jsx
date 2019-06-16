/**
 * Created by ankur on 16/6/19.
 */

import React , {Component} from 'react';
import fork from './../Styles/fork.svg'
import DropDownButton from './Helpers/DropDownButton'
import {REPO_API_URL, LANGUAGE, REPO_TYPE} from './Helpers/Constants'
import {filterList,resultViewDisplay} from './ViewRender'
import Loading from './Helpers/Loading'


class RightPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            language : "All",
            type : "All",
            repoData : {},
            repoDataFetched : false,
            searchText : ""
        }
        this.selectLanguage= this.selectLanguage.bind(this)
        this.selectType= this.selectType.bind(this)
        this.resetFilter= this.resetFilter.bind(this)


        this.fetchRepoData= this.fetchRepoData.bind(this)
        this.setSearchText= this.setSearchText.bind(this)
    }


    setSearchText(event) {
        let text = event.target.value;
        text = text.trim()

        this.setState({
            searchText : text
        })

    }

    selectLanguage(lang){
        this.setState({
            language : lang
        })
    }

    selectType(type){
        this.setState({
            type : type
        })
    }

    componentWillMount(){

        this.fetchRepoData()
    }



    fetchRepoData(){

        fetch(REPO_API_URL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=> {
            return response.json()
        }).then((result)=> {
            this.setState({
                repoData : result,
                repoDataFetched : true
            })
        }).catch((ex)=>{
            console.error("ERROR in fetching user data from API",ex)
            this.setState({
                repoData : {},
                isFetchComplete: false
            })
        })
    }

    resetFilter(){

        this.setState({
            searchText : "",
            language : "All",
            type : "All",
        })
        this.repoTypeRef.exposedLabelState("All")
        this.langRef.exposedLabelState("All")
    }


    render(){
        let resultText = resultViewDisplay(this.state)
        return (
            <div className="rightContainer">

                <div className="buttonContainer">
                    <div className="buttonComponent">
                        <p>Overview</p>
                    </div>
                    <div className="buttonComponent active">
                        <p>Repositories</p>
                    </div>
                    <div className="buttonComponent">
                        <p>Stars</p>
                    </div>
                    <div className="buttonComponent">
                        <p>Followers</p>
                    </div>
                    <div className="buttonComponent">
                        <p>Following</p>
                    </div>

                </div>

                <div className="queryContainer flatenStyle">
                    <input className="searchBox" type="text" placeholder="Search Repositories..." value={this.state.searchText} onChange={this.setSearchText}/>

                    <div className="dropdownContainer flatenStyle">
                        {/*Type*/}
                        <DropDownButton onClick={this.selectType} list={REPO_TYPE} labelText="Type: "ref={(ref)=>this.repoTypeRef=ref} />

                        {/*Languages*/}
                        <DropDownButton onClick={this.selectLanguage} list={LANGUAGE} labelText="Lang:" ref={(ref)=>this.langRef=ref}/>
                    </div>


                </div>

                { (resultText.length>0) ?
                    (<div className="resultContainer envelop flatenStyle">
                        <p>{resultText}</p>
                        <button className="dropbtn" onClick={this.resetFilter}><i class="glyphicon glyphicon-remove"></i>Reset Filter</button>
                    </div>) : null
                }

                {(this.state.repoDataFetched) ? filterList(this.state) : <Loading/>}

            </div>
        )
    }
}

export default RightPanel;
