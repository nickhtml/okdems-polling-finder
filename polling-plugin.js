{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener("DOMContentLoaded", function () \{\
\
  const container = document.getElementById("okdems-polling-finder");\
\
  container.innerHTML = `\
    <h2>Find Your Polling Place</h2>\
\
    <input id="address" placeholder="Enter your home address" style="width:100%;padding:12px;margin-bottom:10px;" />\
\
    <button id="find-btn" style="width:100%;padding:12px;background:#1e3a8a;color:white;border:none;">\
      Find My Polling Place\
    </button>\
\
    <div id="result" style="margin-top:15px;"></div>\
  `;\
\
  document.getElementById("find-btn").onclick = async function () \{\
\
    const address = document.getElementById("address").value;\
\
    document.getElementById("result").innerHTML = "Searching...";\
\
    const response = await fetch(\
      "https://www.googleapis.com/civicinfo/v2/voterinfo?address="\
      + encodeURIComponent(address)\
      + "&electionId=2000&key=AIzaSyBhoOyE366yZgC97rR6IRgu4C7WdSzOqmI"\
    );\
\
    const data = await response.json();\
\
    if (data.pollingLocations && data.pollingLocations.length > 0) \{\
\
      const place = data.pollingLocations[0].address;\
\
      document.getElementById("result").innerHTML =\
        "<strong>" + (place.locationName || "") + "</strong><br>" +\
        place.line1 + "<br>" +\
        place.city + ", " + place.state + " " + place.zip;\
\
    \} else \{\
\
      document.getElementById("result").innerHTML =\
        "No polling place found.";\
\
    \}\
\
  \};\
\
\});\
}