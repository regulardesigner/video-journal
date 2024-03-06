import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe("Footer.vue", () => {
  it("Should Containt block-footer Class", () => {
    const wrapper = shallowMount(Footer);
    const footerTag = wrapper.find(".block-footer");

    expect(footerTag.element.className).toBe("block-footer");
  });

  it("Should render a copyright notice", () => {
    const wrapper = shallowMount(Footer);
    const copyrightNotice = wrapper.find(".copyright");

    expect(copyrightNotice.exists()).toBe(true);
    expect(copyrightNotice.text()).toContain("©");
  });

  it("Should have a link to the privacy policy", () => {
    const wrapper = shallowMount(Footer);
    const privacyPolicyLink = wrapper.find(".privacy-policy");

    expect(privacyPolicyLink.exists()).toBe(true);
    expect(privacyPolicyLink.attributes("href")).toBe("/privacy-policy");
  });

  it("Should have a link to the terms of service", () => {
    const wrapper = shallowMount(Footer);
    const termsOfServiceLink = wrapper.find(".terms-of-service");

    expect(termsOfServiceLink.exists()).toBe(true);
    expect(termsOfServiceLink.attributes("href")).toBe("/terms-of-service");
  });
});
