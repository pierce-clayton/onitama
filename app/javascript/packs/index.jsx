// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import actioncable from 'actioncable'

const CableApp = {}
//murmuring-beyond-38831.herokuapp.com
CableApp.cable = actioncable.createConsumer('ws://localhost:3000/cable')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <Router>
        <Route path="/">
          <App cableApp={CableApp}/>
        </Route> 
      </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
