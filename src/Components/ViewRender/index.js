/**
 * Created by ankur on 16/6/19.
 */

import React , {Component} from 'react';
import fork from './../../Styles/fork.svg'
import {LanguageDotMap, LANGUAGE, REPO_TYPE, MONTH_STR, formatDate} from './../Helpers/Constants'

export function RepoListView(props){
    let {name,description,language,id,license,pushed_at} = props;
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




export function filterList(state){
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
            let component = RepoListView(repo)
            final_list.push(component)
        }

    })

    if ( final_list.length==0){
        return (
            <div className="emptyRepoResult centerElement grey">
                <h5>supreetsingh247 doesn’t have any repositories that match.</h5>
            </div>
        )
    }

    return final_list

}


export function resultViewDisplay(state){
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