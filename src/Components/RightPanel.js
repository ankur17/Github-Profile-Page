/**
 * Created by ankur on 16/6/19.
 */

class RightPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            classLang: "dropdown-content",
            classType : "dropdown-content",
            repoData : {},
            repoDataFetched : false,
        }
        this.toggleClass = this.toggleClass.bind(this)
        this.toggleTypeClass = this.toggleTypeClass.bind(this)
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

    bhatkanFunction(){
        this.setState({
            classLang: "dropdown-content",
            classType : "dropdown-content"
        })
    }


    toggleClass(){
        this.setState({
            classLang : "show"
        })
    }

    toggleTypeClass(){
        this.setState({
            classType : "show2"
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


    render(){
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

                <div className="queryContainer">

                    <input type="text" placeholder="Search Repositories..." className="searchBox" value={this.state.searchText} onChange={this.setSearchText}/>

                    {/*Type*/}
                    <button onClick={this.toggleTypeClass} className="dropbtn">{`Type : ${this.state.type}`}</button>
                    <div className={`bigger ${ss2}`} onClick={this.bhatkanFunction}>
                        <div id="myDropdown" className={"show2"}>
                            <a onClick={()=>this.selectType("All")}>All</a>
                            <a onClick={()=>this.selectType("Fork")}>Fork</a>
                            <a onClick={()=>this.selectType("Archived")}>Archived</a>
                        </div>
                    </div>

                    {/*Languages*/}
                    <button onClick={this.toggleClass} className="dropbtn">{`Lang : ${this.state.language}`}</button>
                    <div className={`bigger ${ss}`} onClick={this.bhatkanFunction}>
                        <div id="myDropdown" className={"show"}>
                            <a onClick={()=>this.selectLanguage("All")}>All</a>
                            <a onClick={()=>this.selectLanguage("JavaScript")}>JavaScript</a>
                            <a onClick={()=>this.selectLanguage("Java")}>Java</a>
                            <a onClick={()=>this.selectLanguage("Python")}>Python</a>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}


export default RightPanel;