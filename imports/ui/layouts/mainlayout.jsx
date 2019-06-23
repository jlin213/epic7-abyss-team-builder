import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export const MainLayout = ({loginbutton, leftContent1, leftContent2}) => (
	<main>
		<nav className="navbar navbar-light bg-light">
		{loginbutton}
		</nav>
		<div className="container-fluid d-flex h-100">
			<div className="row justify-content-center align-self-center font margin">
 				Abyss Team Builder
			</div>
		</div>
		<div className = "container-fluid justify-content: space-between">
			<div className = "row w-30 align-items-start justify-content-start margin">
		        {leftContent1}
		        {leftContent2}
        	</div>
        </div>	
     </main>


);