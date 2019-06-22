import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {mount} from 'react-mounter';
import {MainLayout} from '../../ui/layouts/mainlayout.jsx'
import FloorSelector from '../../ui/FloorSelector.jsx';
import FlexBoxes from '../../ui/Flexboxes.jsx';

FlowRouter.route('*', {
// do some action for this route
action: function(params) {
		mount(MainLayout, {
		  	leftContent1: <FloorSelector />,
		  	leftContent2: <FlexBoxes />,
		});
	},
});
