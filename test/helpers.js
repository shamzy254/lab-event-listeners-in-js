function resetDOM() {
  document.body.innerHTML = `
    <h1>Lab: Event Listeners With JavaScript</h1>
    <button id="changeColorButton">Change Background Color</button>
    <button id="resetColorButton">Reset Background Color</button>
    <p id="interactionStatus">No interactions yet.</p>
    <p id="keyPressDisplay">Press any key...</p>
    <form id="textInputForm">
      <input type="text" id="textInput" placeholder="Type something...">
      <button type="submit" id="submitTextButton">Submit Text</button>
    </form>
    <p id="formSubmitDisplay">Submit your message above.</p>
    <p id="textInputDisplay">Your input will be displayed here.</p>
  `
}

module.exports = { resetDOM }
