const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const white = "#fff";
const black = "#000";
const dark = "#626262";
const blue = "#1F41BB";
const gray = "#ECECEC";
const lightBlue = "#f1f4ff";


export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  darkText: dark,
  text: black,
  background: white,
  primary: blue,
  onPrimary: white,
  active: blue,
  borderWithOpacity: "#1f41bb",
  lightPrimary: lightBlue,
  gray: gray,
};
