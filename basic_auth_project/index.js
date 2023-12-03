// Import modułu express, który umożliwia obsługę aplikacji webowej w Node.js
const express = require("express");
// Import modułu path, który pomaga w obsłudze ścieżek plików
var path = require('path');

// Utworzenie instancji aplikacji express
const app = express();

// Autentykacja klienta przy użyciu HTTP Basic Authentication
function authentication(req, res, next) {
    // Pobranie nagłówka "Authorization" z żądania HTTP
    var authheader = req.headers.authorization;
    console.log(req.headers);

    // Sprawdzenie, czy nagłówek "Authorization" został przesłany
    if (!authheader) {
        // Jeśli nie, utworzenie błędu i zwrócenie komunikatu o braku autentykacji
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

    // Dekodowanie danych uwierzytelniających z nagłówka "Authorization"
    var auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    // Sprawdzenie, czy użytkownik i hasło są puste
    if (user == '' && pass == '') {
        // Jeśli użytkownik i hasło są puste, przechodź do kolejnego middleware
        next();
    } else {
        // Jeśli użytkownik i/lub hasło są niepuste, utworzenie błędu i zwrócenie komunikatu o braku autentykacji
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}

// Ustawienie middleware autentykacji
app.use(authentication)

// Obsługa plików statycznych z katalogu 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Konfiguracja serwera, który słucha na porcie 3000
app.listen(3000, () => {
    console.log("Server is Running");
})

