// Handle Button Clicks

// Function to change the background color when a button is clicked
function changeBackgroundColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
}

// Function to reset the background color when the body is double-clicked
function resetBackgroundColor() {
  document.body.style.backgroundColor = ''
}

// Function to update the interaction status text
function updateInteractionStatus(message) {
  document.getElementById('interactionStatus').textContent = message
}

// Function to handle mixed user interactions in one place
function handleUserInteraction(event) {
  if (event.type === 'click' && event.target.id === 'changeColorButton') {
    changeBackgroundColor()
    updateInteractionStatus('Background color changed.')
  } else if (event.type === 'dblclick' && event.target.id === 'resetColorButton') {
    resetBackgroundColor()
    updateInteractionStatus('Background color reset.')
  } else if (event.type === 'keydown') {
    displayKeyPress(event)
    updateInteractionStatus(`Key pressed: ${event.key}`)
  } else if (event.type === 'input') {
    displayUserInput()
    updateInteractionStatus('Typing input...')
  }
}

// Capture Keyboard Input

// Function to display the key pressed by the user
function displayKeyPress(event) {
  document.getElementById('keyPressDisplay').textContent = `Key pressed: ${event.key}`
}

// Process Text Input

// Function to display user input in real-time
function displayUserInput() {
  const inputValue = document.getElementById('textInput').value
  document.getElementById('textInputDisplay').textContent = `You typed: ${inputValue}`
}

// Attach Event Listeners
function setupEventListeners() {
// Attach event listener to change background color when the button is clicked
  document
    .getElementById('changeColorButton')
    .addEventListener('click', handleUserInteraction)

  // Attach event listener to reset background color when the reset button is double-clicked
  document
    .getElementById('resetColorButton')
    .addEventListener('dblclick', handleUserInteraction)

  // Attach event listener to display key pressed when a key is pressed down
  document.addEventListener('keydown', handleUserInteraction)

  // Attach event listener to display user input in real-time as they type
  document.getElementById('textInput').addEventListener('input', handleUserInteraction)
}

// Initialize event listeners when the DOM is loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', setupEventListeners)
}

module.exports = {
  changeBackgroundColor,
  resetBackgroundColor,
  displayKeyPress,
  displayUserInput,
  setupEventListeners,
}