	function getVal(id) {
		return "&" + id + "=" + encodeURIComponent($("#" + id).val());
	}
	
	function checkVal(id) {
		return $("#"+id).val().length > 0;
	}
	
	function addStudent() {	
		//Проверяем обязательные поля на заполненность
		//Отчество не проверяем, его может не быть
		if (!checkVal("surname")) {alert("Укажите фамилию"); return;}
		if (!checkVal("name")) {alert("Укажите имя"); return;}
		if (!checkVal("birthday")) {alert("Укажите дату рождения"); return;}
		if (!checkVal("group")) {alert("Укажите группу"); return;}
		
		//Формируем запрос
		let url = "server.php?mode=add" +
			getVal("surname") +
			getVal("name") +
			getVal("patronymic") +
			getVal("birthday") +
			getVal("group");
			
		$.get(url, function(data, status) {
			//Если сервер вернул ответ "added", то запись добавлена, чистим поля
			if (data == "added") {
				alert("Запись успешно добавлена");
				$("#surname").val("");
				$("#name").val("");
				$("#patronymic").val("");
				$("#birthday").val("");
				$("#group").val("");
			} else {
				alert("Ошибка сервера");
			}
		});
	}

	function removeStudent() {
		if (!checkVal("removeid")) {alert("Укажите ID удаляемого студента"); return;}

		let url = "server.php?mode=remove" + getVal("removeid");

		$.get(url, function(data, status) {
			if (data == "removed") {
				alert("Запись успешно удалена");
				$("#removeid").val("");
			} else {
				if (data == "notfound") {
					alert("Запись с таким ID не найдена");
				} else {
					alert("Ошибка сервера");
				}
			}
		});
	}

	function showStudents() {
		let url = "server.php?mode=show";

		$.get(url, function(data, status) {
			$("#list").html(data);
		});
	}