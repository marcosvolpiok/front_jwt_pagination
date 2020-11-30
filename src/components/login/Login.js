import React from 'react';
import {Link} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        loginMessage: '',
        loginStatus: false,
        token: this.props.cookies.get("token") || ""
    };

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleCookie = (token) => {
        const { cookies } = this.props;
        cookies.set("token", token, { path: "/" });
    };
   
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async handleClick () {
        const responseLogin = await fetch(`http://localhost:4000/login/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                pwd: this.state.pwd
            }) 
        });
        const loginJson = await responseLogin.json();
 
        this.setState({
            loginMessage: loginJson.message
        });

        if(responseLogin.status===200){
            this.setState({
                loginStatus: true
            });

            this.handleCookie(loginJson.token);
        }
    }

   
    
    render() {
        const { token } = this.state;
        

        return (
            <div>
                {this.state.loginMessage !== '' &&
                    <p>{this.state.loginMessage}</p>
                }

                {this.state.loginStatus === true &&
                    <p><Link to="/photos/">Photos list</Link></p>
                }

                <input type="text" name="user" onChange={this.handleInputChange} />
                <div></div>
                <input type="password" name="pwd" onChange={this.handleInputChange} />

                <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Login</button>
            </div>
        )
      }

  }
  export default withCookies(Login);