describe("Calculating IP subnets", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("calculates IP address info", () => {
    cy.testid("ip_address_input").type("192.168.254.1/24");
    cy.testid("ip_address_value").contains("192.168.254.1/24");
  });
});
