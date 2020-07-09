import React, { Component } from "react";
import Tone from "tone";
import MathJax from "react-mathjax";
import {
  justRatios,
  pythagoreanRatios,
  pitchClasses,
  circleOfFifths,
  meantoneRatios,
} from "../Data.js";
import "./Detune.css";

export default class Detune extends Component {
  constructor() {
    super();
    this.state = {
      synth: new Tone.PolySynth(4, Tone.Synth, {
        oscillator: { type: "triangle" },
      }).toMaster(),
      octave: 4,
      wave: "triangle",
      currentNote: "",
      pitchValues: [],
      globalDetune: 0,
      currentTemperament: undefined,
      showFrequencies: true,
      octaveSize: 12,
      selectedJust: "C",
      selectedPythagorean: "C",
      selectedMeantone: "C",
      descriptions: {
        just: false,
        equal: false,
        pythagorean: false,
        quarterMeantone: false,
      },
    };
  }

  componentDidMount = () => {
    console.log("meantone ratio", meantoneRatios.fifth);
    this.getEqualTemperament(this.state.octaveSize);
  };

  componentWillUnmount = () => {
    this.state.synth.releaseAll();
  };

  setWave = (event, value) => {
    event.preventDefault();
    let state = { ...this.state };
    state.synth.voices.forEach((voice) => {
      voice.oscillator.type = value;
    });
    state.wave = value;
    this.setState(state);
  };

  handleOctaveSubdivisionChange = (value) => {
    if (value === "") {
      value = 1;
    }
    value = parseInt(value);
    if (this.currentTemperament === "equal") this.getEqualTemperament(value);
    this.setState({ octaveSize: value });
  };

  handleGlobalDetune = (value) => {
    if (value === "") {
      value = 0;
    }
    //cancel previous detune before calculating new one
    let pitchValues = this.state.pitchValues;
    pitchValues.forEach((pitchValue) => {
      pitchValue.frequency =
        pitchValue.frequency *
        Math.pow(2, (this.state.globalDetune * -1) / 1200);
    });
    //calculate new detune
    value = parseInt(value);
    pitchValues.forEach((pitchValue) => {
      pitchValue.frequency = pitchValue.frequency * Math.pow(2, value / 1200);
    });
    this.setState({ globalDetune: value, pitchValues });
  };

  arrowClickHandler = (event) => {
    let descriptions = { ...this.state.descriptions };
    descriptions[event.target.id] = !descriptions[event.target.id];
    this.setState({ descriptions });
  };

