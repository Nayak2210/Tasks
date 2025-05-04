const tempInput = document.getElementById("tempInput");
const unitSelect = document.getElementById("unitSelect");
const resultC = document.getElementById("resultC");
const resultF = document.getElementById("resultF");
const resultK = document.getElementById("resultK");
const error = document.getElementById("error");
const toggleMode = document.getElementById("toggleMode");

function convertTemperature() {
  const value = parseFloat(tempInput.value);
  const unit = unitSelect.value;

  // Reset results and error
  resultC.textContent = resultF.textContent = resultK.textContent = '';
  error.textContent = '';

  // Input validation
  if (!tempInput.value || unit === "") {
    return;
  }

  if (isNaN(value)) {
    error.textContent = "⚠️ Enter a valid number.";
    return;
  }

  let celsius, fahrenheit, kelvin;

  if (unit === "C") {
    celsius = value;
    fahrenheit = (value * 9) / 5 + 32;
    kelvin = value + 273.15;
  } else if (unit === "F") {
    celsius = ((value - 32) * 5) / 9;
    fahrenheit = value;
    kelvin = celsius + 273.15;
  } else if (unit === "K") {
    celsius = value - 273.15;
    fahrenheit = (celsius * 9) / 5 + 32;
    kelvin = value;
  } else {
    error.textContent = "⚠️ Please select a valid unit.";
    return;
  }

  resultC.textContent = `🌡️ Celsius: ${celsius.toFixed(2)} °C`;
  resultF.textContent = `🔥 Fahrenheit: ${fahrenheit.toFixed(2)} °F`;
  resultK.textContent = `❄️ Kelvin: ${kelvin.toFixed(2)} K`;
}

function updateToggleText() {
  if (document.body.classList.contains("dark")) {
    toggleMode.textContent = "Switch to Light Mode";
  } else {
    toggleMode.textContent = "Switch to Dark Mode";
  }
}

tempInput.addEventListener("input", convertTemperature);
unitSelect.addEventListener("change", convertTemperature);

toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateToggleText();
});

// Optional: Initialize mode text on load
updateToggleText();
