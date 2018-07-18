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

  test "gets all events", %{registry: registry} do
    Game.Registry.create(registry, "player1")
    assert {:ok, player1} = Game.Registry.lookup(registry, "player1")
    Game.Player.put(player1, "milk")
    Game.Registry.create(registry, "player2")
    assert {:ok, player2} = Game.Registry.lookup(registry, "player2")
    Game.Player.put(player2, "milk2")

    assert {:ok, events} = Game.Registry.get_all_events(registry, "aa")
    assert events == ["milk", "milk2"]

    assert {:ok, events} = Game.Registry.get_all_events(registry, "player1")
    assert events == ["milk2"]

    assert {:ok, events} = Game.Registry.get_all_events(registry, "player2")
    assert events == ["milk"]
  end

  test "removes players on exit", %{registry: registry} do
    Game.Registry.create(registry, "shopping")
    {:ok, player} = Game.Registry.lookup(registry, "shopping")
    Agent.stop(player)
    assert Game.Registry.lookup(registry, "shopping") == :error
  end

  test "removes player on crash", %{registry: registry} do
    Game.Registry.create(registry, "shopping")
    {:ok, player} = Game.Registry.lookup(registry, "shopping")

    # Stop the player with non-normal reason
    Agent.stop(player, :shutdown)
    assert Game.Registry.lookup(registry, "shopping") == :error
  end
end
