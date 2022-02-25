describe("My First Test", () => {
  it("performs test", () => {
    cy.visit("localhost:3000");
    cy.get("#nameInput").type("Test").should("have.value", "Test");
    cy.get("#emailInput").type("conradklek@gmail.com");
    cy.get("#passwordInput").type("password");
    cy.get("#termsInput").check().should("be.checked");
    cy.get("#submit").click();
  });
});
