import React from 'react'

class Photos extends React.Component {
    state = {
        photos: []
    };

    async componentDidMount() {
        const photosResponse = await fetch(`http://localhost:4000/photos/`,
        {
            method: 'GET',
            headers: {
              'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwidXNlciI6InRlc3QiLCJpYXQiOjE2MDY2NzcxNjQsImV4cCI6MTYwNjY3ODYwNH0.lxxA51gFId9mISRMySJHObpZWB8tQv-HuUy-nhnnqpE'
            }
        });
        const photosJson = await photosResponse.json();
        this.setState({ photos: photosJson }); 

        console.log('photos', photosJson);
    }
    
    render() {
        return (
        <div>
            <h1>Photos {this.state.photos.length}</h1>
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
  export default Photos;