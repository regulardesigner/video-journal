import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe("Header.vue", () => {
  it("Should Containt block-footer Class", () => {
    const wrapper = shallowMount(Footer);
    const footerTag = wrapper.find(".block-footer");

    expect(footerTag.element.className).toBe("block-footer");
  });
});
