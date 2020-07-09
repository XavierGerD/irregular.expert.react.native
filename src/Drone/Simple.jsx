import React, { Component } from "react";
import Tone from "tone";
import Metronome from "./Metronome.jsx";
import { pitchClassesFromA } from "../Data.js";
import "./Simple.css";

export default class Simple extends Component {
	constructor() {
		super();
		this.state = {
			synth: new Tone.Synth().toMaster(),
			octave: 4,
			wave: "triangle",
			currentNote: "",
			tuning: 440,
			pitchValues: []
		};
	}

	componentDidMount = () => {
		let state = { ...this.state };
		state.volume = new Tone.Volume(0);
		state.synth.chain(state.volume, Tone.Master);
		state.synth.oscillator.type = this.state.wave;
		Tone.Master.volume.value = -15;
		this.setState(state, () => {
			this.setTuning(this.state.tuning);
		});
	};

	componentWillUnmount = () => {
		this.stopMe();
	};

	setTuning = tuning => {
		if (tuning === "") {
			tuning = 1;
		}
		//create return array
		let pitchValues = [];
		//i starts at the lower octave to be dispalyed and the for ends before the highest octave to be dispalyed
		let newPitchClasses = pitchClassesFromA.map((pitchClass, i) => {
			let frequency = (tuning * Math.pow(2, i / 12)) / 2;
			//white note unless is has an accidental
			let color = "white";
			if (pitchClass[1] === "b" || pitchClass[1] === "#") color = "black";
			return {
				pitch: pitchClass,
				frequency,
				color
			};
		});

		newPitchClasses.push({
			pitch: "A",
			frequency: tuning / 2,
			color: "white"
		});
		//create one large array with all pitches
		pitchValues = pitchValues.concat(newPitchClasses);

		this.setState({ pitchValues, tuning }, () => {
			console.log("state in setTuning", this.state);
		});
	};

	setNote = (event, frequency, value) => {
		event.preventDefault();
		this.setState({ currentNote: value }, () => {
			this.state.synth.triggerAttack(frequency);
		});
	};

	setOctave = (event, value) => {
		let pitchValues = [...this.state.pitchValues];
		pitchValues.forEach(pitchValue => {
			pitchValue.frequency =
				pitchValue.frequency / Math.pow(2, this.state.octave);
			pitchValue.frequency = pitchValue.frequency * Math.pow(2, value);
			if (pitchValue.pitch === this.state.currentNote) {
				this.setNote(event, pitchValue.frequency, pitchValue.pitch);
			}
		});
		this.setState({ pitchValues, octave: value });
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
		this.setState({ currentNote: "" });
	};

	adjustVolume = event => {
		event.preventDefault();
		let state = { ...this.state };
		state.volume.volume.value = event.target.value;
		this.setState({ state });
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

	createOctaveSelectors = () => {
		let ret = [];
		for (let i = 2; i < 6; i++) {
			let className = "octave-selector";
			if (this.state.octave === i) {
				className = "octave-selector selected";
			}
			ret.push(
				<div
					className={className}
					onClick={event => this.setOctave(event, i)}
				>
					{i}
				</div>
			);
		}
		return ret;
	};

	createWhiteNotes = () => {
		let notes = this.state.pitchValues;
		let ret = notes.map(note => {
			if (note.color === "white") {
				let className = "whitenotebutton";
				if (this.state.currentNote === note) {
					className = "whitenotebutton selected";
				}

				return (
					<div
						className={className}
						onClick={event =>
							this.setNote(event, note.frequency, note.pitch)
						}
					>
						<div>
							<div>{note.pitch}</div>
						</div>
					</div>
				);
			}
		});

		return ret;
	};
	createBlackNotes = () => {
		let notes = this.state.pitchValues;
		let ret = notes.map(note => {
			if (note.color === "black") {
				let className = "blacknotebutton";
				if (this.state.currentNote === note) {
					className = "blacknotebutton selected";
				}
				return (
					<React.Fragment>
						<div
							className={className}
							onClick={event =>
								this.setNote(event, note.frequency, note.pitch)
							}
						>
							<div>
								<div>{note.pitch}</div>
							</div>
						</div>
						{note.pitch[0] === "E" ? (
							<div className="notespacer"></div>
						) : null}
						{note.pitch[0] === "B" ? (
							<div className="notespacer"></div>
						) : null}
					</React.Fragment>
				);
			}
		});

		return ret;
	};

	render = () => {
		return (
			<div className="drone-container">
				<div className="instructions">
					This app lets you practice intonation by generating a drone.
				</div>
				<div className="instructions">
					Simply click on the note you choose. You can also change the
					octave.
				</div>
				<div className="drone-container">
					<div
						style={{
							display: "flex",
							marginBottom: "20px",
							justifyContent: "center"
						}}
					>
						<div className="select-container">
							<div style={{ marginBottom: "10px" }}>OCTAVE</div>
							<div style={{ display: "flex" }}>
								{this.createOctaveSelectors()}
							</div>
							<div className="cents-selector">
								Set A to:
								<input
									className="rp-inputBox"
									style={{
										marginRight: "10px",
										width: "25px"
									}}
									type="input"
									value={this.state.tuning}
									onChange={event =>
										this.setTuning(event.target.value)
									}
								/>
							</div>
						</div>
						<Metronome />
					</div>
					<div className="waveselector-container">
						{this.createWaveSelectors()}
					</div>
				</div>
				<div
					style={{
						marginBottom: "20px",
						display: "flex"
					}}
				>
					<div className="vertical-slider-container">
						<div>Volume</div>
						<input
							type="range"
							min="-12"
							max="12"
							className="slider-vertical"
							id="volumeSlider"
							defaultValue="0"
							onChange={event => {
								this.adjustVolume(event);
							}}
						/>
					</div>
					<div>
						<div className="blacknotes">
							{this.createBlackNotes()}
						</div>

						<div className="whitenotes">
							{this.createWhiteNotes()}
						</div>
					</div>
				</div>

				<button id="stop" onClick={this.stopMe}>
					Stop!
				</button>
			</div>
		);
	};
}