  getRatioBased = (tonic, ratio, name) => {
    //get values from state
    let pitchValues = [...this.state.pitchValues];
    //find the frequency of the note from which to derive rations
    let tonicFrequency = Tone.Frequency(
      tonic + this.state.octave + ""
    ).toFrequency();
    let index = circleOfFifths.indexOf(tonic);
    let firstHalf = [];
    for (let i = index + 1; i < index + 7; i++) {
      if (circleOfFifths[i] !== undefined) firstHalf.push(circleOfFifths[i]);
    }
    if (firstHalf.length < 6) {
      let remainingNotes = 6 - firstHalf.length;
      for (let i = 0; i < remainingNotes; i++) {
        firstHalf.push(circleOfFifths[i]);
      }
    }
    let secondHalf = [];
    for (let i = index - 1; i > index - 6; i--) {
      if (circleOfFifths[i] !== undefined) secondHalf.push(circleOfFifths[i]);
    }
    if (secondHalf.length < 5) {
      let remainingNotes = circleOfFifths.length - 6 + secondHalf.length;
      for (let i = circleOfFifths.length - 1; i > remainingNotes; i--) {
        secondHalf.push(circleOfFifths[i]);
      }
    }
    let indexInPitchClasses = pitchClasses.indexOf(tonic);
    firstHalf.forEach((note, i) => {
      pitchValues.forEach((pitch, j) => {
        let currentNote = pitch.pitch.replace(/[0-9]/g, "");
        if (note === currentNote) {
          let frequency = tonicFrequency * ratio.fifth;
          for (let j = 0; j < i; j++) frequency = frequency * ratio.fifth;
          while (frequency > tonicFrequency * 2) frequency = frequency / 2;
          let currentOctave = parseInt(pitch.pitch.replace(/[\D]/g, ""));
          if (currentOctave === 5) frequency = frequency * 2;
          if (
            j < indexInPitchClasses ||
            (j > 11 && j < indexInPitchClasses + 12)
          )
            frequency = frequency / 2;
          pitch.frequency = frequency;
          pitch.ratio = undefined;
        }
      });
    });
    secondHalf.forEach((note, i) => {
      pitchValues.forEach((pitch, j) => {
        let currentNote = pitch.pitch.replace(/[0-9]/g, "");
        if (note === currentNote) {
          let frequency = tonicFrequency * ratio.fourth;
          for (let j = 0; j < i; j++) frequency = frequency * ratio.fourth;
          while (frequency > tonicFrequency * 2) frequency = frequency / 2;
          let currentOctave = parseInt(pitch.pitch.replace(/[\D]/g, ""));
          if (currentOctave === 5) frequency = frequency * 2;
          if (
            j < indexInPitchClasses ||
            (j > 11 && j < indexInPitchClasses + 12)
          )
            frequency = frequency / 2;
          pitch.frequency = frequency;
          pitch.ratio = undefined;
        }
      });
    });

    pitchValues.forEach((pitch) => {
      console.log("pitch", pitch);
      let currentNote = pitch.pitch.replace(/[0-9]/g, "");
      if (currentNote === tonic) {
        pitch.ratio = undefined;
      }
    });

    console.log("first", firstHalf);
    console.log("second", secondHalf);
    this.setState({ currentTemperament: name, pitchValues });
  };

  getEqualTemperament = (division) => {
    //create return array
    let pitchValues = [];
    //i starts at the lower octave to be dispalyed and the for ends before the highest octave to be dispalyed
    for (let i = 4; i < 6; i++) {
      let newPitchClasses = pitchClasses.map((pitchClass, j) => {
        let baseFrequency = Tone.Frequency("C0").toFrequency();
        let frequency =
          baseFrequency * Math.pow(2, j / division) * Math.pow(2, i);
        //pitch class + octave
        let pitch = pitchClass + i;
        //white note unless is has an accidental
        let color = "white";
        if (pitch[1] === "b" || pitch[1] === "#") color = "black";
        return {
          pitch,
          frequency,
          ratio: undefined,
          color,
        };
      });
      //create one large array with all pitches
      pitchValues = pitchValues.concat(newPitchClasses);
    }
    this.setState({ pitchValues, currentTemperament: "equal" }, () => {
      console.log("state", this.state);
    });
  };

  getJustTemperament = (tonic, ratios, name) => {
    //get values from state
    let pitchValues = [...this.state.pitchValues];
    ratios = [...ratios];
    //find the frequency of the note from which to derive rations
    let tonicFrequency = Tone.Frequency(tonic + "4").toFrequency();
    //cut the ratios array in half and switch the position of the two halves.
    //this is done so that the index of the ratios matches the index of the pitch classes
    //for example if we want just intonation in F, the index of ratio [1, 1] must match the index of F
    let index = pitchClasses.indexOf(tonic);
    let distanceToEnd = pitchClasses.length - index;
    let firstHalf = ratios.slice(distanceToEnd, ratios.length);
    let secondHalf = ratios.slice(0, distanceToEnd);
    let ratiosRearranged = firstHalf.concat(secondHalf);
    let offset = 0;
    let octaveMultiplier = 1;
    pitchValues.forEach((pitchValue, i) => {
      pitchValue.frequency =
        ((tonicFrequency * ratiosRearranged[i - offset][0]) /
          ratiosRearranged[i - offset][1]) *
        octaveMultiplier;
      if (i - offset < index) {
        pitchValue.frequency = pitchValue.frequency / 2;
      }

      pitchValue.ratio = ratiosRearranged[i - offset];

      if (i === ratiosRearranged.length - 1) {
        offset += 12;
        octaveMultiplier = octaveMultiplier * 2;
      }
    });

    this.setState({ pitchValues, currentTemperament: name });
  };

