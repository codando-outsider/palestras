// Build HTML fetching info from cardInfo.js
function generateEvent(container, title, description, date, eventLink, recordingLink) {
	var cardDiv = document.createElement("div");
	cardDiv.classList.add("card");

	var hiddenDate = document.createElement("input");
	hiddenDate.setAttribute("type", "hidden");
	hiddenDate.setAttribute("value", date);
	cardDiv.appendChild(hiddenDate);

	var dateDiv = document.createElement("div");
	dateDiv.classList.add("card-element-date");
	var dateHighlightDiv = document.createElement("div");
	dateHighlightDiv.classList.add("card-element-text-highlight");
	dateHighlightDiv.textContent = date.split("-")[2];
	var dateTextDiv = document.createElement("div");
	dateTextDiv.classList.add("card-element-text");
	dateTextDiv.textContent = date.split("-")[1];
	dateDiv.appendChild(dateHighlightDiv);
	dateDiv.appendChild(dateTextDiv);

	var blockWrapper = document.createElement("div");
	blockWrapper.classList.add("card-block-wrapper");

	var animRight = document.createElement("span");
	animRight.classList.add("animRight")
	var animDown = document.createElement("span");
	animDown.classList.add("animDown")
	var animLeft = document.createElement("span");
	animLeft.classList.add("animLeft")
	var animUp = document.createElement("span");
	animUp.classList.add("animUp")
	blockWrapper.appendChild(animRight);
	blockWrapper.appendChild(animDown);
	blockWrapper.appendChild(animLeft);
	blockWrapper.appendChild(animUp);

	var blockPrimary = document.createElement("div");
	blockPrimary.classList.add("card-block", "card-block-primary");
	var titleHeading = document.createElement("h3");
	titleHeading.classList.add("card-title");
	titleHeading.textContent = title;
	var subtitlePara = document.createElement("p");
	subtitlePara.classList.add("card-subtitle");
	subtitlePara.textContent = description;
	blockPrimary.appendChild(titleHeading);
	blockPrimary.appendChild(subtitlePara);

	var blockSecondary = document.createElement("div");
	blockSecondary.classList.add("card-block", "card-block-secondary");

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

	var dateNumber = document.getElementsByClassName("card-element-text-highlight");
	var dateMonth = document.getElementsByClassName("card-element-text");
	var linkButton = document.createElement("a");
	var eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	var currentDate = new Date().setUTCHours(0, 0, 0, 0);

	if (eventDate >= currentDate) {
		dateNumber.textContent = "HOJE!";
		dateMonth.style.display = "none;";
		linkButton.classList.add("card-button", "button-event");
		linkButton.href = eventLink;
		linkButton.textContent = "Acessar";
	} else {
		linkButton.classList.add("card-button", "button-recording");
		linkButton.href = recordingLink;
		linkButton.textContent = "Gravação";
	}

	blockSecondary.appendChild(portrait);
	blockSecondary.appendChild(linkButton);

	blockWrapper.appendChild(blockPrimary);
	blockWrapper.appendChild(blockSecondary);

	if (eventDate < currentDate) {
		cardDiv.classList.add("finished-event");
	} else if (eventDate === currentDate) {
		blockWrapper.classList.add("current-event");
	}

	cardDiv.appendChild(dateDiv);
	cardDiv.appendChild(blockWrapper);

	insertEventInOrder(container, cardDiv, eventDate);
}

// Order events chronologically
function insertEventInOrder(container, newEvent) {
	var events = container.querySelectorAll(".card");

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
