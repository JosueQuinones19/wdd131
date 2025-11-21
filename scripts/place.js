const currentYearSpan = document.querySelector("#currentyear");
const lastModifiedSpan = document.querySelector("#lastmodified");

const now = new Date();
currentYearSpan.textContent = now.getFullYear();
lastModifiedSpan.textContent = document.lastModified;

const temperatureC = 8;   // °C
const windSpeedKmh = 18;  // km/h

const windChillSpan = document.querySelector("#windchill");

function calculateWindChill(t, v) {
  return (
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(v, 0.16) +
    0.3965 * t * Math.pow(v, 0.16)
  ).toFixed(1);
}

if (temperatureC <= 10 && windSpeedKmh > 4.8) {
  const chill = calculateWindChill(temperatureC, windSpeedKmh);
  windChillSpan.textContent = `${chill} °C`;
} else {
  windChillSpan.textContent = "N/A";
}
