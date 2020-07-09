import React, { Component } from "react";
import Looper from "./Looper.jsx";
import "./Metronome.css";
import { blip01, blip02, clap, countdownSound } from "../Audio.js";

export default class Metronome extends Component {
	constructor() {
		super();
		this.state = {
			tempoInput: 60,
			lastClick: new Date() / 1
		};
	}

	playFrame;

	componentWillUnmount = () => {
		this.stop();
	};

	tempoInputHandler = event => {
		this.setState({ tempoInput: event.target.value });
	};

	adjustVolume = event => {
		event.preventDefault();
		blip01.volume(event.target.value / 100);
	};

	play = () => {
		let now = new Date() / 1;
		let clickInterval = 60000 / parseInt(this.state.tempoInput);
		if (now - this.state.lastClick > clickInterval) {
			blip01.play();
			this.playFrame = requestAnimationFrame(this.play);
			this.setState({ lastClick: new Date() / 1 });
			return;
		}
		this.playFrame = requestAnimationFrame(this.play);
	};

	stop = () => {
		cancelAnimationFrame(this.playFrame);
	};

	render = () => {
		return (
			<div className="select-container">
				<div style={{ display: "flex" }}>
					METRONOME:
					<input
						type="text"
						value={this.state.tempoInput}
						className="rp-inputBox"
						onChange={event => {
							this.tempoInputHandler(event);
						}}
					></input>
				</div>
				<div style={{ display: "flex", marginTop: "10px" }}>
					{" "}
					<div onClick={this.play} className="dr-button1">
						PLAY!
					</div>
					<div onClick={this.stop} className="dr-button1">
						STOP!
					</div>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					className="slider"
					id="volumeSlider"
					defaultValue="50"
					onChange={event => {
						this.adjustVolume(event);
					}}
				/>
			</div>
		);
	};
}
