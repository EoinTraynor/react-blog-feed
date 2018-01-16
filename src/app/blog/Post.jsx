import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class BlogPost extends React.Component {
    constructor(props){        
        console.log('new comp');
        super(props);
        this.state = {
            post: props.data,
            comments: []
        }
    }        
    
    componentWillMount(){                
        axios({
            method: 'get',
            url: `http://localhost:9001/posts/${this.state.post.id}/comments`
        })
        .then(response => {
            if(response.status != 200){
                throw Error(response.statusText);
            }
            this.setState({comments: response.data});            
        })
        .catch(err => console.log(err));
    }
    
    render(){
        const {post, comments} = this.state;        
        const cardStyle = {
            padding: "20px",
            margin: "20px 0"
        }
        
        console.log("called");
        const postComments = comments.map((comment, index) => {
            return <li key={index} className="list-group-item">{comment.content}</li>
        });
        return(
            <div className="card" style={cardStyle}>
                <div className="card-block">
                    <h4 className="card-title">{post.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{post.author}   
                        <span className="date-published font-weight-light font-italic">Date Posted: {post.publish_date} </span>
                    </h6>                    
                    <p className="card-text">{post.content}</p>
                    <Link to={`/post/${post.id}`} className="card-link">View Comments</Link>                    
                </div>          
                <ul className="list-group list-group-flush">
                    {postComments}
                </ul>      
            </div>
        )
    }
}

const Comment = ({data}) => {
    // console.log(data);
    return <li className="list-group-item">{data.content}</li>;
}

export default BlogPost;