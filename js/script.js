//wrap everything in 'DOMContentLoaded' event listener for autofocus on nameInput on page load
document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // Global Element Selectors
  // =====================

  //form and basic fields
  const form = document.querySelector('form')
  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')

  //job role
  const jobRoleSelect = document.getElementById('title')
  const otherJobInput = document.getElementById('other-job-role')

  //t-shirt info
  const shirtDesignSelect = document.getElementById('design')
  const shirtColorSelect = document.getElementById('color')
  const colorOptions = shirtColorSelect.children

  //activities
  const activitiesFieldset = document.getElementById('activities')
  const activitiesCheckboxes = activitiesFieldset.querySelectorAll(
    'input[type="checkbox"]'
  )
  const activitiesCostDisplay = document.getElementById('activities-cost')
  const activitiesHint = document.getElementById('activities-hint')

  //payment info
  const paymentSelect = document.getElementById('payment')
  const creditCardDiv = document.getElementById('credit-card')
  const paypalDiv = document.getElementById('paypal')
  const bitcoinDiv = document.getElementById('bitcoin')

  //cc fields
  const ccNum = document.getElementById('cc-num')
  const zip = document.getElementById('zip')
  const cvv = document.getElementById('cvv')

  //regex to DRY code
  const validationPatterns = {
    email: /^[^@]+@[^@.]+\.[a-z]+$/i,
    ccNum: /^\d{13,16}$/,
    zip: /^\d{5}$/,
    cvv: /^\d{3}$/
  }

  //helper function to clear valid checks on page refresh
  const clearValidations = () => {
    const allInputs = form.querySelectorAll('input, select')
    allInputs.forEach((el) => {
      //didn't see error borders on valid submit, but in case
      el.classList.remove('valid-border', 'error-border')
      const parent = el.closest('label') || el.parentElement
      parent?.classList.remove('valid', 'not-valid')
    })
    activitiesCostDisplay.classList.remove('error-border')
    activitiesHint.style.display = 'none'
  }

  // =====================
  // 1. Name Field Auto-Focus
  // =====================

  //autofocus on name input per grading rubric/instructions
  nameInput.focus()

  // =====================
  // 2. Job Role Section
  // =====================

  //hide other job role input on initial load
  otherJobInput.style.display = 'none'

  //listen for changes on the job role dropdown
  jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
      otherJobInput.style.display = 'block'
    } else {
      otherJobInput.style.display = 'none'
    }
  })

  // =====================
  // 3. T-Shirt Section
  // =====================

  //disable color menu by default
  shirtColorSelect.disabled = true

  //when a theme is selected
  shirtDesignSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value

    //enable color select menu
    shirtColorSelect.disabled = false

    //track if we've found and selected the first valid option
    let firstMatchSelected = false

    //show/hide color option based on selected theme
    for (let i = 0; i < colorOptions.length; i++) {
      const option = colorOptions[i]
      const theme = option.getAttribute('data-theme')

      if (theme === selectedTheme) {
        //show available options
        option.hidden = false
        option.disabled = false
        if (!firstMatchSelected) {
          option.selected = true
          firstMatchSelected = true
        }
      } else {
        //hide other options
        option.hidden = true
        option.disabled = true
        option.selected = false
      }
    }
  })

  // =====================
  // 4. Register for Activities Section
  // =====================

  //set initial cost at 0 - allow additions
  let totalCost = 0

  //start listening
  activitiesFieldset.addEventListener('change', (e) => {
    //find clicked
    const clicked = e.target
    const clickedTime = clicked.getAttribute('data-day-and-time')
    const cost = parseInt(clicked.getAttribute('data-cost'))

    //update totalCost
    if (clicked.checked) {
      //add cost if clicked
      totalCost += cost
    } else {
      //remove cost if unclicked
      totalCost -= cost
    }

    //display updated total
    activitiesCostDisplay.textContent = `Total: $${totalCost}`

    //prevent schedule conflicts
    activitiesCheckboxes.forEach((checkbox) => {
      const checkboxTime = checkbox.getAttribute('data-day-and-time')

      if (checkbox !== clicked && checkboxTime === clickedTime) {
        if (clicked.checked) {
          //disable conflicting checkbox
          checkbox.disabled = true
          checkbox.parentElement.classList.add('disabled')
        } else {
          const isConflictSelected = Array.from(activitiesCheckboxes).some(
            (cb) => {
              return (
                cb !== checkbox &&
                cb.checked &&
                cb.getAttribute('data-day-and-time') == checkboxTime
              )
            }
          )

          if (!isConflictSelected) {
            //re-enable if no other checkbox with same time is still selected
            checkbox.disabled = false
            checkbox.parentElement.classList.remove('disabled')
          }
        }
      }
    })
  })

  // =====================
  // 5. Payment Info Section
  // =====================

  //set cc as default payment option
  paymentSelect.value = 'credit-card'

  //map payment method IDs to their div elements
  const paymentSections = {
    'credit-card': creditCardDiv,
    paypal: paypalDiv,
    bitcoin: bitcoinDiv
  }

  //helper function to DRY up code
  const showPaymentSection = (selectedMethod) => {
    for (const method in paymentSections) {
      if (method === selectedMethod) {
        paymentSections[method].style.display = 'block'
      } else {
        paymentSections[method].style.display = 'none'
      }
    }
  }

  //show default payment selection on page load - reload update
  setTimeout(() => {
    paymentSelect.selectedIndex = 1
    showPaymentSection('credit-card')
  }, 0)

  //listen for the changes
  paymentSelect.addEventListener('change', (e) => {
    showPaymentSection(e.target.value)
  })

  // =====================
  // 6. Form Validation (On Submit)
  // =====================

  //helper function to remove validation and reset page on valid sumbission
  const validSubmission = () => {
    //clear input data from form
    form.reset()
    //reset payment section
    paymentSelect.value = 'credit-card'
    showPaymentSection('credit-card')
    //clear validations from user input
    clearValidations()
    //reset cost logic
    totalCost = 0
    activitiesCostDisplay.textContent = `Total: $${totalCost}`
    //reset activities fieldset validation classes
    activitiesFieldset.classList.remove(
      'valid',
      'not-valid',
      'valid-border',
      'error-border'
    )
    activitiesCostDisplay.classList.remove('error-border')
    activitiesCheckboxes.forEach((checkbox) => {
      //enable all checkboxes
      checkbox.disabled = false
      //remove disabled class from parent element
      checkbox.parentElement.classList.remove('disabled')
      //clear validation classes from parent
      checkbox.parentElement.classList.remove('valid', 'not-valid')
    })
    //clear other job input if available
    otherJobInput.style.display = 'none'
    //set focus back to nameInput as intended
    nameInput.focus()
  }

  //helper function for hints
  const toggleHint = (element, show = true) => {
    const hint = element.nextElementSibling
    if (hint && hint.classList.contains('hint')) {
      hint.style.display = show ? 'block' : 'none'
    }
  }

  //helper functions to show and clear errors
  const showError = (element) => {
    const parent =
      element === activitiesFieldset
        ? activitiesFieldset.closest('.activities')
        : element.closest('label') || element.parentElement

    //stop form from gaining an x
    if (parent === form) return

    element.classList.remove('valid-border')
    element.classList.add('error-border')
    parent.classList.remove('valid')
    parent.classList.add('not-valid')

    //determine if error element is in activities field
    if (element === activitiesFieldset) {
      activitiesCostDisplay.classList.add('error-border')
      activitiesHint.style.display = 'block'
    } else {
      toggleHint(element, true)
    }
  }

  const clearError = (element) => {
    const parent =
      element === activitiesFieldset
        ? activitiesFieldset.closest('.activities')
        : element.closest('label') || element.parentElement

    //stop form from gaining a checkmark
    if (parent === form) return

    element.classList.remove('error-border')
    element.classList.add('valid-border')
    parent.classList.remove('not-valid')
    parent.classList.add('valid')

    if (element === activitiesFieldset) {
      activitiesCostDisplay.classList.remove('error-border')
      activitiesHint.style.display = 'none'
    } else {
      toggleHint(element, false)
    }
  }

  //validateAndFlag helper function
  const validateAndFlag = (input, regex) => {
    if (!regex.test(input.value.trim())) {
      showError(input)
      return false
    } else {
      clearError(input)
      return true
    }
  }

  form.addEventListener('submit', (e) => {
    //clear previous error states
    let isFormValid = true
    //track first invalid field
    let firstInvalidField = null

    //name validation
    if (nameInput.value.trim() === '') {
      showError(nameInput)
      if (!firstInvalidField) firstInvalidField = nameInput
      isFormValid = false
    } else {
      clearError(nameInput)
    }

    //email validation - to coincide with changes to real-time validation
    const emailValue = emailInput.value.trim()
    const emailHint = emailInput.nextElementSibling

    if (emailValue === '') {
      emailHint.textContent = 'Email address cannot be blank'
      showError(emailInput)
      if (!firstInvalidField) firstInvalidField = emailInput
      isFormValid = false
    } else if (!validationPatterns.email.test(emailValue)) {
      emailHint.textContent = 'Email address must be formatted correctly'
      showError(emailInput)
      if (!firstInvalidField) firstInvalidField = emailInput
      isFormValid = false
    } else {
      clearError(emailInput)
    }

    //activities validation (at least one)
    const isActivityChecked = Array.from(activitiesCheckboxes).some(
      (cb) => cb.checked
    )

    if (!isActivityChecked) {
      showError(activitiesFieldset)
      if (!firstInvalidField) firstInvalidField = activitiesFieldset
      isFormValid = false
    } else {
      clearError(activitiesFieldset)
    }

    //payment validation
    if (paymentSelect.value === 'credit-card') {
      //DRY up same calls
      isFormValid &&=
        validateAndFlag(ccNum, validationPatterns.ccNum) &&
        validateAndFlag(zip, validationPatterns.zip) &&
        validateAndFlag(cvv, validationPatterns.cvv)
    }

    //prevent form submission if invalid
    if (!isFormValid) {
      e.preventDefault()
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        firstInvalidField.focus()
      }
    } else {
      //prevent form submission because we don't have a backend
      e.preventDefault()
      //call all logic to reset page because we don't have a backend
      validSubmission()
    }
  })

  // =====================
  // 7. Real-Time Validation (Exceeds Expectations)
  // =====================

  //validation helper function
  const validateField = (input, regex = /.*/, required = true) => {
    const value = input.value.trim()
    const isEmpty = required && value === ''
    const isInvalid = !regex.test(value)

    if (isEmpty || isInvalid) {
      showError(input)
      return false
    } else {
      clearError(input)
      return true
    }
  }

  // DRY real-time validations
  const inputValidations = [
    { input: nameInput },
    {
      input: emailInput,
      regex: validationPatterns.email,
      condition: () => {
        const value = emailInput.value.trim()
        const hint = emailInput.nextElementSibling
        if (value === '') {
          hint.textContent = 'Email address cannot be blank'
        } else {
          hint.textContent = 'Email address must be formatted correctly'
        }
        return true
      }
    },
    {
      input: ccNum,
      regex: validationPatterns.ccNum,
      condition: () => paymentSelect.value === 'credit-card'
    },
    {
      input: zip,
      regex: validationPatterns.zip,
      condition: () => paymentSelect.value === 'credit-card'
    },
    {
      input: cvv,
      regex: validationPatterns.cvv,
      condition: () => paymentSelect.value === 'credit-card'
    }
  ]

  //input validations loop
  inputValidations.forEach(({ input, regex, condition }) => {
    input.addEventListener('input', () => {
      if (!condition || condition()) {
        validateField(input, regex)
      }
    })
  })

  // =====================
  // 8. Accessibility & UX Enhancements
  // =====================

  //noticed when tabbing through activities checkboxes it's not adding or removing focus
  activitiesCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('focus', (e) => {
      e.target.parentElement.classList.add('focus')
    })

    checkbox.addEventListener('blur', (e) => {
      e.target.parentElement.classList.remove('focus')
    })
  })
})
