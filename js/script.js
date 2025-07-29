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

    console.log(colorOptions)
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
          //re-enable if no other checkbox with same time is still selected
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
