describe('Fill all the forms', () => {
    it('Fills the form with specified info', () => {
        // Visit the webpage
        cy.visit('https://demoqa.com/automation-practice-form');
        
        // Input all necessary information
        cy.get('#firstName').type('Juris');
        cy.get('#lastName').type('Peteris');
        cy.get('#userEmail').type('j.peteris@example.com');
        
        // Click the label to check the radio button for Male
        cy.get('label[for="gender-radio-1"]').click();

        // Input Mobile Number
        cy.get('#userNumber').type('1234567890');

        // Set the Date of Birth
        cy.get('#dateOfBirthInput').click();
        cy.get('.react-datepicker__month-select').select('February');
        cy.get('.react-datepicker__year-select').select('1930');
        cy.get('.react-datepicker__day--028:not(.react-datepicker__day--outside-month)').click();
        cy.get('body').click(0,0); // Click away to close the date picker

        // Set Subjects to Economics
        cy.get('#subjectsInput').type('Economics{enter}');

        // Click the label to check the checkbox for Music hobby
        cy.get('label[for="hobbies-checkbox-3"]').click(); // Checks the checkbox for Music hobby by clicking the label

        // Upload an image
        const imagePath = 'cypress/fixtures/files/student-id-card.png'; // Ensure this path is correct
        cy.get('input[type="file"]').selectFile(imagePath);

        // Set State and City
        cy.get('#react-select-3-input').type('NCR{enter}', { force: true });
        cy.get('#react-select-4-input').type('Delhi{enter}', { force: true });

        // Click Submit
        cy.get('#submit').click();

        // Validate that each labeled row contains the correct information
        cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
        cy.get('tbody').within(() => {
            cy.get('tr').eq(0).should('contain', 'Juris Peteris');
            cy.get('tr').eq(1).should('contain', 'j.peteris@example.com');
            cy.get('tr').eq(4).should('contain', '28 February,1930');
            cy.get('tr').eq(5).should('contain', 'Economics');
            cy.get('tr').eq(6).should('contain', 'Music');
            cy.get('tr').eq(9).should('contain', 'NCR Delhi');
        });
    });
});
