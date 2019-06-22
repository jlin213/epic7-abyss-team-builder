import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './apollo-client'

import App from '../../ui/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
