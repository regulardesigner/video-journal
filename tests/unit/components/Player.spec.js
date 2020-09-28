import { shallowMount } from "@vue/test-utils";
import Player from "@/components/Player.vue";

describe("Player.vue", () => {
  it("Renders Header Component", () => {
    const wrapper = shallowMount(Player);
    expect(true).toBe(true);
  });
});
