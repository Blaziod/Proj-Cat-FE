import React, { Component } from 'react'
import axios from 'axios'

class ApiTrial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            errormessage: []

        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                console.log(response)
                this.setState({ posts: response.data })
            })
            .catch(error => {
                console.log(error)
                this.setState({ errormessage: 'Error retreiving data' })
            })
    }
    render() {
        const { posts, errormessage } = this.state
        return (
            <div>
                List of posts
                {
                    posts.length ?
                        posts.map(post => <div key={post.id}>{post.url}<br></br>{post.title}<p></p></div>) :
                        null
                }
                {errormessage ? <div>{errormessage}</div> : null}
            </div>
        )
    }
}

export default ApiTrial