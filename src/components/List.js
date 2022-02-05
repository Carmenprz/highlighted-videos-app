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
            videos: null,
            error: null
        };
    }
    async componentDidMount() {
        this.setState({ isLoading: true });

        try{
            const videos = await getVideos();
            this.setState({ videos , isLoading: false });
        } catch(error) {
            this.setState({ error, isLoading: false });
        }
    }
    render() {
        const {videos, isLoading, error} = this.state;
        if (isLoading) {
            return <Loading message="Loading..."/>
        }
        if (error) {
            return <p className="error" >{error.message}</p>
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