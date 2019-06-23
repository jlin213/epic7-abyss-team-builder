import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from 'react-mounter';
import { MainLayout } from '../../ui/layouts/mainlayout.jsx'
import AccountsUIWrapper from '../../ui/components/AccountsUIWrapper.js'
import FloorSelector from '../../ui/components/mainApp/FloorSelector.jsx';
import FlexBoxes from '../../ui/components/mainApp/Flexboxes.jsx';
import Admin from "../../ui/components/admin/Admin.jsx";

FlowRouter.route("/admin", {
	action: function(params){
		mount(MainLayout, {
			leftContent1: <Admin />,
			leftContent2: <FlexBoxes />,
			loginbutton: <AccountsUIWrapper/>,
		});
	}
})
FlowRouter.route('*', {
// do some action for this route
action: function(params) {
		mount(MainLayout, {
			loginbutton: <AccountsUIWrapper />,
		  	leftContent1: <FloorSelector />,
		  	leftContent2: <FlexBoxes />,
		});
	}
});

