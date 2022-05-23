<?php
	if (isset($_GET['mode'])) {
		$host = 'androidel.org';
		$db = 'u0697169_task2db';
		$user = 'u0697169_task2';
		$pass = 'task2password';
		
		$db = new mysqli($host, $user, $pass, $db);
		$db -> set_charset('utf8mb4');
		if ($db -> connect_error) { die("-1"); }
		
		function get($name, $default) {
			if (isset($_GET[$name])) {
				return urldecode($_GET[$name]);
			} else {
				return $default;
			}
		}
		
		if ($_GET['mode'] == 'add') {
			$surname = get('surname', null);
			$name = get('name', null);
			$patronymic = get('patronymic', '');
			$birthday = get('birthday', null);
			$group = get('group', null);
			
			if ($surname == null || $name == null || $birthday == null || $group == null) {
				exit('error');
			}
			
			$sql = 	"INSERT INTO students (surname, name, patronymic, birthday, studentgroup) VALUES ('".$surname."', '".$name."', '".$patronymic."', '".$birthday."', '".$group."')";
			$result = $db -> query($sql);
			if ($result == true) {
				exit('added');
			} else {
				exit('error');
			}
		}

		if ($_GET['mode'] == 'remove') {
			$removeid = get('removeid', null);

			if ($removeid == null) {
				exit('error');
			}

			$sql = "SELECT ID FROM students WHERE ID = '".$removeid."'";
			$result = $db -> query($sql);
			if (($result -> num_rows) > 0) {
				$sql = "DELETE FROM students WHERE ID = '".$removeid."'";
				$result = $db -> query($sql);
				if ($result == true) {
					exit('removed');
				} else {
					exit('error');
				}
			} else {
				exit('notfound');
			}
		}
	}
?>