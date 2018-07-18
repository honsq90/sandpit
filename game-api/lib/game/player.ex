defmodule Game.Player do
  use Agent, restart: :temporary

  @doc """
  Starts a new player.
  """
  def start_link(_opts) do
    Agent.start_link(fn -> [] end)
  end

  @doc """
  Gets a value from the `player` by `key`.
  """
  def get(player) do
    Agent.get(player, fn (state) -> state end)
  end

  @doc """
  Puts the `value` for the given `key` in the `player`.
  """
  def put(player, value) do
    Agent.update(player, fn (state) -> state ++ [value] end)
  end
end
