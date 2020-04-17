import React, { Component } from 'react';
import { Redirect } from 'react-router';

// Wrap around component to prevent unauthenticated access
// Eg) {withAuth(componentName)}
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/checkToken`)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/checkToken`)
        .then(res => {
          if (res.status === 200) {
            console.log("token matches")
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        console.log("weofij")
        return <Redirect to="/" />;
      }
      return <ComponentToProtect {...this.props}/>;
    }
  }
}