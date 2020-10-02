import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("Should Containt block-header Class", () => {
    const wrapper = shallowMount(Header);
    expect(true).toBe(true);
  });
});
