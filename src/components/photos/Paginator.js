import React from 'react';
import PropTypes from 'prop-types';


class Test extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = { currentPage: 1 };
      }
      
    handleClickNext () {
        const { onPageChanged = f => f } = this.props;
        const currentPage = this.props.currentPage + 1;

        const paginationData = {
            currentPage
          };
      
          this.setState({ currentPage }, () => onPageChanged(paginationData));
    }

    handleClickPrev () {
      const { onPageChanged = f => f } = this.props;
      const currentPage = this.props.currentPage - 1;

      const paginationData = {
          currentPage
        };
    
        this.setState({ currentPage }, () => onPageChanged(paginationData));
  }
    
    render() {
        return (
          <div>
              {this.props.currentPage > 1 &&
                <button type="button" className="btn btn-primary" onClick={() => this.handleClickPrev()}>Previous</button>
              }

              {this.props.currentPage <= this.props.totalPages &&
                <button type="button" className="btn btn-primary" onClick={() => this.handleClickNext()}>Next</button>
              }
          </div>
        )
        
      }

  }

  Test.propTypes = {
    onPageChanged: PropTypes.func
  };

  export default Test;