  setNote = (event, value) => {
    event.preventDefault();
    this.setState({ currentNote: value }, () => {
      this.state.synth.triggerAttack(this.state.currentNote);
    });
  };

  createWaveSelectors = () => {
    let waveforms = ["sine", "square", "triangle", "sawtooth"];
    let ret = waveforms.map((waveform) => {
      let className = "waveselector";
      if (this.state.wave === waveform) {
        className = "waveselector selected";
      }
      return (
        <div
          className={className}
          onClick={(event) => {
            this.setWave(event, waveform);
          }}
        >
          {waveform.charAt(0).toUpperCase() + waveform.slice(1)}
        </div>
      );
    });
    return ret;
  };

  createWhiteNotes = () => {
    let notes = this.state.pitchValues;
    let ret = notes.map((note) => {
      let currentNote = note.pitch.replace(/[\D]/g, "");
      if (note.color === "white") {
        if (parseInt(currentNote) > 3 && parseInt(currentNote) < 6) {
          let className = "whitenotebutton";
          if (currentNote === note) {
            className = "whitenotebutton selected";
          }
          return (
            <div
              className={className}
              onClick={(event) => this.setNote(event, note.frequency)}
            >
              <div>
                <div>{this.state.octaveSize === 12 ? note.pitch : null}</div>
                {note.ratio !== undefined ? (
                  <div
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {note.ratio[0]}:{note.ratio[1]}
                  </div>
                ) : null}
                {this.state.showFrequencies ? (
                  <div
                    style={{
                      fontSize: "15px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {note.frequency.toFixed(2)}
                  </div>
                ) : null}
              </div>
            </div>
          );
        }
      }
    });

    return ret;
  };

  createBlackNotes = () => {
    let notes = this.state.pitchValues;
    let ret = notes.map((note) => {
      let currentNote = note.pitch.replace(/[\D]/g, "");
      if (note.color === "black") {
        if (parseInt(currentNote) > 3 && parseInt(currentNote) < 6) {
          let className = "blacknotebutton";
          if (currentNote === note) {
            className = "blacknotebutton selected";
          }
          return (
            <React.Fragment>
              <div
                className={className}
                onClick={(event) => this.setNote(event, note.frequency)}
              >
                <div>
                  <div>{this.state.octaveSize === 12 ? note.pitch : null}</div>
                  {note.ratio !== undefined ? (
                    <div
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {note.ratio[0]}:{note.ratio[1]}
                    </div>
                  ) : null}
                  {this.state.showFrequencies ? (
                    <div
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {note.frequency.toFixed(2)}
                    </div>
                  ) : null}
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
      }
    });

    return ret;
  };

  render = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: "50px" }}>
          <div className="instructions" style={{ marginBottom: "40px" }}>
            This app lets you play around with different temperaments. Click on
            the arrow to reveal a description of each tuning.
          </div>{" "}
          <div className="blacknotes">{this.createBlackNotes()}</div>
          <div className="whitenotes">{this.createWhiteNotes()}</div>
          <div className="detune-selector">
            <div className="waveselector-container">
              {this.createWaveSelectors()}
            </div>
            <div>
              <div className="temperament-selector">
                <div
                  className={
                    this.state.descriptions.equal ? "arrowdown" : "arrowright"
                  }
                  id="equal"
                  onClick={(event) => this.arrowClickHandler(event)}
                />
                {/* <input
									className="rp-inputBox"
									style={{
										marginRight: "10px",
										width: "25px"
									}}
									type="input"
									value={this.state.octaveSize}
									onChange={event =>
										this.handleOctaveSubdivisionChange(
											event.target.value
										)
									}
								/> */}
                12 Tone Equal Temperament
                <input
                  type="radio"
                  className="radiobutton"
                  name="temperamentSelect"
                  onChange={(event) =>
                    this.getEqualTemperament(this.state.octaveSize)
                  }
                  defaultChecked={true}
                />
              </div>
              <div
                className="description-box"
                style={{
                  display: this.state.descriptions.equal ? "block" : "none",
                }}
              >
                <MathJax.Provider>
                  Equal temperament is obtained by making all half-steps
                  (semitones) equal. In 12-tone equal temperament, the distance
                  between all minor seconds is{" "}
                  {<MathJax.Node inline formula={"\\sqrt[12] 2"} />} or{" "}
                  {<MathJax.Node inline formula={"\\approx 1.059463"} />}. While
                  this allows all keys to be equally tempered, it has the
                  tradeoff of preventing all intervals except the octave and
                  unison from being perfectly just.
                </MathJax.Provider>
              </div>
            </div>
            <div>
              <div className="temperament-selector">
                <div
                  className={
                    this.state.descriptions.just ? "arrowdown" : "arrowright"
                  }
                  id="just"
                  onClick={(event) => this.arrowClickHandler(event)}
                />
                Just Intonation in{" "}
                <select
                  className="dropdown-select"
                  disabled={this.state.currentTemperament !== "just"}
                  onChange={(event) =>
                    this.setState(
                      {
                        selectedJust: event.target.value,
                      },
                      () => {
                        this.getJustTemperament(
                          this.state.selectedJust,
                          justRatios,
                          "just"
                        );
                      }
                    )
                  }
                >
                  {pitchClasses.map((pitchClass) => {
                    return <option value={pitchClass}>{pitchClass}</option>;
                  })}
                </select>
                <input
                  type="radio"
                  className="radiobutton"
                  name="temperamentSelect"
                  onChange={(event) =>
                    this.getJustTemperament(
                      this.state.selectedJust,
                      justRatios,
                      "just"
                    )
                  }
                />
              </div>
              <div
                className="description-box"
                style={{
                  display: this.state.descriptions.just ? "block" : "none",
                }}
              >
                <MathJax.Provider>
                  Just intonation is a temperament in which interval sizes are
                  determined using small whole number ratios, such as{" "}
                  {<MathJax.Node inline formula={"3:2"} />} (perfect fifth) or{" "}
                  {<MathJax.Node inline formula={"4:3"} />} (perfect fourth).
                  These intervals are mostly derived from the harmonic series.
                  While this temperament allows one specific key to have all of
                  its intervals perfectly just, it sacrifices consonance in all
                  other keys, since it is mathematically impossible to have just
                  intervals in every key at the same time. When selecting just
                  inonation, you may also choose the key to which the intervals
                  are tuned.
                </MathJax.Provider>
              </div>
            </div>
            <div>
              <div className="temperament-selector">
                <div
                  className={
                    this.state.descriptions.pythagorean
                      ? "arrowdown"
                      : "arrowright"
                  }
                  id="pythagorean"
                  onClick={(event) => this.arrowClickHandler(event)}
                />
                Pythagorean in{" "}
                <select
                  className="dropdown-select"
                  disabled={this.state.currentTemperament !== "pythagorean"}
                  onChange={(event) =>
                    this.setState(
                      {
                        selectedPythagorean: event.target.value,
                      },
                      () => {
                        this.getRatioBased(
                          this.state.selectedPythagorean,
                          pythagoreanRatios,
                          "pythagorean"
                        );
                      }
                    )
                  }
                >
                  {pitchClasses.map((pitchClass) => {
                    return <option value={pitchClass}>{pitchClass}</option>;
                  })}
                </select>
                <input
                  type="radio"
                  className="radiobutton"
                  name="temperamentSelect"
                  onChange={(event) =>
                    this.getRatioBased(
                      this.state.selectedPythagorean,
                      pythagoreanRatios,
                      "pythagorean"
                    )
                  }
                />
              </div>
              <div
                className="description-box"
                style={{
                  display: this.state.descriptions.pythagorean
                    ? "block"
                    : "none",
                }}
              >
                <MathJax.Provider>
                  Pythagorean tuning is a system in which all interval ratios
                  are based on the perfect fifth{" "}
                  {<MathJax.Node inline formula={"(3:2)"} />}. This is achieved
                  by selecting a starting pitch, then going up the circle of
                  fifths six times, and down the circle of fifths five times,
                  tuning each consecutive fifth to the{" "}
                  {<MathJax.Node inline formula={"3:2"} />} ratio. For example,
                  starting on D:
                  <div>
                    E♭–B♭–F–C–G–
                    <span style={{ fontWeight: 1000 }}>D</span>
                    –A–E–B–F♯–C♯–G♯
                  </div>
                  When continuing the circle of fifths downwards to A♭, however,
                  a problem arises: the A♭ is not perfectly enharmonic with the
                  G♯ above. Indeed, both intervals are not a perfect fifth away{" "}
                  {<MathJax.Node inline formula={"(3:2)"} />} , but rather G♯ is
                  about {<MathJax.Node inline formula={"23.46"} />} cents (or a
                  Pythagorean comma) above A♭. To remedy this, one of the fifths
                  is left out. This means that when closing the circle of
                  fifths, the very last fifth of the circle is flat by a
                  Pythagorean comma. This interval is called the wolf fifth. The
                  wolf fifth is usually located a tritone above the note for
                  which the tuning is derived.
                </MathJax.Provider>
              </div>
            </div>
            <div>
              <div className="temperament-selector">
                <div
                  className={
                    this.state.descriptions.quarterMeantone
                      ? "arrowdown"
                      : "arrowright"
                  }
                  id="quarterMeantone"
                  onClick={(event) => this.arrowClickHandler(event)}
                />
                1/4 Comma Meantone{" "}
                <select
                  className="dropdown-select"
                  disabled={this.state.currentTemperament !== "quarterMeantone"}
                  onChange={(event) =>
                    this.setState(
                      {
                        selectedMeantone: event.target.value,
                      },
                      () => {
                        this.getRatioBased(
                          this.state.selectedMeantone,
                          meantoneRatios,
                          "quarterMeantone"
                        );
                      }
                    )
                  }
                >
                  {pitchClasses.map((pitchClass) => {
                    return <option value={pitchClass}>{pitchClass}</option>;
                  })}
                </select>
                <input
                  type="radio"
                  className="radiobutton"
                  name="temperamentSelect"
                  onChange={(event) =>
                    this.getRatioBased(
                      this.state.selectedMeantone,
                      meantoneRatios,
                      "quarterMeantone"
                    )
                  }
                />
              </div>
              <div
                className="description-box"
                style={{
                  display: this.state.descriptions.quarterMeantone
                    ? "block"
                    : "none",
                }}
              >
                <MathJax.Provider>
                  Quarter Comma Meantone is an attempt at mitigating the loss of
                  purity in major thirds thirds caused by the width of the
                  fifths in Pythagorean tuning. Indeed, when fifths are tuned to
                  just intervals, like in Pythagorean tuning, major thirds are
                  stretched. It is impossible to have both pure major thirds and
                  pure perfect fifths. Hence, by reducing the size of fifths, it
                  is possible to achieve pure thirds. These new fifths are
                  obtained using the formula{" "}
                  {<MathJax.Node inline formula={"(3/2) * (80/81)^{1/4}"} />} or{" "}
                  {<MathJax.Node inline formula={"\\approx 1.49535"} />}.
                </MathJax.Provider>
              </div>
            </div>
            <div className="temperament-selector">
              Global detune (cents +/-)
              <input
                className="rp-inputBox"
                style={{
                  marginRight: "10px",
                  width: "25px",
                }}
                type="input"
                value={this.state.globalDetune}
                onChange={(event) =>
                  this.handleGlobalDetune(event.target.value)
                }
              />
            </div>
            <div
              className="waveselector"
              onClick={(event) => this.state.synth.releaseAll()}
            >
              Release all
            </div>
          </div>
        </div>
      </div>
    );
  };
}
