import React from "react";
import auth from "solid-auth-client";

class HealthPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            webId: undefined
        }
    }

    componentDidMount(){
        auth.trackSession((session) => {
            this.setState({
                webId: session.webId
            })
        })
    }

    render(){
        return (
            <p>{this.state.webId}</p>
        )
    }
}

export default HealthPage;