/**
 * Fetching DOM elements
 */

const password = document.querySelector(".password");
const copyBtn = document.querySelector(".fa-copy");
const range = document.getElementById("range-value");
const lower = document.querySelector(".lower");
const upper = document.querySelector(".upper");
const number = document.querySelector(".number");
const symbol = document.querySelector(".symbol");
const generateBtn = document.querySelector(".generate-btn");

/**
 * Range slide function
 */

function rangeSlide(value) {
  range.innerText = value;
}

/**
 * Object which contain all password funtions
 */
const allPasswordFunction = {
  lower: randomLowerLetters,
  upper: randomUpperLetters,
  number: randomNumber,
  symbol: randomSymbol,
};

/**
 * Password functions
 */

function randomLowerLetters() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUpperLetters() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}
function randomSymbol() {
  const symbols = "!@#$%^&*(){}[];'<>,./";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

/**
 * Listener on generate button
 */
generateBtn.addEventListener("click", () => {
  const length = +range.innerText;
  const hasLowerCase = lower.checked;
  const hasUpperCase = upper.checked;
  const hasNumber = number.checked;
  const hasSymbol = symbol.checked;

  password.innerText = generatePassword(
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSymbol,
    length
  );
});

/**
 * Copy password
 */
copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const pass = password.innerText;

  if (!pass) return;

  textarea.value = pass;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("password copied to clipboard!");
});

/**
 * Generate password funtion
 */
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += allPasswordFunction[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
