import React, { Component } from 'react';
import Loading from './Loading';
import Header from './Header';
import Item from './Item';
import Footer from './Footer';

import { getVideos } from '../api';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            videos: null
        };
    }
    componentDidMount() {
        this.setState({isLoading:true});
        getVideos().then(data => {
            this.setState({ isLoading: false , videos:data})
        });
    }
    render() {
        const {videos, isLoading} = this.state;
        if(isLoading) {
            return <Loading message="Loading..."/>
        }
        return (<React.Fragment>
            <Header />
            <div className="container">
                <div className="grid-container">
                    {
                        videos && videos.map((video,i) => {
                            return (<Item key={i} data={video}/>)
                        })
                    }
                </div> 
            </div>
            <Footer />
        </React.Fragment>);
    }
}

export default List;