$(document).ready(function () {
  var sendBtn = $("#send");
  var converse = $("#converse");
  var textbox = $("#textbox");
  
  // Define function to add bot messages
  function addBotItem(message) {
    converse.append(
      '<p class="bot-message regular p-2 me-3 mb-1 text-white" style="border-radius:15px;background-color: #376bee;"><strong>Bot:</strong> ' +
        message +
        "</p>"
    );
    converse.scrollTop(converse.prop("scrollHeight"));
  }

  // Define function to add user messages
  function addUserItem(message) {
    converse.append(
      '<p class="user-message regular p-2 ms-3 mb-1" style="border-radius:15px;background-color: #c0c4c9;"><strong>You:</strong> ' +
        message +
        "</p>"
    );
    converse.scrollTop(converse.prop("scrollHeight"));
  }

  function initial() {
    converse.append(
      "<div class='alert alert-info'>Welcome to LMS!</div>"
    );
    addBotItem("Welcome, How can I help You");
  }
  initial();

  function handleUserMessage(message) {
    addUserItem(message);
    message = message.toLowerCase()
    if (message === "clear") {
        converse.empty();
        setTimeout(initial, 500);
    } else {
        handleDefaultResponse(message);
    }
  }

  function handleKeyDownEvent(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      var message = textbox.val().trim();
      if (message !== "") {
        handleUserMessage(message);
        textbox.val("");
      }
    }
  }

  function handleClickEvent() {
    var message = textbox.val().trim();
    if (message !== "") {
      handleUserMessage(message);
      textbox.val("");
    }
  }

  function handleDefaultResponse(message) {
    $.get("logic.php", { q: message }, function (data) {
      if (data !== "") {
        addBotItem(data);
      } else {
        addBotItem(
          "I'm sorry, I didn't understand. Please select one of the following options: track my parcel, get a quotation, or learn more about our franchise opportunities."
        );
      }
    });
  }

  textbox.keydown(handleKeyDownEvent);
  sendBtn.click(handleClickEvent);
});

$("#chat-button").click(function () {
  $("#chat-box").toggle();
});

$("#cancel").click(function () {
  $("#chat-box").hide();
});
