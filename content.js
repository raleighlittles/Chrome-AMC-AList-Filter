// content.js

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

  let currTabUrl = tabs[0].url;

  if (currTabUrl.startswith("https://www.amctheaters.com/movies/")) {

    // let premiumShowtimeObj = document.getElementsByClassName("Showtimes-Section Showtimes-Section--PremiumFormat Showtimes-Section-First");
    // let standardShowtimeObj = document.getElementsByClassName("Showtimes-Section Showtimes-Section--StandardFormat");

    // "Premium" showtimes are things like IMAX, Dolby Cinema, etc. Sometimes even "standard" showings are excluded from A-List
    let movieShowtimeObjs = document.querySelectorAll(".Showtimes-Section.Showtimes-Section--PremiumFormat.Showtimes-Section-First, .Showtimes-Section.Showtimes-Section--StandardFormat");

    for (let i = 0; i < movieShowtimeObjs.length; i++) {

      // Each showtime has restrictions/features. These are things like: "Closed Caption", "AMC Signature Recliners", "Audio Description".
      // It is in these features/restrictions where we look for the "Excluded from A-List" label.
      let showtimeRestrictions = movieShowtimeObjs[i].childNodes[1].childNodes;

      for (let j = 0; j < showtimeRestrictions.length; j++) {

        if (showtimeRestrictions[j].innerText.startswith("Excluded")){
          console.log("Showing is excluded!");

          // Hide the buttons for each timeslot, if that showtime/event if excluded from A-List

          let showtimeTimeBtns = movieShowtimeObjs[i].childNodes[2].childNodes[0].childNodes[0].childNodes;

          for (let k = 0; k < showtimeTimeBtns.length; k++) {
            showtimeTimeBtns[k].class = "Btn Btn--default disabled";
          }
        }
      }
    }
  }

});