defmodule Game.RegistryTest do
  use ExUnit.Case, async: true

  setup do
    registry = start_supervised!(Game.Registry)
    %{registry: registry}
  end

  test "spawns players", %{registry: registry} do
    assert Game.Registry.lookup(registry, "shopping") == :error

    Game.Registry.create(registry, "shopping")
    assert {:ok, player} = Game.Registry.lookup(registry, "shopping")

    Game.Player.put(player, "milk")
    assert Game.Player.get(player) == ["milk"]
  end
end
