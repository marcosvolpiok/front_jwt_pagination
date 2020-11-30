import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Photos from './Photos';
import Paginator from './Paginator'

class PhotosContainer extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        photos: [],
        token: this.props.cookies.get("token") || "",
        currentPage: 1,
        totalPages: 0,
        limit: 10
    };

    onPageChanged = data => {
      const { currentPage } = data;
  
      this.setState({ currentPage });
    }

    async componentDidMount() {
        const photosResponse = await fetch(`http://localhost:4000/photos/`,
        {
            method: 'GET',
            headers: {
              'access-token': this.state.token
            }
        });
        const photosJson = await photosResponse.json();
        if(photosResponse.status===200){
            this.setState({ photos: photosJson });
            this.setState({ totalPages: photosJson.length / this.state.limit });
        }else{
            this.props.history.push('/');
        }
    }
    
    render() {
        return (
            <div>
                {this.state.photos.length > 0 && this.state.currentPage &&
                    <Photos
                    photos={this.state.photos}
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPages}></Photos>
                }

                {this.state.currentPage &&
                    <Paginator
                    onPageChanged={this.onPageChanged}
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPages}></Paginator>
                }
            </div>
        )
      }

  }
  export default withCookies(PhotosContainer);