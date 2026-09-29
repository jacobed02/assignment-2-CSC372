function initializeSavedEvents() {
  const eventGrid = document.querySelector(".event-grid");
  const footer = document.querySelector(".site-footer");

  if (!eventGrid || !footer) {
    return;
  }

  const savedCards = new Set();
  const summarySection = document.createElement("section");
  summarySection.classList.add("saved-events-section");

  const summaryContainer = document.createElement("div");
  summaryContainer.classList.add("container");

  const summaryHeading = document.createElement("h3");
  summaryHeading.classList.add("saved-events-heading");
  summaryHeading.textContent = "Saved Events";

  const emptyMessage = document.createElement("p");
  emptyMessage.classList.add("saved-events-empty");
  emptyMessage.textContent = "No events have been saved yet.";

  const savedEventsList = document.createElement("ul");
  savedEventsList.classList.add("saved-events-list");
  savedEventsList.hidden = true;

  summaryContainer.append(summaryHeading, emptyMessage, savedEventsList);
  summarySection.append(summaryContainer);
  footer.before(summarySection);

  eventGrid.querySelectorAll(".event-card").forEach((card) => {
    const saveButton = document.createElement("button");
    saveButton.classList.add("save-event-button");
    saveButton.type = "button";
    saveButton.textContent = "Save Event";
    card.querySelector(".card-body").append(saveButton);
  });

  function getEventDetails(card) {
    const details = {};

    card.querySelectorAll(".card-body li").forEach((item) => {
      const label = item.querySelector("strong");
      if (label) {
        const key = label.textContent.replace(":", "").toLowerCase();
        details[key] = item.textContent.slice(label.textContent.length).trim();
      }
    });

    return details;
  }

  function renderSavedEvents() {
    while (savedEventsList.firstChild) {
      savedEventsList.firstChild.remove();
    }

    savedCards.forEach((card) => {
      const eventDetails = getEventDetails(card);
      const savedEvent = document.createElement("li");
      const eventName = document.createElement("h4");
      const eventInfo = document.createElement("p");

      eventName.classList.add("saved-event-name");
      eventName.textContent = card.querySelector(".card-body h4").textContent;
      eventInfo.classList.add("saved-event-details");
      eventInfo.textContent = `Date: ${eventDetails.date}; Time: ${eventDetails.time}; Location: ${eventDetails.location}`;

      savedEvent.append(eventName, eventInfo);
      savedEventsList.append(savedEvent);
    });

    const hasSavedEvents = savedCards.size > 0;
    emptyMessage.hidden = hasSavedEvents;
    savedEventsList.hidden = !hasSavedEvents;
  }

  eventGrid.addEventListener("click", (event) => {
    const saveButton = event.target.closest(".save-event-button");
    if (!saveButton) {
      return;
    }

    const card = saveButton.closest(".event-card");
    if (savedCards.has(card)) {
      savedCards.delete(card);
      card.classList.remove("saved");
      saveButton.textContent = "Save Event";
    } else {
      savedCards.add(card);
      card.classList.add("saved");
      saveButton.textContent = "Remove Event";
    }

    renderSavedEvents();
  });

  renderSavedEvents();
}

window.addEventListener("load", initializeSavedEvents);