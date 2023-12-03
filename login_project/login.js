// Pobranie referencji do formularza logowania, przycisku logowania i wiadomości o błędzie
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// Dodanie nasłuchiwacza zdarzeń dla przycisku logowania
loginButton.addEventListener("click", (e) => {
    // Zapobieganie domyślnej akcji przycisku (przesłanie formularza)
    e.preventDefault();

    // Pobranie wartości z pól nazwy użytkownika i hasła
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Sprawdzenie, czy oba pola są puste
    if (username === "" && password === "") {
        // Wyświetlenie alertu o pomyślnym zalogowaniu
        alert("You have successfully logged in.");
        
        // Przeładowanie strony
        location.reload();
    } else {
        // Wyświetlenie wiadomości o błędzie logowania przez zmianę przezroczystości
        loginErrorMsg.style.opacity = 1;
    }
})
