import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export const MainLayout = ({title, loginbutton, leftContent, rightContent}) => (
	<main className="w-100 h-100">
		<nav className="navbar navbar-light bg-light">
		{loginbutton}
			<div className="justify-content-center align-self-center m-1">
 				<h4>Abyss Team Builder {title}</h4>
			</div>
		</nav>
		<div className="d-flex w-100 h-100">
			<div className="w-40 h-100 p-3">
		        <div className="card front-page-cards">
		        	{leftContent}
		        </div>
        	</div>
        	<div className="w-60 h-100 p-3">
        		<div className="card front-page-cards">
        			{rightContent}
        		</div>
        	</div>
        </div>	
     </main>
);