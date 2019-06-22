import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export const MainLayout = ({leftContent1, leftContent2}) => (
	<body>
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
     </body>
     //possible code for fitler based on stars 
 		//       <ul class="nav">
		// 	<li class="nav-item">
		// 		<a class="nav-link active" href="#">{fiveStar}</a>
		// 	</li>
		// 	<li class="nav-item">
		// 	 	<a class="nav-link" href="#">{fourStar}}</a>
		// 	</li>
		// 	<li class="nav-item">
		// 		<a class="nav-link" href="#">{threeStar}</a>
		// 	</li>
		// 	<li class="nav-item">
		// 	    <a class="nav-link disabled" href="#">Disabled</a>
		// 	</li>
		// </ul>

);