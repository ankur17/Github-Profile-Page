/**
 * Created by ankur on 16/6/19.
 */

class RightPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            repoData : {},
            repoDataFetched : false,
        }

        this.fetchRepoData= this.fetchRepoData.bind(this)
    }


    componentWillMount(){

        this.fetchRepoData()
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
            </div>
        )
    }
}


export default RightPanel;