# Interactive Form
This is the project page for Treehouse's Fullstack JavaScript Tech Degree Unit 3's Interactive Form project. It involves HTML, CSS, and JavaScript. Processes will be documented below. Starting files were downloaded from Team Treehouse's website.

## Form Validation
All required fields, except the "Register for Activities" field, validate user input in real time as the user interacts with them.

While I started with doing each field individually, making the code DRYer and easier to read led to me creating a validateField helper function that takes in the input of the field, the regex required for that field, if any, as well as a required boolean for if the user is expecting a credit card transaction.

```javascript
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
```

I then created an inputValidations array, so I could run a loop through the required input instead of writing each one out.

```javascript
  // DRY real-time validations
  const inputValidations = [
    { input: nameInput },
    { input: emailInput, regex: validationPatterns.email },
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
```

In order to show and clear valid input, errors, and hints, I used logic I created to show them on submit:

```javascript
  //helper function for hints
  const toggleHint = (element, show = true) => {
    const hint = element.nextElementSibling
    if (hint && hint.classList.contains('hint')) {
      hint.style.display = show ? 'block' : 'none'
    }
  }

  //helper function to show errors
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

    if (element === activitiesFieldset) {
      activitiesCostDisplay.classList.add('error-border')
      activitiesHint.style.display = 'block'
    } else {
      toggleHint(element, true)
    }
  }

  //helper function to clear errors on user correction
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
```

In particular, I thought the logic to assign the parent variable was pretty smart. It checks if the element is the activitiesFieldset (because this fieldset is structurally different than the text input fields) via a ternary operator. If true, it assigns parent: activitiesFieldset.closest('.activities'). If not, it assigns parent the closest label ancestor element; barring that, it assigns the direct parent element of element. That was gnarly to figure out. I can't wait to stop manipulating the DOM manually and dive into React.

## Grading
*I'm submitting for exceeds expectations or needs work.*

### "Name" Field
* On page load, the cursor appears in the "Name" field, ready for a user to type
### "Job Role" Section
* "Other job role" text field displays/hides when a user selects/deselects "Other" from the Job Role menu
### "T-Shirt" Section
* The "Color" field is disabled when the page loads
* The "Color" field is enabled when a "Theme" is selected
* The "Color" field updates correctly when a T-Shirt theme is selected or changed
* The "Color" drop down menu updates correctly when a T-Shirt theme is selected or changed
### "Register for Activities" Section
* The total cost of selected activities correctly updates in the form when users select or deselect activities
*Exceeds Expectations*
* The user is prevented from selecting two activities that are at the same day and time
### "Payment Info" Section
* When the page loads, "Credit Card" is selected in the payment field, and the credit card section is the only payment section displayed in the form's UI
* The payment section updates when the user changes the selected payment method in the drop down menu
### Form Validation
* Form Submission uses the submit event on the form element
* Form cannot be submitted (*the page does not refresh when the submit button is clicked*) until the following requirements have been met:
  * "Name" field isn't blank
  * "Email" field contains a correctly formatted email address
  * At least one activity has been selected
  * If "Credit Card" is the selected payment option, the three credit card fields accept only numbers:
    * A 13- to 16-digit credit card number
    * A 5-digit zip code
    * A 3-digit CVV value
* When all the required fields are filled out correctly, the form submits (*the page refreshes on its own when the submit button is clicked*)
*Exceeds Expectations*
* At least one required field validates user input in real time as the user interacts with the field
* At least one required form field provides validation error messages that differ depending on the reason the field is invalid
* Form fields that have real time validation and conditional error messages are detailed in the project's README.me file
### Accessibility
* The activites have obvious focus state indicators when tabbing through the form's inputs
* If a required field's input is not valid when the form is submitted, a validation error message, warning icon and color are displayed
* If a required field's input is valid, when the form is submitted, a checkmark icon is displayed and no error indicators are displayed
### Code Quality
* Code comments have been added to the js/script.js file
* No unresolved errors appear in the console when the form loads or is interacted with