<?php
session_start();
require_once 'db_config.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        exit;
    }

    $pdo = getConnection();

    // Sanitize input
    $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $rating = (int)($_POST['rating'] ?? 0);
    $review = htmlspecialchars(trim($_POST['review'] ?? ''), ENT_QUOTES, 'UTF-8');

    // Validate required fields
    if (empty($name) || empty($email) || empty($review) || $rating < 1 || $rating > 5) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required and rating must be between 1-5']);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address']);
        exit;
    }

    // Get user_id if logged in
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

    // Insert into database
    $sql = "INSERT INTO reviews (user_id, name, email, rating, review, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?)";
    $stmt = $pdo->prepare($sql);
    
    if ($stmt) {
        $created_at = date('Y-m-d H:i:s');
        $stmt->execute([$user_id, $name, $email, $rating, $review, $created_at]);
        
        echo json_encode([
            'status' => 'success', 
            'message' => 'Review submitted successfully! It will be published after approval.'
        ]);
    } else {
        throw new Exception("Failed to prepare statement");
    }

} catch (Exception $e) {
    error_log("Review submission error: " . $e->getMessage());
    echo json_encode([
        'status' => 'error', 
        'message' => 'Something went wrong. Please try again later.'
    ]);
}
?>
