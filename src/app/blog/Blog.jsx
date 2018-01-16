/**
 * @overview Blog page.  Renders static content.
 */
import React from 'react';
import axios from 'axios';

// Render blog component
import {BlogPost} from './Post';

// Render static HTML:
import __html from './blog.html';

class Blog extends React.Component {
    constructor(){
        super();
        this.state = {
            blogPosts: []
        }
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: 'http://localhost:9001/posts'
        })
        .then(response => {
            if(response.status != 200){
                throw Error(response.statusText);
            }
            this.setState({blogPosts: response.data});            
        })
        .catch(err => console.log(err));
    }

    
    render(){        
        const blogPosts = this.state.blogPosts;
        // sorts blog posts by newest first
        blogPosts.sort((a,b) => {
            if(a.publish_date < b.publish_date){return 1;}
            if(a.publish_date > b.publish_date){return -1;}
            return 0;
        });
        let posts = blogPosts.map((post, index) => {
            return(                 
                <div className="blog-post" key={index}>                    
                    <BlogPost data={post}/>
                </div>
            )
        });        
        return (
            <div id="all-posts">
                {posts}
            </div>
        )
    }
}

export default Blog;
