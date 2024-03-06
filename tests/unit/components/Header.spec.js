import { mount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  describe("Header.vue", () => {
    it("emits 'handle-navigation' event when button is clicked", () => {
      const wrapper = mount(Header);
      const button = wrapper.find("button");

      button.trigger("click");

      expect(wrapper.emitted("handle-navigation")).toBeTruthy();
    });
  });
});
