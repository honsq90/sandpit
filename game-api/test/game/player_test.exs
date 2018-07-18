defmodule Game.PlayerTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, player} = Game.Player.start_link([])
    %{player: player}
  end

  test "stores values into array", %{player: player} do
    assert Game.Player.get(player) == []

    Game.Player.put(player, "milk")
    assert Game.Player.get(player) == ["milk"]
  end
end
