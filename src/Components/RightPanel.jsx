/**
 * Created by ankur on 16/6/19.
 */

import React , {Component} from 'react';
import fork from './../Styles/fork.svg'
import DropDownButton from './Helpers/DropDownButton'

const LanguageDotMap = {
    "JavaScript" : "yellow",
    "HTML" : "red",
    "CSS" : "purple",
    "Java" : "brown"
}

const LANGUAGE = ["All", "JavaScript", "HTML", "CSS" ,"Java"]
const REPO_TYPE = ["All", "Sources", "Fork", "Archived", "Mirrors"]

class RightPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            classLang: "dropdown-content",
            classType : "dropdown-content",
            language : "All",
            type : "All",
            repoData : {},
            repoDataFetched : false,
            searchText : ""
        }
        this.selectLanguage= this.selectLanguage.bind(this)
        this.selectType= this.selectType.bind(this)
        this.bhatkanFunction= this.bhatkanFunction.bind(this)

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


    filterList(state){
        let {type,language,repoData,searchText} = state;
        let final_list = []

        // if( type =="All" && language=="All"){
        //     return repoData;
        // }
        // type = fork, archived
        repoData.forEach((repo)=>{
            let allow = false
            let cleaned_name = repo["name"].toLowerCase();


            if( type =="All" && language=="All"){
                allow = true
            }

            if( (language==repo["language"]) && (type!="All") && repo[type.toLowerCase()] ){
                allow = true
            }
            if( language=="All" && repo[type.toLowerCase()] ){
                allow = true
            }

            if( type=="All" && language==repo["language"] ){
                allow = true
            }

            if( allow && cleaned_name.indexOf(searchText.toLowerCase())>-1 )
                allow = true
            else
                allow = false

            if(allow){
                let component = listComponent(repo)
                final_list.push(component)
            }

        })

        return final_list

    }

    bhatkanFunction(){
        this.setState({
            classLang: "dropdown-content",
            classType : "dropdown-content"
        })
    }

    selectLanguage(lang){
        this.setState({
            classLang : "dropdown-content",
            language : lang
        })
    }

    selectType(type){

        this.setState({
            classType : "dropdown-content",
            type : type
        })
    }

    componentWillMount(){

        this.fetchRepoData()
    }


    resultViewDisplay(state){
        let {searchText,type,language} = state
        let sample = `Results for ${type} repositories`

        if(type=="All" && language=="All" && searchText=="")
            return ""

        if(type=="All")
            type = ""

        if(searchText!="")
            sample = sample + ` matching ${searchText}`

        if(language!="All")
            sample = sample + ` written in ${language}`
        return sample
    }

    fetchRepoData(){
        let user_url = "https://api.github.com/users/supreetsingh247/repos"

        fetch(user_url,{
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

    resetFilter(context){
        context.setState({
            searchText : "",
            language : "All",
            type : "All",
        })

    }


    render(){
        let ss = "";
        let ss2 = ""
        if (this.state.classLang==="dropdown-content")
            ss = "dropdown-content"

        if (this.state.classType==="dropdown-content")
            ss2 = "dropdown-content"
        let resultText = this.resultViewDisplay(this.state)
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
                        <p>Starss</p>
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
                        <DropDownButton onClick={this.selectType} list={REPO_TYPE} labelText="Type: "/>


                        {/*Languages*/}
                        <DropDownButton onClick={this.selectLanguage} list={LANGUAGE} labelText="Lang:"/>
                    </div>


                </div>

                { (resultText.length>0) ?
                    (<div className="resultContainer envelop flatenStyle">
                        <p>{resultText}</p>
                        <button className="dropbtn" onClick={()=>this.resetFilter(this)}>Reset Filter</button>
                    </div>) : null
                }

                {(this.state.repoDataFetched) ? this.filterList(this.state) : <h1>Nothing here</h1>}

            </div>
        )
    }
}


export default RightPanel;



function listComponent(props){
    let {name,description,language,id,license,pushed_at} = props;
    const MONTH_STR = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]
    const formatDate = (dateString)=>{
        let dateObj = new Date(dateString);
        return `${dateObj.getDate()} ${MONTH_STR[dateObj.getUTCMonth()]} ${dateObj.getFullYear()}`

    }
    return (
        <div className="repoListContainer flatenStyle" key={id}>
            <div className="envelop flatenStyle">

                <div className="repoData">
                    <h3>{name}</h3>
                    <div className="repoDescription">
                        <p>{description}</p>
                    </div>

                    <div className="repoStats flatenStyle">

                        { language ?
                            (<div className="margin-right flatenStyle">
                                <span className={`dot ${LanguageDotMap[language]}`}/>&nbsp;{language}
                            </div>) : null }

                        { license ?
                            (<div className="margin-right flatenStyle">
                                <img src={fork} style={{width:22,height:22,transform:"translateY(-2px)"}}/>&nbsp;{license && license.name}
                            </div>) : null }

                        <div className="margin-right flatenStyle" >
                            <p style={{textIndent: 5}}>Updated on {formatDate(pushed_at)}</p>
                        </div>

                    </div>

                </div>

                <div className="repoStars">
                </div>
            </div>


        </div>
    )
}

