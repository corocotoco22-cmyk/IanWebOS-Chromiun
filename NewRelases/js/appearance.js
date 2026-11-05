// Appearance

const accentOptions = document.querySelectorAll(".accent-option");

const themeSelect = document.getElementById("themeSelect");

const cornersSelect = document.getElementById("cornersSelect");

const buttonsSelect = document.getElementById("buttonsSelect");

const transparencySlider = document.getElementById("transparencySlider");

const desktopTextToggle = document.getElementById("desktopTextToggle");

const desktopTextInput = document.getElementById("desktopTextInput");

const desktopTitle = document.getElementById("desktopTitle");

// Accent color

function setAccent(color) {
	document.documentElement.style.setProperty("--accent", color);

	accentOptions.forEach(function (option) {
		option.classList.remove("selected");

		if (option.dataset.color === color) {
			option.classList.add("selected");
		}
	});
}

setAccent(localStorage.getItem("IanWebOS-accent") || "#2196F3");

accentOptions.forEach(function (option) {
	option.addEventListener("click", function () {
		setAccent(option.dataset.color);

		localStorage.setItem("IanWebOS-accent", option.dataset.color);
	});
});

// Theme, corners and buttons

function updateAppearance() {
	const root = document.documentElement;

	if (themeSelect.value === "light") {
		root.classList.add("light-mode");
	} else {
		root.classList.remove("light-mode");
	}

	if (cornersSelect.value === "square") {
		root.classList.add("square-corners");
	} else {
		root.classList.remove("square-corners");
	}

	if (buttonsSelect.value === "mac") {
		root.classList.add("mac-buttons");
	} else {
		root.classList.remove("mac-buttons");
	}
}

themeSelect.value = localStorage.getItem("IanWebOS-theme") || "dark";

cornersSelect.value = localStorage.getItem("IanWebOS-corners") || "rounded";

buttonsSelect.value = localStorage.getItem("IanWebOS-buttons") || "windows";

updateAppearance();

themeSelect.addEventListener("change", function () {
	localStorage.setItem("IanWebOS-theme", themeSelect.value);

	updateAppearance();
});

cornersSelect.addEventListener("change", function () {
	localStorage.setItem("IanWebOS-corners", cornersSelect.value);

	updateAppearance();
});

buttonsSelect.addEventListener("change", function () {
	localStorage.setItem("IanWebOS-buttons", buttonsSelect.value);

	updateAppearance();
});

// Transparency

function updateTransparency() {
	// 0 = solid, 100 = very transparent

	document.documentElement.style.setProperty(
		"--glass",
		1 - (transparencySlider.value / 100) * 0.6
	);
}

transparencySlider.value = localStorage.getItem("IanWebOS-transparency") || 20;

updateTransparency();

transparencySlider.addEventListener("input", function () {
	localStorage.setItem("IanWebOS-transparency", transparencySlider.value);

	updateTransparency();
});

// Desktop text

function updateDesktopText() {
	desktopTitle.hidden = !desktopTextToggle.checked;

	desktopTitle.textContent = desktopTextInput.value || "IanWebOS";
}

desktopTextToggle.checked = localStorage.getItem("IanWebOS-desktop-text-show") !== "off";

desktopTextInput.value = localStorage.getItem("IanWebOS-desktop-text") || "IanWebOS";

updateDesktopText();

desktopTextToggle.addEventListener("change", function () {
	localStorage.setItem("IanWebOS-desktop-text-show", desktopTextToggle.checked ? "on" : "off");

	updateDesktopText();
});

desktopTextInput.addEventListener("input", function () {
	localStorage.setItem("IanWebOS-desktop-text", desktopTextInput.value);

	updateDesktopText();
});

// Taskbar size

const taskbar = document.querySelector(".taskbar");

const taskbarAutoToggle = document.getElementById("taskbarAutoToggle");

const taskbarWidthSlider = document.getElementById("taskbarWidthSlider");

function updateTaskbarSize() {
	// the slider is the minimum width, the taskbar still grows if apps need more space

	document.documentElement.style.setProperty("--taskbar-width", taskbarWidthSlider.value + "px");

	if (taskbarAutoToggle.checked) {
		document.documentElement.classList.add("taskbar-auto");

		taskbarWidthSlider.disabled = true;
	} else {
		document.documentElement.classList.remove("taskbar-auto");

		taskbarWidthSlider.disabled = false;
	}
}

taskbarAutoToggle.checked = localStorage.getItem("IanWebOS-taskbar-auto") === "on";

taskbarWidthSlider.value = localStorage.getItem("IanWebOS-taskbar-width") || 460;

updateTaskbarSize();

taskbarAutoToggle.addEventListener("change", function () {
	localStorage.setItem("IanWebOS-taskbar-auto", taskbarAutoToggle.checked ? "on" : "off");

	updateTaskbarSize();
});

taskbarWidthSlider.addEventListener("input", function () {
	localStorage.setItem("IanWebOS-taskbar-width", taskbarWidthSlider.value);

	updateTaskbarSize();
});

// the start menu opens above the left side of the taskbar, whatever its size

startButton.addEventListener("click", function () {
	const left = taskbar.getBoundingClientRect().left;

	startMenu.style.left = left + "px";

	appsPanel.style.left = left + startMenu.offsetWidth + 8 + "px";
});
