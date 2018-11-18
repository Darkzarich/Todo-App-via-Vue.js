<?php 
	$lifetime=8000000;
	session_set_cookie_params($lifetime);
	session_start();
	setcookie(session_name(),session_id(),time()+$lifetime); 

	switch ($_GET['action']) {
		case 'get':
			echo json_encode($_SESSION['todos']);
			break;
		case 'save':
			$_POST = json_decode(file_get_contents('php://input'), true);
			$_SESSION['todos'] = $_POST['todos'];
	}
 ?>