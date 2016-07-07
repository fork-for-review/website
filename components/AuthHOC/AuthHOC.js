import React, { Component } from 'react';
import Syncano from 'syncano';
import Hello from './Hello';

export default (ComposedComponent) => (
  class AuthHOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        status: null,
        message: null,
        displayValidationErrors: false
      };
    };

    static childContextTypes = {
      auth: React.PropTypes.object
    };

    getChildContext = () => {
      const auth = {
        status: this.state.status,
        message: this.state.message,
        resetStatus: this.resetStatus,
        displayValidationErrors: this.state.displayValidationErrors,
        showValidationErrors: this.showValidationErrors,
        hideValidationErrors: this.hideValidationErrors,
        handlePasswordAuth: this.handlePasswordAuth,
        handlePasswordReset: this.handlePasswordReset,
        handleSocialAuth: this.handleSocialAuth
      };

      return { auth };
    };

    setStatus = (status, message) => {
      this.setState({ status, message });
    };

    resetStatus = () => {
      this.setState({
        status: null,
        message: null
      });
    };

    handlePasswordAuth = (type, { email, password }) => {
      const { Account } = Syncano({ baseUrl: APP_CONFIG.syncanoAPIBaseUrl });

      this.resetStatus();
      this.setStatus('processing');

      Account[type]({ email, password })
        .then((data) => {
          this.trackSignUp(
            data,
            () => this.redirectToDashboard(data.account_key, type === 'register' && true)
          );
        })
        .catch((error) => this.setStatus(error.status, error.message));
    };

    handlePasswordReset = ({ email }) => {
      const { Account } = Syncano({ baseUrl: APP_CONFIG.syncanoAPIBaseUrl });

      this.resetStatus();
      this.setStatus('processing');

      Account.resetPassword(email)
        .then((data) => this.setState({ status: 'success' }))
        .catch((error) => this.setStatus(error.status, error.message));
    };

    handleSocialAuth = (network) => {
      const { Account } = Syncano({ baseUrl: APP_CONFIG.syncanoAPIBaseUrl });

      Hello(network).login().then((data) => {
        const { access_token } = data.authResponse;

        if (data.network === 'google') {
          data.network = 'google-oauth2';
        }

        Account.socialLogin(data.network, access_token)
          .then((response) => {
            this.trackSignUp(
              { ...response, network: data.network },
              () => this.redirectToDashboard(response.account_key, response.created)
            );
          })
          .catch((error) => this.setStatus(error.status, error.message));
      }, (error) => this.setState({
        message: error.error.message
      }));
    };

    trackSignUp(data, callback) {
      const authBackend = data.network || 'password';
      const email = data.email;

      window.analytics.alias(email);
      window.analytics.track('Sign Up Website', { authBackend, email }, {}, callback);
    };

    redirectToDashboard = (token, signUpMode = false) => {
      let redirectUrl = `${APP_CONFIG.dashboardUrl}#/login?token=${token}`;

      if (signUpMode) {
        redirectUrl += `&signUpMode=${signUpMode}`;
      }
      
      window.location.href = redirectUrl;
    };

    showValidationErrors = () => {
      this.setState({ displayValidationErrors: true })
    };

    hideValidationErrors = () => {
      this.setState({ displayValidationErrors: false })
    };

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    };
  }
);
