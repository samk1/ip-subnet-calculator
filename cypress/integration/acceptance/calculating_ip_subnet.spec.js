describe("Calculating IP subnets", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("calculates IP address info", () => {
    // When the IP address is invalid
    cy.testid("ip_address_input").clear();
    cy.testid("ip_address_input").type("garbl");

    // Then nothing is displayed
    cy.testid("ip_address_value").should("be.empty");

    // When the IP address is valid
    cy.testid("ip_address_input").clear();
    cy.testid("ip_address_input").type("192.168.254.1/24");

    // Then the IP address is displayed
    cy.testid("ip_address_value").contains("192.168.254.1/24");
  });
});
