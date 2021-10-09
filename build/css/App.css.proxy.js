// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "/* Color Theme Swatches in Hex */\r\n.LOFT-REDUX-LMC-1-hex { color: #353D40; }\r\n.LOFT-REDUX-LMC-2-hex { color: #D9D9D9; }\r\n.LOFT-REDUX-LMC-3-hex { color: #A1A5A6; }\r\n.LOFT-REDUX-LMC-4-hex { color: #F2B138; }\r\n.LOFT-REDUX-LMC-5-hex { color: #003F63; }\r\n\r\n@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');\r\n\r\nhtml,\r\nbody {\r\n  margin: 0;\r\n  overflow: hidden;\r\n  background-color: #A1A5A6;\r\n}\r\n\r\n.App {\r\n  font-family: 'Roboto', sans-serif;\r\n  height: 100vh;\r\n  display: flex;\r\n}\r\n\r\n.sidebar {\r\n    width: 200px;\r\n    height: 100%;\r\n    background-color: #353D40;\r\n    color: #D9D9D9;\r\n}\r\n\r\n.sidebar > button {\r\n    background-color: #353D40;\r\n    color: #D9D9D9;\r\n}\r\n\r\n.sidebar-calendars {\r\n    margin-left: 10px;\r\n}\r\n\r\n.calendar {\r\n    text-align: center;\r\n    width: 100%;\r\n    margin: 30px;\r\n    border: 3px #003F63 solid;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.calendar-monthbar {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    border-bottom: 2px #003F63 solid;\r\n    align-items: center;\r\n}\r\n\r\n.calendar-monthbar > button{\r\n    height: 30px;\r\n    width: 100px;\r\n}\r\n\r\n.calendar-days-week {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n}\r\n\r\n.calendar-day-names {\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    max-height: 50px;\r\n}\r\n\r\n.calendar-day-name {\r\n    width: 14.2857%;\r\n}\r\n\r\n.calendar-days-day {\r\n    border: 1px black solid;\r\n    width: 14.2857%;\r\n}\r\n\r\n.calendar-day-container {\r\n    margin: 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n}\r\n\r\n.calendar-day-container > div {\r\n    flex: 1;\r\n}\r\n\r\n.calendar-days {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.calendar-days-week {\r\n    flex: 1 0 auto;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}