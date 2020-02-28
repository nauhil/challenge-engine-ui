/**
 * Component to define routes of the app
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import renderApp from './components/App'
import TopBarContainer from './containers/TopbarContainer'
import Sidebar from './containers/Sidebar'
import ChallengeList from './containers/Challenges'
import ChallengeEditor from './containers/ChallengeEditor'
import { getFreshToken } from 'tc-accounts'
import { ACCOUNTS_APP_LOGIN_URL, SIDEBAR_MENU } from './config/constants'
import { saveToken } from './actions/auth'
import { connect } from 'react-redux'

class Routes extends React.Component {
  componentWillMount () {
    this.checkAuth()
  }

  checkAuth () {
    // try to get a token and redirect to login page if it fails
    getFreshToken().then((token) => {
      this.props.saveToken(token)
    }).catch((error) => {
      console.error(error)
      const redirectBackToUrl = window.location.origin + this.props.location.pathname
      window.location = ACCOUNTS_APP_LOGIN_URL + '?retUrl=' + redirectBackToUrl
    })
  }

  render () {
    if (!this.props.isLoggedIn) {
      return null
    }

    return (
      <Switch>
        <Route exact path='/'
          render={() => renderApp(
            <ChallengeList menu='NULL' />,
            <TopBarContainer />,
            <Sidebar />
          )()}
        />
        <Route exact path='/projects/:projectId/challenges/active'
          render={({ match }) => renderApp(
            <ChallengeList menu={SIDEBAR_MENU.ACTIVE_CHALLENGES} projectId={match.params.projectId} />,
            <TopBarContainer />,
            <Sidebar projectId={match.params.projectId} />
          )()} />
        <Route exact path='/projects/:projectId/challenges/all'
          render={({ match }) => renderApp(
            <ChallengeList menu={SIDEBAR_MENU.ALL_CHALLENGES} projectId={match.params.projectId} />,
            <TopBarContainer />,
            <Sidebar projectId={match.params.projectId} />
          )()} />
        <Route exact path='/projects/:projectId/challenges/new'
          render={({ match }) => renderApp(
            <ChallengeEditor />,
            <TopBarContainer />,
            <Sidebar projectId={match.params.projectId} />
          )()} />
        <Route exact path='/projects/:projectId/challenges/:challengeId/edit'
          render={({ match }) => renderApp(
            <ChallengeEditor />,
            <TopBarContainer />,
            <Sidebar projectId={match.params.projectId} />
          )()} />
        {/* If path is not defined redirect to landing page */}
        <Redirect to='/' />
      </Switch>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  ...auth
})

const mapDispatchToProps = {
  saveToken
}

Routes.propTypes = {
  saveToken: PropTypes.func,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
