import React, { Component } from "react";
import { blip01, countdownSound } from "../Audio.js";
import Tone from "tone";
import "./Looper.css";

export default class Looper extends Component {
	constructor() {
		super();
		this.state = {
			events: [],
			synth: new Tone.Synth().toMaster(),
			tempoInput: 60,
			lastClick: new Date() / 1,
			currentBeat: 0,
			currentEvent: 0,
			wave: "triangle"
		};
	}

	playFrame;
	countDownFrame;

	componentDidMount = () => {
		let state = { ...this.state };
		state.volume = new Tone.Volume(0);
		state.synth.chain(state.volume, Tone.Master);
		state.synth.oscillator.type = this.state.wave;
		Tone.Master.volume.value = -15;
		this.setState(state);
	};

	componentWillUnmount = () => {
		this.stopMe();
	};

	addEvent = () => {
		let events = [...this.state.events];
		if (events.length < 4) {
			events = events.concat([
				{ note: "C4", beats: 4, position: events.length }
			]);
			this.setState({ events });
		}
		return;
	};

	removeEvent = () => {
		let events = [...this.state.events];
		events = events.slice(0, events.length - 1);
		this.setState({ events });
	};

	showLooper = () => {
		this.setState({ show: !this.state.show });
	};

	handleNoteChange = event => {
		let events = [...this.state.events];
		events[event.target.id].note = event.target.value;
		this.setState({ events });
	};

	handleBeatChange = event => {
		let events = [...this.state.events];
		events[event.target.id].beats = event.target.value;
		this.setState({ events });
	};

	tempoInputHandler = event => {
		let tempoInput = parseInt(event.target.value);
		this.setState({ tempoInput });
	};

	setWave = (event, value) => {
		event.preventDefault();
		let state = { ...this.state };
		state.synth.oscillator.type = value;
		state.wave = value;
		this.setState(state, console.log("state", this.state));
	};

	stopMe = event => {
		// event.preventDefault();
		this.state.synth.triggerRelease();
		cancelAnimationFrame(this.playFrame);
		cancelAnimationFrame(this.countDownFrame);
		this.setState({ currentBeat: 0, currentEvent: 0 });
	};

	countMeDown = () => {
		if (this.state.events.length > 0) {
			let now = new Date() / 1;
			let clickInterval = 60000 / parseInt(this.state.tempoInput);
			let currentBeat = this.state.currentBeat;
			if (now - this.state.lastClick > clickInterval) {
				if (currentBeat === 3) {
					countdownSound.play();
					this.setState({
						lastClick: new Date() / 1,
						currentBeat: 0
					});
					this.playMe();
					return;
				}
				countdownSound.play();
				currentBeat++;
				this.countDownFrame = requestAnimationFrame(this.countMeDown);
				this.setState({ lastClick: new Date() / 1, currentBeat });
				return;
			}
			this.countDownFrame = requestAnimationFrame(this.countMeDown);
		}
	};

	playMe = () => {
		let now = new Date() / 1;
		let clickInterval = 60000 / parseInt(this.state.tempoInput);
		let currentBeat = this.state.currentBeat;
		let currentEvent = this.state.currentEvent;
		if (now - this.state.lastClick > clickInterval) {
			if (currentBeat === 0) {
				this.state.synth.triggerAttack(
					this.state.events[currentEvent].note,
					Tone.context.currentTime
				);
			}
			blip01.play();
			currentBeat++;
			this.playFrame = requestAnimationFrame(this.playMe);
			this.setState({ lastClick: new Date() / 1, currentBeat });
			if (currentBeat >= this.state.events[currentEvent].beats) {
				currentBeat = 0;
				currentEvent++;
				if (currentEvent >= this.state.events.length) {
					currentEvent = 0;
				}
				this.setState({ currentEvent, currentBeat });
			}
			return;
		}
		this.playFrame = requestAnimationFrame(this.playMe);
	};

	createWaveSelectors = () => {
		let waveforms = ["sine", "square", "triangle", "sawtooth"];
		let ret = waveforms.map(waveform => {
			let className = "waveselector";
			if (this.state.wave === waveform) {
				className = "waveselector selected";
			}
			return (
				<div
					className={className}
					onClick={event => {
						this.setWave(event, waveform);
					}}
				>
					{waveform.charAt(0).toUpperCase() + waveform.slice(1)}
				</div>
			);
		});
		return ret;
	};

	render = () => {
		return (
			<div className="drone-container">
				<div className="instructions-narrow ">
					This app lets you practice intonation by generating a drone.
				</div>
				<div className="instructions-narrow ">
					Start by adding events using the + sign. Select the note and
					its octave, as well as the number of beats it should be
					played before switching to the following event. Once all the
					events have played, they will be looped.
				</div>
				<div className="looper-container">
					<div className="control-container">
						<div
							style={{
								display: "flex"
							}}
						>
							<div
								onClick={this.addEvent}
								className="control-button"
							>
								+
							</div>
							<div
								onClick={this.removeEvent}
								className="control-button"
							>
								-
							</div>
						</div>
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
					</div>

					<div className="looper-main" id="looper">
						{this.state.events.map(event => {
							return (
								<div className="event" id={event.position}>
									<div style={{ display: "flex" }}>
										NOTE:{" "}
										<div style={{ paddingLeft: "5px" }}>
											<input
												type="text"
												className="rp-inputBox-small"
												id={event.position}
												onChange={event =>
													this.handleNoteChange(event)
												}
												value={event.note}
											/>
										</div>
									</div>
									<div style={{ display: "flex" }}>
										BEATS:{" "}
										<div style={{ paddingLeft: "5px" }}>
											<input
												type="text"
												className="rp-inputBox-small"
												id={event.position}
												onChange={event =>
													this.handleBeatChange(event)
												}
												value={event.beats}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around"
						}}
					>
						<div>
							<div className="waveselector-container">
								{this.createWaveSelectors()}
							</div>
							<div
								style={{
									display: "flex",
									marginBottom: "20px",
									justifyContent: "space-around",
									width: "445px"
								}}
							>
								<button id="start" onClick={this.countMeDown}>
									Start!
								</button>
								<button id="stop" onClick={this.stopMe}>
									Stop!
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
}
