// Handle Button Clicks

let nextStatusMessage = null
let statusFrameId = null

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

function flushStatusUpdate() {
  const statusElement = document.getElementById('interactionStatus')
  if (!statusElement) return
  statusElement.textContent = nextStatusMessage || 'No interactions yet.'
  nextStatusMessage = null
  statusFrameId = null
}

// Function to update the interaction status text using requestAnimationFrame for smooth updates
function updateInteractionStatus(message) {
  nextStatusMessage = message
  if (!statusFrameId) {
    statusFrameId = requestAnimationFrame(flushStatusUpdate)
  }
}

function safeTextUpdate(elementId, text) {
  const element = document.getElementById(elementId)
  if (!element) return
  if (element.textContent !== text) {
    element.textContent = text
  }
}

// Function to display the key pressed by the user
function displayKeyPress(event) {
  safeTextUpdate('keyPressDisplay', `Key pressed: ${event.key}`)
}

// Function to display user input in real-time
function displayUserInput(event) {
  const inputValue = event?.target?.value ?? document.getElementById('textInput').value
  safeTextUpdate('textInputDisplay', `You typed: ${inputValue}`)
}

function displaySubmitMessage(value) {
  safeTextUpdate('formSubmitDisplay', `Submitted: ${value}`)
}

function highlightActionButton(event) {
  const target = event.target
  if (!(target instanceof HTMLElement) || !target.matches('button')) return

  if (event.type === 'mouseover') {
    target.classList.add('button-hover')
    updateInteractionStatus(`Hovering over "${target.textContent}".`)
  } else if (event.type === 'mouseout') {
    target.classList.remove('button-hover')
    updateInteractionStatus(`Stopped hovering "${target.textContent}".`)
  }
}

function handleFormSubmit(event) {
  event.preventDefault()
  const input = document.getElementById('textInput')
  if (!input) return
  const value = input.value.trim() || '<empty>'
  displaySubmitMessage(value)
  updateInteractionStatus('Text submitted successfully.')
}

// Function to handle mixed user interactions in one place
function handleUserInteraction(event) {
  const target = event.target
  if (event.type === 'click' && target.id === 'changeColorButton') {
    changeBackgroundColor()
    updateInteractionStatus('Background color changed.')
  } else if (event.type === 'dblclick' && target.id === 'resetColorButton') {
    resetBackgroundColor()
    updateInteractionStatus('Background color reset.')
  } else if (event.type === 'keydown') {
    displayKeyPress(event)
    updateInteractionStatus(`Key pressed: ${event.key}`)
  } else if (event.type === 'input') {
    displayUserInput(event)
    updateInteractionStatus('Typing input...')
  } else if (event.type === 'focus' && target.id === 'textInput') {
    updateInteractionStatus('Text input active.')
  } else if (event.type === 'blur' && target.id === 'textInput') {
    updateInteractionStatus('Text input inactive.')
  } else if (event.type === 'mouseover' || event.type === 'mouseout') {
    highlightActionButton(event)
  } else if (event.type === 'submit') {
    handleFormSubmit(event)
  }
}

// Attach Event Listeners
function setupEventListeners() {
  const changeColorButton = document.getElementById('changeColorButton')
  const resetColorButton = document.getElementById('resetColorButton')
  const textInput = document.getElementById('textInput')
  const textInputForm = document.getElementById('textInputForm')

  if (changeColorButton) {
    changeColorButton.addEventListener('click', handleUserInteraction)
    changeColorButton.addEventListener('mouseover', handleUserInteraction)
    changeColorButton.addEventListener('mouseout', handleUserInteraction)
  }

  if (resetColorButton) {
    resetColorButton.addEventListener('dblclick', handleUserInteraction)
    resetColorButton.addEventListener('mouseover', handleUserInteraction)
    resetColorButton.addEventListener('mouseout', handleUserInteraction)
  }

  if (textInput) {
    textInput.addEventListener('input', handleUserInteraction)
    textInput.addEventListener('focus', handleUserInteraction)
    textInput.addEventListener('blur', handleUserInteraction)
  }

  if (textInputForm) {
    textInputForm.addEventListener('submit', handleUserInteraction)
  }

  document.addEventListener('keydown', handleUserInteraction)
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
  displaySubmitMessage,
  highlightActionButton,
  handleFormSubmit,
  setupEventListeners,
}
