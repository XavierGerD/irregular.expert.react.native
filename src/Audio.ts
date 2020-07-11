import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const blip01 = new Sound('metronome_low.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) console.log(error);
});

const blip02 = new Sound('metronome_high.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) console.log(error);
});
const clap = new Sound('hand_clap.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) console.log(error);
});

const countdownSound = new Sound(
  'countdown.wav',
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) console.log(error);
  },
);

export {blip01, blip02, clap, countdownSound};
