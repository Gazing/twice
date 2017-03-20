import React, { Component } from 'react';
import { render } from 'react-dom';
// import { Line } from 'rc-progress';

import TreeProgressReq from "./treeProgressReq.jsx";

var TreeStore = require("./treeStore.jsx");


class TreeProgress extends Component {
	constructor(){
		super();
		this.state = {
			reqs: []
		};
	}

	clicked(e){
		console.log("treeProgress clicked");
		console.log(this.props.programReq);
	}

	updateProgramReq(){
		// this.setState({reqs: TreeStore.getUserProgramReq()});
		// console.log("In updateProgramReq ");
		// console.log(TreeStore.getUserProgramReq());
		var thisComp = this;
		var programReqs = [];


		if(TreeStore.getUserProgramReq().length > 0){
			Promise.all(TreeStore.getUserProgramReq().map(function (req, index) {
				console.log("thisComp.props.taken = " + thisComp.props.taken);
				programReqs.push(<TreeProgressReq key={index} reqNum={index+1} req={req} taken={thisComp.props.taken} />);
	        })).then(function(){
	        	programReqs.sort(function(a,b){
	        		return a - b;
	        	});
				thisComp.setState({reqs: programReqs});
	        });
		}
		
	}

	componentDidMount() {
		this.treeOnProgramChange = this.updateProgramReq.bind(this);
    	TreeStore.addProgramChangeListener(this.treeOnProgramChange);
	}
	
	render() {
		// this.updateProgramReq();

		return 	<div className="program_req_container">
					<div className="program_progress" onClick={this.clicked.bind(this)}>
						<h3 className="search_result_name">Your Progress</h3>
						<div className="program_progress_set">{this.state.reqs}</div>
					</div>
				</div>;
				
	}
}


export default TreeProgress;