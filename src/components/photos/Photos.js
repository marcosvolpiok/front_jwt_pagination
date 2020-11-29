import React from 'react';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class Photos extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        photos: [],
        token: this.props.cookies.get("token") || ""
    };

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
        }else{
            this.props.history.push('/');
        }
    }
    
    render() {
        const { token } = this.state;

        return (
        <div>
            <h1>Photos</h1>
             {this.state.photos.length > 0 &&
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Title</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.photos.map((photo, index) => {
                                if (index <10 ) {
                                    return <tr key={photo.id}>
                                        <td><img alt={photo.title} src={photo.thumbnailUrl} /></td>
                                        <td>{photo.title}</td>
                                    </tr>
                                }
                            })}
                        </tbody>

                    </table>
                </div>
            }  

            {this.state.photos.length === 0 &&
                <h2>No such any photo.</h2>
            }
        </div>
        )
        
      }

  }
  export default withCookies(Photos);