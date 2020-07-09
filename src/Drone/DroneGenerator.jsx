import React, { Component } from "react";
import Simple from "./Simple.jsx";
import Looper from "./Looper.jsx";
import "./DroneGenerator.css";

export default class DroneGenerator extends Component {
	state = {
		mode: "simple"
	};

	handleSimple = () => {
		this.setState({ mode: "simple" });
	};

	handleLooper = () => {
		this.setState({ mode: "looper" });
	};

	render = () => {
		return (
			<div className="drone-container">
				<div className="tab-container">
					<div onClick={this.handleSimple} className="tab">
						Simple
					</div>
					<div onClick={this.handleLooper} className="tab">
						Looper
					</div>
				</div>

				<div>
					{this.state.mode === "simple" ? <Simple /> : <Looper />}
				</div>
			</div>
		);
	};
}
