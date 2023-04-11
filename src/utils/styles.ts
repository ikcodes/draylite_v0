// DON'T WANT THIS TO GET OUT OF HAND...
// But there's no SCSS in this project, and Grommet just
//  plays nicely with JS styles, so...

export const pageStyles = {
  minHeight: "calc(100vh - 72px)",
};

// Fix this using this page: https://medium.com/@ttennant/react-inline-styles-and-media-queries-using-a-custom-react-hook-e76fa9ec89f6
export const pageContentStyles = {
  paddingLeft: window.matchMedia("(min-width: 768px)") ? 39 : "inherit",
  background: "#f0f",
};

export const buttonStyles = {
  background: "#efefef",
  borderRadius: "20%",
  cursor: "pointer",
  padding: 10,
};

export const attributeButtonStyles = {
  borderRadius: "20%",
  border: "2px solid #fefefe",
  paddingTop: 8,
  paddingBottom: 0,
};

export const navDrayliteStyles = {
  color: "white",
  paddingLeft: 15,
  paddingTop: 13,
  fontSize: 20,
  fontWeight: "bold",
  letterSpacing: 1,
};
