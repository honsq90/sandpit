defmodule Game.PlayerTest do
  use ExUnit.Case, async: true

  test "stores values into array" do
    {:ok, bucket} = Game.Player.start_link([])
    assert Game.Player.get(bucket) == []

    Game.Player.put(bucket, "milk")
    assert Game.Player.get(bucket) == ["milk"]
  end
end
