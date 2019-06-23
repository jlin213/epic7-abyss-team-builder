import React 							from 'react';
import { Meteor } 						from 'meteor/meteor';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { mount } 						from 'react-mounter';
// General
import { MainLayout } 					from '../../ui/layouts/mainlayout.jsx';
import AccountsUIWrapper 				from '../../ui/components/AccountsUIWrapper.js';

// /admin
import AdminButtons 					from '../../ui/components/admin/AdminButtons.jsx';
import AddHero 							from "../../ui/components/admin/AddHero.jsx";
FlowRouter.route("/admin", {
	action: function(params){
		mount(MainLayout, {
			leftContent1: <AdminButtons />,
			loginbutton: <AccountsUIWrapper/>,
		});
	}
})

// /home
import FloorSelector 					from '../../ui/components/mainApp/FloorSelector.jsx';
import FlexBoxes 						from '../../ui/components/mainApp/Flexboxes.jsx';
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

