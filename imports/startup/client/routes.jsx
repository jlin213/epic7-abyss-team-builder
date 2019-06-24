import React 							from 'react';
import { Meteor } 						from 'meteor/meteor';
import { FlowRouter } 					from 'meteor/ostrio:flow-router-extra';
import { mount } 						from 'react-mounter';
// General
import { MainLayout } 					from '../../ui/layouts/mainlayout.jsx';
import AccountsUIWrapper 				from '../../ui/components/AccountsUIWrapper.js';

// /admin
import AdminButtons 					from '../../ui/components/admin/AdminButtons.jsx';
FlowRouter.route("/admin", {
	action: function(params){
		mount(MainLayout, {
			title: 'Admin ',
			content: <AdminButtons />,
			loginbutton: <AccountsUIWrapper/>,
		});
	}
})

// /home
import AbyssDat 						from '../../ui/components/mainApp/AbyssDat.jsx';
FlowRouter.route('/', {
// do some action for this route
action: function(params) {
		mount(MainLayout, {
			loginbutton: <AccountsUIWrapper />,
		  	content: <AbyssDat />,
		});
	}
});
