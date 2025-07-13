<?php
// review.php
require_once 'db_config.php';

// Get database connection
$pdo = getConnection();

// Fetch reviews
$reviews = [];
try {
    $stmt = $pdo->query("SELECT name, rating, project_link, delivery, service, message FROM reviews ORDER BY created_at DESC");
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    error_log("Error fetching reviews: " . $e->getMessage());
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $rating = (int)$_POST['rating'];
    $project_link = !empty($_POST['project_link']) ? filter_var(trim($_POST['project_link']), FILTER_SANITIZE_URL) : null;
    $delivery = $_POST['delivery'];
    $service = filter_var(trim($_POST['service']), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Validate inputs
    if (empty($name) || $rating < 1 || $rating > 5 || !in_array($delivery, ['before', 'on-time', 'little-late', 'late']) || empty($service) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        exit;
    }

    try {
        // Insert review
        $stmt = $pdo->prepare("INSERT INTO reviews (name, rating, project_link, delivery, service, message) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $rating, $project_link, $delivery, $service, $message]);

        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        error_log("Error inserting review: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Submit a Review - ASK WebSolutions</title>
  <link rel="icon" type="image/x-icon" href="images\favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #2c3e50, #121212);
      color: #f8f9fa;
      transition: background-color 0.4s ease, color 0.4s ease;
      padding: 20px;
    }
    .light-theme body {
      background: linear-gradient(135deg, #f0f2f5, #d6d8db);
      color: #343a40;
    }
    .review-container {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 50px 40px;
      width: 800px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: inherit;
      position: relative;
    }
    .light-theme .review-container {
      background: rgba(255,255,255,0.7);
      color: #343a40;
    }
    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 2rem;
      font-weight: 700;
    }
    .form-row {
      display: flex;
      gap: 15px;
      width: 100%;
    }
    .input-group {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    label {
      margin-top: 8px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    input, select, textarea {
      padding: 12px 15px;
      border-radius: 10px;
      border: 1px solid #555;
      background-color: rgba(44, 47, 51, 0.8);
      color: #f8f9fa;
      font-size: 1rem;
    }
    .light-theme input,
    .light-theme select,
    .light-theme textarea {
      background-color: #f8f9fa;
      border-color: #ccc;
      color: #343a40;
    }
    input::placeholder,
    select::placeholder,
    textarea::placeholder {
      color: #adb5bd;
    }
    .light-theme input::placeholder,
    .light-theme select::placeholder,
    .light-theme textarea::placeholder {
      color: #6c757d;
    }
    textarea {
      resize: none;
      height: 100px;
    }
    .submit-btn {
      margin-top: 20px;
      width: 100%;
      padding: 14px;
      font-weight: 700;
      font-size: 1.1rem;
      border: none;
      border-radius: 30px;
      background: linear-gradient(90deg, #007bff, #6610f2);
      color: white;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(102, 16, 242, 0.6);
    }
    #theme-toggle {
      position: absolute;
      top: 15px;
      right: 20px;
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 30px;
      padding: 8px 16px;
      color: #f8f9fa;
      font-weight: 700;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .light-theme #theme-toggle {
      background: rgba(0,0,0,0.1);
      color: #343a40;
    }
    .review-list {
      margin-top: 40px;
    }
    .review-card {
      background: rgba(255,255,255,0.1);
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .light-theme .review-card {
      background: rgba(255,255,255,0.7);
      color: #343a40;
    }
    .review-card h5 {
      margin: 0 0 10px;
      font-weight: 600;
      font-size: 1.25rem;
    }
    .review-card p {
      margin: 5px 0;
      font-size: 0.95rem;
    }
    .star-rating {
      color: #ffc107;
      font-size: 1.1rem;
    }
    .review-card a {
      color: #007bff;
      text-decoration: none;
    }
    .review-card a:hover {
      text-decoration: underline;
    }
    @media (max-width: 480px) {
      .review-container {
        width: 100%;
        padding: 40px 25px;
      }
      .form-row {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="review-container">
    <button id="theme-toggle">Light Mode</button>
    <h2>Submit Your Review</h2>
    <form id="review-form">
      <div class="form-row">
        <div class="input-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required />
        </div>
        <div class="input-group">
          <label for="rating">Review Rating</label>
          <select id="rating" name="rating" required>
            <option value="">-- Select rating --</option>
            <option value="5">★★★★★ (5 Stars)</option>
            <option value="4">★★★★☆ (4 Stars)</option>
            <option value="3">★★★☆☆ (3 Stars)</option>
            <option value="2">★★☆☆☆ (2 Stars)</option>
            <option value="1">★☆☆☆☆ (1 Star)</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="input-group">
          <label for="project-link">Project Link (Optional)</label>
          <input type="url" id="project-link" name="project_link" placeholder="https://example.com" />
        </div>
        <div class="input-group">
          <label for="delivery">Project Delivery</label>
          <select id="delivery" name="delivery" required>
            <option value="">-- Select delivery status --</option>
            <option value="before">Before Time</option>
            <option value="on-time">On Time</option>
            <option value="little-late">A Little Late</option>
            <option value="late">Late Delivery</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="input-group" style="width: 100%;">
          <label for="service">Service</label>
          <select id="service" name="service" required>
            <option value="">-- Choose Service --</option>
            <option value="web">Web Design & Development</option>
            <option value="frontend">Front-End Development</option>
            <option value="backend">Back-End Development</option>
            <option value="fullstack">Full Stack Development</option>
            <option value="seo">SEO Optimization</option>
            <option value="smm">Social Media Marketing</option>
            <option value="graphic">Graphic Designing</option>
            <option value="uiux">UI/UX Design</option>
            <option value="branding">Branding & Logo Design</option>
            <option value="content">Content Writing</option>
            <option value="app">Mobile App Development</option>
            <option value="ecommerce">E-Commerce Solutions</option>
            <option value="wordpress">WordPress Development</option>
            <option value="customcms">Custom CMS Development</option>
            <option value="software">Custom Software Development</option>
            <option value="database">Database Management</option>
            <option value="cloud">Cloud Services</option>
            <option value="hosting">Web Hosting & Domain Services</option>
            <option value="email">Email Marketing</option>
            <option value="cyber">Cybersecurity Services</option>
            <option value="support">Technical Support</option>
            <option value="consulting">IT Consulting</option>
            <option value="training">IT Training & Workshops</option>
            <option value="others">Other</option>
          </select>
        </div>
      </div>

      <div class="input-group" style="width: 100%;">
        <label for="message">Your Review</label>
        <textarea id="message" name="message" placeholder="Share your experience..." required></textarea>
      </div>

      <button type="submit" class="submit-btn">Submit Review</button>
    </form>

    <div class="review-list" id="review-list">
      <?php foreach ($reviews as $review): ?>
        <div class="review-card">
          <h5><?php echo htmlspecialchars($review['name']); ?></h5>
          <p class="star-rating"><?php echo str_repeat('★', $review['rating']) . str_repeat('☆', 5 - $review['rating']); ?></p>
          <p><strong>Service:</strong> <?php echo htmlspecialchars(str_replace('-', ' ', $review['service'])); ?></p>
          <?php if (!empty($review['project_link'])): ?>
            <p><a href="<?php echo htmlspecialchars($review['project_link']); ?>" target="_blank">View Project</a></p>
          <?php endif; ?>
          <p><strong>Delivery:</strong> <?php echo htmlspecialchars(str_replace('-', ' ', $review['delivery'])); ?></p>
          <p><?php echo htmlspecialchars($review['message']); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script>
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const reviewForm = document.getElementById('review-form');

    function updateThemeButton() {
      themeToggleBtn.textContent = body.classList.contains('light-theme') ? 'Dark Mode' : 'Light Mode';
    }

    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      updateThemeButton();
    });

    updateThemeButton();

    // Handle form submission
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(reviewForm);

      fetch('', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Review submitted successfully!');
          reviewForm.reset();
          location.reload(); // Reload to show new review
        } else {
          alert(data.message || 'Failed to submit review.');
        }
      })
      .catch(error => {
        alert('Error: ' + error);
      });
    });
  </script>
</body>
</html>
