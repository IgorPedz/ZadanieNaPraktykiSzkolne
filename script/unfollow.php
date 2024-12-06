<?php
// Nagłówki odpowiedzi
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
// Sprawdź, czy metoda to POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Połączenie z bazą danych (używając PDO)
    $host = 'localhost'; // Adres bazy danych
    $dbname = 'socialmedia'; // Nazwa bazy danych
    $username = 'root'; // Nazwa użytkownika bazy
    $password = ''; // Hasło użytkownika bazy

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Błąd połączenia z bazą danych: ' . $e->getMessage()]);
        exit();
    }

    // Odczytaj dane z ciała zapytania
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->followerId) && isset($data->followedId)) {

        $followerId = $data->followerId;
        $followedId = $data->followedId;

        try {
            // Usunięcie obserwacji
            $deleteQuery = "DELETE FROM obserwujacy WHERE ID_obserwowanego = :followerId AND ID_obserwujacego = :followedId";
            $stmt = $pdo->prepare($deleteQuery);
            $stmt->execute(['followerId' => $followerId, 'followedId' => $followedId]);

            // Zwróć sukces
            echo json_encode(['message' => 'Obserwowanie zostało usunięte.']);
        } catch (PDOException $e) {
            // Błąd wykonania zapytania
            echo json_encode(['error' => 'Błąd podczas próby usunięcia obserwacji: ' . $e->getMessage()]);
        }

    } else {
        // Brak wymaganych parametrów
        echo json_encode(['error' => 'Brak wymaganych parametrów: followerId, followedId']);
    }

} else {
    // Niepoprawna metoda zapytania
    echo json_encode(['error' => 'Niepoprawna metoda zapytania.']);
}
?>