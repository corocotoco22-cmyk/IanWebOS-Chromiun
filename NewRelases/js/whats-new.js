// What's new: shown once, the first time IanWebOS opens after an update

// Add a new entry here for every update (newest first). Versions without notes show nothing.
const releaseNotes = {
	"1.0.2": [
		"Fixed: maximized websites opened in their own window no longer shrink back or flicker",
		"Minimizing the browser now brings those windows back the way they were",
	],
	"1.0.1": [
		"Fixed: maximizing a website opened in its own window made it jump around",
		'The "Page not showing?" bar can now be closed with ×',
		"Settings → About now shows your version",
	],
};

const whatsNew = document.getElementById("whatsNew");

function showWhatsNew(version) {
	const notes = releaseNotes[version];

	if (!notes) {
		return;
	}

	document.getElementById("whatsNewTitle").textContent = "What's new in IanWebOS " + version;

	const list = document.getElementById("whatsNewList");

	list.innerHTML = "";

	notes.forEach(function (note) {
		const item = document.createElement("li");
		item.textContent = note;
		list.appendChild(item);
	});

	whatsNew.hidden = false;
}

function closeWhatsNew() {
	whatsNew.hidden = true;
}

document.getElementById("whatsNewClose").addEventListener("click", closeWhatsNew);
document.getElementById("whatsNewOk").addEventListener("click", closeWhatsNew);

document.addEventListener("keydown", function (event) {
	if (event.key === "Escape" && !whatsNew.hidden) {
		closeWhatsNew();
	}
});

(function () {
	const current = chrome.runtime.getManifest().version;
	const lastSeen = localStorage.getItem("IanWebOS-version");

	// someone who used IanWebOS before this window existed (1.0.0) has this saved;
	// a brand new install doesn't, and has nothing "new" to see
	const usedBefore = lastSeen !== null || localStorage.getItem("IanWebOS-update-checked") !== null;

	localStorage.setItem("IanWebOS-version", current);

	if (!usedBefore || lastSeen === current) {
		return;
	}

	// after the boot animation
	const bootOn = localStorage.getItem("bootAnimation") !== "off";

	setTimeout(function () {
		showWhatsNew(current);
	}, bootOn ? 3300 : 600);
})();
