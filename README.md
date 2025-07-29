# Interactive Form
This is the project page for Treehouse's Fullstack JavaScript Tech Degree Unit 3's Interactive Form project. It involves HTML, CSS, and JavaScript. Processes will be documented below. Starting files were downloaded from Team Treehouse's website.

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