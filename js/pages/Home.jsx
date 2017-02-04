/* global $ */

import React, { Component, Button } from 'react'
import { connect } from 'react-redux'

import LeftCorner from '../components/LeftCorner'
import RightCorner from '../components/RightCorner'
import AppLauncher from '../components/AppLauncher'
import Message from '../../widgets/Message'
import VideoPlayer from '../../widgets/VideoPlayer'
import AudioPlayer from '../../widgets/AudioPlayer'

class Home extends Component {

  componentDidMount () {
    let idleTime = 0
    setInterval(() => {
      idleTime++
      if (idleTime > 5) {
        //$('body').hide()
      }
    }, 3000)

    this.props.socket.on('message', message => {
      if (message.detected === false) {
        $('.corner.left .profile_pic .indicator').removeClass('green').removeClass('orange').addClass('gray')
      } else if (message.identity === 0) {
        $('.corner.left .profile_pic .indicator').removeClass('green').removeClass('gray').addClass('orange')
      } else {
        $('.corner.left .profile_pic .indicator').removeClass('orange').removeClass('gray').addClass('green')
        idleTime = 0
        if (!$('body').is(':visible')) {
          $('body').show()
        }
      }
    })
  }

  displayAppLauncher() {
    $('.app-launcher').fadeIn();
  }

  render () {
    const videoPlayerConfig = {
      controls: false,
      loop: true,
      muted: true
    }

    return (
      <div>
        <LeftCorner />
        <RightCorner />
        <button className='app-launcher-button'>
          <i className='material-icons' onClick={this.displayAppLauncher}>apps</i>
        </button>
        <AppLauncher />
        <VideoPlayer src='../media/video/big_buck_bunny.mp4'
          config={videoPlayerConfig} draggable />
        <Message draggable />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    widgetQueue: state.widgets.widgetQueue,
    socket: state.socket
  }
}

export default connect(mapStateToProps)(Home)