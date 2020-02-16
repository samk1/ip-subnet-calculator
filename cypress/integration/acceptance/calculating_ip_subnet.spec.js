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
      cy.testid("ipAddress").should("be.empty");
    });
  });

  context("when the ip address is valid", () => {
    before(() => {
      cy.testid("ip_address_input").clear();
      cy.testid("ip_address_input").type("192.168.254.5/24");
    });

    it("displays the network address", () => {
      cy.testid("networkAddress").contains("192.168.254.0");
    });

    it("displays the low address", () => {
      cy.testid("lowAddress").contains("192.168.254.1");
    });

    it("displays the ip address", () => {
      cy.testid("ipAddress").contains("192.168.254.5");
    });

    it("displays the high address", () => {
      cy.testid("highAddress").contains("192.168.254.254");
    });

    it("displays the broadcast address", () => {
      cy.testid("broadcastAddress").contains("192.168.254.255");
    });

    it("displays the subnet mask", () => {
      cy.testid("subnetMask").contains("255.255.255.0");
    });

    it.skip("displays the IANA allocation", () => {
      cy.testid("allocation").contains("Administered by ARIN")
    })
  });
});
