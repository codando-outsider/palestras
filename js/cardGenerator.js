// Build HTML fetching info from cardInfo.js
function generateEvent(container, title, description, date, eventLink, recordingLink) {
	var cardDiv = document.createElement("div");
	cardDiv.classList.add("card-section");

	var hiddenDate = document.createElement("input");
	hiddenDate.setAttribute("type", "hidden");
	hiddenDate.setAttribute("value", date);
	cardDiv.appendChild(hiddenDate);

	var cardDate = document.createElement("div");
	cardDate.classList.add("card-date");
	var dateDay = document.createElement("div");
	dateDay.classList.add("day");
	dateDay.textContent = date.split("-")[2];
	var dateMonth = document.createElement("div");
	dateMonth.classList.add("month");
	dateMonth.textContent = date.split("-")[1];
	cardDate.appendChild(dateDay);
	cardDate.appendChild(dateMonth);

	var cardMain = document.createElement("div");
	cardMain.classList.add("card-main");

	var animRight = document.createElement("span");
	animRight.classList.add("animRight")
	var animDown = document.createElement("span");
	animDown.classList.add("animDown")
	var animLeft = document.createElement("span");
	animLeft.classList.add("animLeft")
	var animUp = document.createElement("span");
	animUp.classList.add("animUp")
	cardMain.appendChild(animRight);
	cardMain.appendChild(animDown);
	cardMain.appendChild(animLeft);
	cardMain.appendChild(animUp);

	var cardInfo = document.createElement("div");
	cardInfo.classList.add("card", "card-main");
	var cardTitle = document.createElement("h3");
	cardTitle.classList.add("card-title");
	cardTitle.textContent = title;
	var cardSubtitle = document.createElement("p");
	cardSubtitle.classList.add("card-subtitle");
	cardSubtitle.textContent = description;
	cardInfo.appendChild(cardTitle);
	cardInfo.appendChild(cardSubtitle);

	var cardAside = document.createElement("div");
	cardAside.classList.add("card", "card-aside");

	var portrait = document.createElement("div");
	portrait.classList.add("portrait");

	// Normalize vowels
	function removeDiacritics(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	// Set portrait image path by matching file with lecturer's name and surname
	var lecturerName = description.split(/[ ,]/).slice(0, 2).join("_");
	lecturerName = removeDiacritics(lecturerName).toLowerCase();
	var portraitSrc = ("url(img/portrait/") + lecturerName + (".jpeg");
	portrait.style.backgroundImage = portraitSrc;

//	var dateNumber = document.getElementsByClassName("day");
//	var dateMonth = document.getElementsByClassName("month");
	var linkButton = document.createElement("a");
	var eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	var currentDate = new Date().setUTCHours(0, 0, 0, 0);

	if (eventDate >= currentDate) {
//		dateNumber.textContent = "HOJE!";
//		dateMonth.style.display = "none";
		linkButton.classList.add("card-button", "button-event");
		linkButton.href = eventLink;
		linkButton.textContent = "Acessar";
	} else {
		linkButton.classList.add("card-button", "button-recording");
		linkButton.href = recordingLink;
		linkButton.textContent = "Gravação";
	}

	cardAside.appendChild(portrait);
	cardAside.appendChild(linkButton);

	cardMain.appendChild(cardInfo);
	cardMain.appendChild(cardAside);

	if (eventDate < currentDate) {
		cardDiv.classList.add("finished-event");
	} else if (eventDate === currentDate) {
		cardMain.classList.add("current-event");
	}

	cardDiv.appendChild(cardDate);
	cardDiv.appendChild(cardMain);

	insertEventInOrder(container, cardDiv, eventDate);
}

// Order events chronologically
function insertEventInOrder(container, newEvent) {
	var events = container.querySelectorAll(".card-section");

	if (events.length === 0) {
		container.appendChild(newEvent);
		return;
	}

	var newEventDate = new Date(newEvent.querySelector("input[type='hidden']").value);

	for (var i = events.length - 1; i >= 0; i--) {
		var currentEvent = events[i];
		var currentEventDate = new Date(currentEvent.querySelector("input[type='hidden']").value);

		if (newEventDate < currentEventDate) {
			container.insertBefore(newEvent, currentEvent.nextSibling);
			return;
		}
	}

	container.insertBefore(newEvent, container.firstChild);
}
