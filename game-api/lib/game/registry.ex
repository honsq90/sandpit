defmodule Game.Registry do
  use GenServer

  ## Client API

  @doc """
  Starts the registry.
  """
  def start_link(opts) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  @doc """
  Looks up the player pid for `name` stored in `server`.

  Returns `{:ok, pid}` if the player exists, `:error` otherwise.
  """
  def lookup(server, name) do
    GenServer.call(server, {:lookup, name})
  end

  @doc """
  Ensures there is a player associated with the given `name` in `server`.
  """
  def create(server, name) do
    GenServer.cast(server, {:create, name})
  end

  ## Server Callbacks

  def init(:ok) do
    {:ok, %{}}
  end

  def handle_call({:lookup, name}, _from, players) do
    {:reply, Map.fetch(players, name), players}
  end

  def handle_cast({:create, name}, players) do
    if Map.has_key?(players, name) do
      {:noreply, players}
    else
      {:ok, player} = Game.Player.start_link([])
      {:noreply, Map.put(players, name, player)}
    end
  end
end
