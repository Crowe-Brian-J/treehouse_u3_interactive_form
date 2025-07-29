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

  //payment info
  const paymentSelect = document.getElementById('payment')
  const creditCardDiv = document.getElementById('credit-card')
  const paypalDiv = document.getElementById('paypal')
  const bitcoinDiv = document.getElementById('bitcoin')

  //cc fields
  const ccNum = document.getElementById('cc-num')
  const zip = document.getElementById('zip')
  const cvv = document.getElementById('cvv')

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
    colorOptions.forEach((option) => {
      if (option.getAttribute('data-theme') === selectedTheme) {
        option.hidden = false
        if (!firstMatchSelected) {
          option.selected = true
          firstMatchSelected = true
        }
      } else {
        option.hidden = true
        option.selected = false
      }
    })
  })

  // =====================
  // 4. Register for Activities Section
  // =====================

  // =====================
  // 5. Payment Info Section
  // =====================

  // =====================
  // 6. Form Validation (On Submit)
  // =====================

  // =====================
  // 7. Real-Time Validation (Exceeds Expectations)
  // =====================

  // =====================
  // 8. Accessibility & UX Enhancements
  // =====================
})
