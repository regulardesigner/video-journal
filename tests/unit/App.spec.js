import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import Header from "@/components/Header.vue";
import Player from "@/components/Player.vue";
import Footer from "@/components/Footer.vue";

describe("App.vue", () => {
  it("Renders Header Component", () => {
    const wrapper = shallowMount(App);
    const header = wrapper.findComponent(Header);
    expect(header.exists()).toBe(true);
  });

  it("Renders Header Component", () => {
    const wrapper = shallowMount(App);
    const player = wrapper.findComponent(Player);
    expect(player.exists()).toBe(true);
  });

  it("Renders Footer Component", () => {
    const wrapper = shallowMount(App);
    const footer = wrapper.findComponent(Footer);
    expect(footer.exists()).toBe(true);
  });
});
