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
      cy.testid("ip_address_input").type("192.168.254.5/24");
    });

    it.skip("displays the network address", () => {
      cy.testid("network_address_value").contains("192.168.254.0");
    });

    it.skip("displays the low address", () => {
      cy.testid("low_address_value").contains("192.168.254.1")
    })

    it("displays the ip address", () => {
      cy.testid("ip_address_value").contains("192.168.254.5");
    });

    it.skip("displays the high address", () => {
      cy.testid("high_address_value").contains("192.168.254.254")
    })

    it.skip("displays the broadcast address", () => {
      cy.testid("broadcast_address").contains("192.168.254.255")
    })

    it("displays the subnet mask", () => {
      cy.testid("subnet_mask_value").contains("255.255.255.0");
    });
  });
});
