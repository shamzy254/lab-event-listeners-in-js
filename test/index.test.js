const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const { resetDOM } = require('./helpers')
const {
  changeBackgroundColor,
  resetBackgroundColor,
  displayKeyPress,
  displayUserInput,
  setupEventListeners,
} = require('../index.js')

describe('Event Handling Tests', () => {
  beforeEach(() => {
    resetDOM() // Reset the DOM structure
    setupEventListeners() // Attach event listeners
  })

  test('changeBackgroundColor generates a valid color', () => {
    changeBackgroundColor()
    const currentColor = document.body.style.backgroundColor
    expect(currentColor).toMatch(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/) // Validate rgb() format
  })

  test('resetBackgroundColor clears the body background color', () => {
    document.body.style.backgroundColor = 'rgb(18, 52, 86)'
    resetBackgroundColor()
    expect(document.body.style.backgroundColor).toBe('')
  })

  test('changeBackgroundColor changes the body background color via button click', () => {
    const changeColorButton = document.getElementById('changeColorButton')
    expect(changeColorButton).not.toBeNull()

    changeColorButton.click()
    const currentColor = document.body.style.backgroundColor
    expect(currentColor).toMatch(/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/) // Validate rgb() format
  })

  test('resetBackgroundColor resets the body background color via double-click', () => {
    const resetColorButton = document.getElementById('resetColorButton')
    expect(resetColorButton).not.toBeNull()

    document.body.style.backgroundColor = 'rgb(18, 52, 86)'
    resetColorButton.dispatchEvent(new Event('dblclick'))
    expect(document.body.style.backgroundColor).toBe('')
  })

  test('displayKeyPress updates the key press display directly', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'B' })
    displayKeyPress(mockEvent)
    const keyPressDisplay = document.getElementById('keyPressDisplay')
    expect(keyPressDisplay).not.toBeNull()
    expect(keyPressDisplay.textContent).toBe('Key pressed: B')
  })

  test('displayUserInput updates the input display directly', () => {
    const textInput = document.getElementById('textInput')
    const textInputDisplay = document.getElementById('textInputDisplay')

    textInput.value = 'Test Input'
    displayUserInput()
    expect(textInputDisplay).not.toBeNull()
    expect(textInputDisplay.textContent).toBe('You typed: Test Input')
  })

  test('displayKeyPress updates the key press display via keydown event', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'A' })
    document.dispatchEvent(mockEvent)
    const keyPressDisplay = document.getElementById('keyPressDisplay')
    expect(keyPressDisplay).not.toBeNull() // Ensure the div exists
    expect(keyPressDisplay.textContent).toBe('Key pressed: A')
  })

  test('displayUserInput updates the input display in real-time via input event', () => {
    const textInput = document.getElementById('textInput')
    const textInputDisplay = document.getElementById('textInputDisplay')

    textInput.value = 'Hello'
    textInput.dispatchEvent(new Event('input', { bubbles: true }))
    expect(textInputDisplay).not.toBeNull() // Ensure the div exists
    expect(textInputDisplay.textContent).toBe('You typed: Hello')
  })

  test('button hover events add and remove the hover class', () => {
    const changeColorButton = document.getElementById('changeColorButton')

    changeColorButton.dispatchEvent(new Event('mouseover', { bubbles: true }))
    expect(changeColorButton.classList.contains('button-hover')).toBe(true)

    changeColorButton.dispatchEvent(new Event('mouseout', { bubbles: true }))
    expect(changeColorButton.classList.contains('button-hover')).toBe(false)
  })

  test('form submit displays submitted text and prevents default', () => {
    const textInput = document.getElementById('textInput')
    const formSubmitDisplay = document.getElementById('formSubmitDisplay')
    const form = document.getElementById('textInputForm')

    textInput.value = 'Testing'
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    const eventResult = form.dispatchEvent(submitEvent)

    expect(eventResult).toBe(false)
    expect(formSubmitDisplay.textContent).toBe('Submitted: Testing')
  })
})
