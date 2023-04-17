// content.js

function filterCurrPage(currPageUrl) {

  if (currPageUrl.startsWith("https://www.amctheatres.com/")) {

    // "Premium" showtimes are things like IMAX, Dolby Cinema, etc. Sometimes even "standard" showings are excluded from A-List
    let movieShowtimeObjs = document.querySelectorAll(".Showtimes-Section.Showtimes-Section--PremiumFormat.Showtimes-Section-First, .Showtimes-Section.Showtimes-Section--StandardFormat");

    console.log("Checking across " + movieShowtimeObjs.length + " showings");

    for (let i = 0; i < movieShowtimeObjs.length; i++) {

      // Each showtime has restrictions/features. These are things like: "Closed Caption", "AMC Signature Recliners", "Audio Description".
      // It is in these features/restrictions where we look for the "Excluded from A-List" label.
      let showtimeRestrictions = movieShowtimeObjs[i].childNodes[1].childNodes;

      for (let j = 0; j < showtimeRestrictions.length; j++) {

        if (showtimeRestrictions[j].innerText.startsWith("Excluded")) {

          // Hide the buttons for each timeslot, if that showtime/event if excluded from A-List

          let showtimeTimeBtns = movieShowtimeObjs[i].childNodes[2].childNodes;

          for (let k = 0; k < showtimeTimeBtns.length; k++) {

            showtimeTimeBtns[k].childNodes[0].childNodes[0].childNodes[0].className = "Btn Btn--default disabled";
          }
        }
      }
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // Noticed an issue with Chrome where it reports that the page has finished loading before the DOM is actually ready.
  // This is a problem because it means the  parsing function above won't be able to find any elements to filter.
  // As a hack, the code below waits 1000ms before calling the parsing code to give time for the DOM to load.
  // Another reported issue here: https://stackoverflow.com/questions/70571871/chrome-extension-tabs-onupdated-with-status-complete-works-too-early
  setTimeout(function() {
    console.log("Page updated: " + request.data.url);
    filterCurrPage(request.data.url) 
  }, 1000);

});

// Only called the very first time the page loads
filterCurrPage(location.href);