// import DevTools from 'mobx-react-devtools'
import FontAwesome from './styles/font-awesome'
import Normalize from './styles/normalize'
import Modal from '../modal'
import ScrollManager from '../../ui/scroll-manager'
import ForgotPasswordForm from '../../shared/auth/forgot-password'
import SignUpForm from '../../shared/auth/signup'
import SignInForm from '../../shared/auth/signin'
import SignDescription from '../sign-description'
import SocialButtons from '../../shared/auth/components/social-buttons.js'

export default ({children}) => (
  <div>
    {children}
    { /* <DevTools /> */ }
    <ScrollManager />
    <FontAwesome />
    <Normalize />

    <Modal
      name='signupver1'
      title='Sign up and get started'
      subtitle='Build more and faster by leveraging existing backend code.'
      size='small'
      >
      <SignUpForm />
    </Modal>

    <Modal
      name='signupver2'
      title=''
      subtitle=''
      >

      <div className="left">
        <SignDescription />
      </div>

      <div className="right">
        <SignUpForm  />
      </div>

    </Modal>

    <Modal
      name='signupver3'
      title='Sign up and start building'
      subtitle='Build serverless apps on Syncano for free. Set up your backend in minutes!'
      >
      <SignUpForm social />
    </Modal>

    <Modal
      name='forgot-password'
      title='Forgot password'
      subtitle='Lost your password? No problem.'
      size='small'
      >
      <ForgotPasswordForm />
    </Modal>

    <Modal
      name='signin'
      title='Good to see you again'
      subtitle='Continue solving unique customer problems, not building and operating backend code.'
      >
      <SignInForm />
    </Modal>

    <style jsx global>{`
      body,
      h1, h2, h3, h4, h5, h6,
      blockquote, p, pre,
      dl, dd, ol, ul,
      figure,
      hr,
      fieldset, legend {
        margin:  0;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6 {
        line-height: 1.25;
      }

      .left {
        float: left;
        width: 40%;
      }

      .right {
        float: left;
        width: 60%;
      }

      html {
        font-family: Roboto;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        overflow-y: scroll;
      }

      .AppContainer {
        min-height: 100vh;
        overflow: hidden;
      }

      /* = WRAPPER
       * ==================================================================== */
      .u-wrapper {
        padding-left: 30px;
        padding-right: 30px;
        margin-left: auto;
        margin-right: auto;
      }

      /* = HEADINGS
       * ==================================================================== */
      .u-title {
        color: #0b0f15;
        font-weight: 300;
        font-size: 28px;
        line-height: 36px;
      }

      .u-title + .u-subtitle {
        margin-top: 15px;
      }

      @media screen and (min-width: 560px) {
        .u-title {
          font-size: 48px;
          line-height: 64px;
        }
      }

      .u-subtitle {
        color: #7a7f87;
        font-weight: 300;
        font-size: 20px;
        line-height: 32px;
      }

      @media screen and (min-width: 560px) {
        .u-subtitle {
          font-size: 24px;
        }
      }

      /* = TEXT-ALIGN
       * ==================================================================== */
      .u-ta-c {
        text-align: center;
      }

      .u-ta-r {
        text-align: right;
      }

      a {
        color: #2c59c5;
        cursor: pointer;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
)
