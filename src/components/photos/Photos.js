import React from 'react';

class Photos extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const pageLimit = 10;
        const offset = (this.props.currentPage - 1) * pageLimit;
        const currentPhotos = this.props.photos.slice(offset, offset + pageLimit);

        console.log(currentPhotos);
        return (
        <div>
            <h1>Photos {this.props.currentPage} / {this.props.totalPages}</h1>
             {currentPhotos.length > 0 &&
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Title</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentPhotos.map((photo, index) => {
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

            {currentPhotos.length === 0 &&
                <h2>No such any photo.</h2>
            }
        </div>
        )
        
    }

  }
  export default Photos;