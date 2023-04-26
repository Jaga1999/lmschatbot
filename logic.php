<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lms_chatbot";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// Check if a question was provided
if (isset($_GET["q"])) {
    $q = $_GET["q"];
    $response = "";
    if ($q != "") {
      // prepare query using prepared statement
      $search = "%$q%";
      $stmt = mysqli_prepare($conn, "SELECT answer FROM faq WHERE question LIKE ?");
      mysqli_stmt_bind_param($stmt, "s", $search);
  
      // execute query
      mysqli_stmt_execute($stmt);
      $result = mysqli_stmt_get_result($stmt);
  
      if (mysqli_num_rows($result) > 0) {
        // fetch answer from database
        $row = mysqli_fetch_assoc($result);
        $response = $row['answer'];
      } else {
        $noresponse = "Sorry, I'm still learning. Hence my responses are limited. Ask something else.";
        $response = $noresponse;
      }
      mysqli_stmt_close($stmt);
    }
  
    echo $response;
  }
  

// close database connection
mysqli_close($conn);
?>
