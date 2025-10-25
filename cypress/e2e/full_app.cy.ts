/// <reference types="cypress" />

export {};

describe("Ecommerce App - Categories Component", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".product-card").should("exist");
  });

  it("should display products on home page", () => {
    cy.get(".group").should("have.length.greaterThan", 0);
    cy.get(".group img").should("have.length.greaterThan", 0);
    cy.get(".group h3").should("have.length.greaterThan", 0);
    cy.get(".group p").contains("$");
  });

  it("adjusts price slider", () => {
    cy.get("[data-cy='radix-slider']")
      .should("exist")
      .then(($slider) => {
        const slider = $slider[0];
        const rect = slider.getBoundingClientRect();

        const startX = rect.left + 0.05 * rect.width;
        const endX = rect.left + 0.5 * rect.width;
        const y = rect.top + rect.height / 2;

        cy.wrap(slider)
          .trigger("mousedown", { clientX: startX, clientY: y, force: true })
          .trigger("mousemove", { clientX: startX, clientY: y, force: true })
          .trigger("mouseup", { force: true });

        cy.wrap(slider)
          .trigger("mousedown", { clientX: endX, clientY: y, force: true })
          .trigger("mousemove", { clientX: endX, clientY: y, force: true })
          .trigger("mouseup", { force: true });

        cy.window()
          .its("contentStore")
          .then((store) => {
            expect(store.minPrice).to.be.gte(0);
            expect(store.maxPrice).to.be.lte(999);
          });
      });
  });

  it("can search using input box", () => {
    cy.get("input[placeholder*='Find the item']").type("test search");
    cy.window().its("contentStore.searchQuery").should("eq", "test search");
  });

  it("toggles pricing options checkboxes", () => {
    cy.get("input[type='checkbox']").first().as("firstCheckbox");
    cy.get("@firstCheckbox").check({ force: true });
    cy.window().its("contentStore.selectedPricingOptions").should("include", 0);
    cy.get("@firstCheckbox").uncheck({ force: true });
    cy.window()
      .its("contentStore.selectedPricingOptions")
      .should("not.include", 0);
  });

  it("changes sort option in SortDropdown", () => {
    cy.get("select#sort").should("exist");

    cy.get("select#sort")
      .find("option")
      .then(($options) => {
        if ($options.length > 1) {
          const secondOptionValue = $options[1].value;
          cy.get("select#sort").select(secondOptionValue);
          cy.window()
            .its("contentStore.sortOption")
            .should("eq", secondOptionValue);
        }
      });
  });

  it("resets filters when reset button is clicked", () => {
    cy.get("button").contains("Reset").click();
    cy.window()
      .its("contentStore")
      .then((store) => {
        expect(store.searchQuery).to.eq("");
        expect(store.selectedPricingOptions).to.have.length(0);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(store.minPrice).to.be.null;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(store.maxPrice).to.be.null;
      });
  });
});
