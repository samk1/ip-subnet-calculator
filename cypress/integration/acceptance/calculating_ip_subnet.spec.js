describe("Calculating IP subnets", () => {
  before(() => {
    cy.visit("");
  });

  context("when the ip address is invalid", () => {
    before(() => {
      cy.testid("ip_address_input").clear();
      cy.testid("ip_address_input").type("garbl");
    });

    it("doesn't display anything", () => {
      cy.testid("ip_address_value").should("be.empty");
    });
  });

  context("when the ip address is valid", () => {
    before(() => {
      cy.testid("ip_address_input").clear();
      cy.testid("ip_address_input").type("192.168.254.1/24");
    });

    it("displays the ip address", () => {
      cy.testid("ip_address_value").contains("192.168.254.1/24");
    });
  });
});
