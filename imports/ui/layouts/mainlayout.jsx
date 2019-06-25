import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export const MainLayout = ({title, loginbutton,
						 	content}) => (
	<main className="w-100 h-100">
		<nav className="navbar navbar-light bg-light">
		{loginbutton}
			<div className="justify-content-center align-self-center m-1">
 				<h5>Abyss Team Builder {title}</h5>
			</div>
		</nav>
		{content}
     </main>
);