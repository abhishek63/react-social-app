import React, { Component } from 'react'
import { singlePost } from "./apiPost"

export class SinglePost extends Component {
    constructor(){
        super()
        this.state={
            post : ""
        }
    }
    componentDidMount(){
        const postId = this.props.match.params.postId;
        singlePost(postId)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({
                    post : data
                })
            }
        })
    }
    render() {
        return (
            <div>
               {this.props.match.params.postId} 
            </div>
        )
    }
}

export default SinglePost
