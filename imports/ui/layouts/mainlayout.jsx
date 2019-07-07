import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export const MainLayout = ({title, loginbutton,
						 	content, footer}) => (
	<main className="w-100 h-100">
		<nav className="d-flex navbar navbar-light bg-light mb-0">
			{loginbutton}
			<div className="w-25">
			</div>
			<div className="justify-content-end align-self-center m-1">
 				<h5>Abyss Team Builder {title}</h5>
			</div>
		</nav>
		<div className="content pl-2 pr-2">
			{content}
		</div>
		<footer className="footer text-center m-2 p-2">
			{footer}
			<p className="text-muted"> Copyright <i className="far fa-copyright"></i> 2019 - { moment( Date() ).format("YYYY") }</p>
		</footer>
     </main>
);