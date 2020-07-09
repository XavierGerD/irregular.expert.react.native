import Sound from "react-native-sound";

Sound.setCategory("Playback");

let blip01 = new Sound("/Sons/metronome_low.wav", (error) => {
  if (error) console.log(error);
});
let blip02 = new Sound("/Sons/metronome_high.wav", (error) => {
  if (error) console.log(error);
});
let clap = new Sound("/Sons/hand_clap.wav", (error) => {
  if (error) console.log(error);
});
let countdownSound = new Sound("/Sons/countdown.wav", (error) => {
  if (error) console.log(error);
});

export { blip01, blip02, clap, countdownSound };
