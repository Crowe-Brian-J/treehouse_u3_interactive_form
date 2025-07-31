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

  //show default payment selection on page load
  showPaymentSection(paymentSelect.value)

  //listen for the changes
  paymentSelect.addEventListener('change', (e) => {
    showPaymentSection(e.target.value)
  })

  // =====================
  // 6. Form Validation (On Submit)
  // =====================

  //helper function for hints
  const toggleHint = (element, show = true) => {
    const hint = element.nextElementSibling
    if (hint && hint.classList.contains('hint')) {
      hint.style.display = show ? 'block' : 'none'
    }
  }

  //helper functions to show and clear errors
  const showError = (element) => {
    //for adding iconography
    const parent = element.closest('label') || element.parentElement
    //add error-border class to element and show hint message
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
    //for adding iconography - including to form
    const parent = element.closest('label') || element.parentElement
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

    //name validation
    if (nameInput.value.trim() === '') {
      showError(nameInput)
      isFormValid = false
    } else {
      clearError(nameInput)
    }

    //email validation
    if (!validationPatterns.email.test(emailInput.value.trim())) {
      showError(emailInput)
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
      isFormValid = false
    } else {
      clearError(activitiesFieldset)
    }

    //payment validation
    if (paymentSelect.value === 'credit-card') {
      if (!validationPatterns.ccNum.test(ccNum.value.trim())) {
        showError(ccNum)
        isFormValid = false
      } else {
        clearError(ccNum)
      }

      if (!validationPatterns.zip.test(zip.value.trim())) {
        showError(zip)
        isFormValid = false
      } else {
        clearError(zip)
      }

      //cvv 3 digits
      if (!validationPatterns.cvv.test(cvv.value.trim())) {
        showError(cvv)
        isFormValid = false
      } else {
        clearError(cvv)
      }

      //prevent form submission if invalid
      if (!isFormValid) {
        e.preventDefault()
      }
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
    { input: emailInput, regex: validationPatterns.email },
    {
      input: ccNum,
      regex: validationPatterns.ccNum,
      condition: () => {
        paymentSelect.value === 'credit-card'
      }
    },
    {
      input: zip,
      regex: validationPatterns.zip,
      condition: () => {
        paymentSelect.value === 'credit-card'
      }
    },
    {
      input: cvv,
      regex: validationPatterns.cvv,
      condition: () => {
        paymentSelect.value === 'credit-card'
      }
    }
  ]
  //check if name is deleted
  nameInput.addEventListener('input', () => {
    validateField(nameInput)
  })

  //check email validation
  emailInput.addEventListener('input', () => {
    validateField(emailInput, validationPatterns.email)
  })

  //check ccNum
  ccNum.addEventListener('input', () => {
    if (paymentSelect.value === 'credit-card') {
      validateField(ccNum, validationPatterns.ccNum)
    }
  })

  //zip validation
  zip.addEventListener('input', () => {
    if (paymentSelect.value === 'credit-card') {
      validateField(zip, validationPatterns.zip)
    }
  })

  //cvv validation - possibly combine at some point?
  cvv.addEventListener('input', () => {
    if (paymentSelect.value === 'credit-card') {
      validateField(cvv, validationPatterns.cvv)
    }
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
