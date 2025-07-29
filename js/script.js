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
  const shirtDesignSelect = document.getElementById('desing')
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
  nameInput.focus()

  // =====================
  // 2. Job Role Section
  // =====================

  // =====================
  // 3. T-Shirt Section
  // =====================

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
