document.addEventListener("DOMContentLoaded", () => {
  console.log("registrate.js geladen");

  document.getElementById('RegistrationButton').addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("Verzendpoging gestart");

    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      displayName: document.getElementById('displayName').value,
      country: document.getElementById('country').value,
      newsLetter: document.getElementById('newsLetter').checked,
      agreeWithTOS: document.getElementById('agreeWithTOS').checked
    };

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Fout bij registreren:", error);
    }
  });
});