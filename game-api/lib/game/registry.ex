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
  Stops the registry.
  """
  def stop(server) do
    GenServer.stop(server)
  end

  @doc """
  Looks up the player pid for `player` stored in `server`.

  Returns `{:ok, pid}` if the player exists, `:error` otherwise.
  """
  def lookup(server, player) do
    GenServer.call(server, {:lookup, player})
  end

  @doc """
  Get all events for other players

  """
  def get_all_events(server, player) do
    GenServer.call(server, {:all_events, player})
  end

  @doc """
  Adds event for the player
  """
  def add_event(server, player, event) do
    GenServer.cast(server, {:add_event, player, event})
  end

  @doc """
  Ensures there is a player associated with the given `player` in `server`.
  """
  def create(server, player) do
    GenServer.cast(server, {:create, player})
  end

  ## Server Callbacks

  def init(:ok) do
    players = %{}
    refs = %{}
    {:ok, {players, refs}}
  end

  def handle_call({:lookup, player}, _from, {players, _} = state) do
    {:reply, Map.fetch(players, player), state}
  end

  def handle_call({:all_events, exclude}, _from, {players, _} = state) do
    all_events = Map.to_list(players)
    |> Enum.filter(fn ({player, _pid}) -> player != exclude end)
    |> Enum.flat_map(fn ({_player, player_pid}) -> Game.Player.get(player_pid) end)

    {:reply, {:ok, all_events}, state}
  end

  def handle_cast({:create, player}, {players, refs}) do
    if Map.has_key?(players, player) do
      {:noreply, {players, refs}}
    else
      {:ok, pid} = DynamicSupervisor.start_child(Game.PlayerSupervisor, Game.Player)
      ref = Process.monitor(pid)
      refs = Map.put(refs, ref, player)
      players = Map.put(players, player, pid)
      {:noreply, {players, refs}}
    end
  end

  def handle_cast({:add_event, player, event}, {players, refs}) do
    if Map.has_key?(players, player) do
      player_pid = Map.get(players, player)
      Game.Player.put(player_pid, event)
    end
    {:noreply, {players, refs}}
  end

  def handle_info({:DOWN, ref, :process, _pid, _reason}, {players, refs}) do
    {player, refs} = Map.pop(refs, ref)
    players = Map.delete(players, player)
    {:noreply, {players, refs}}
  end

  def handle_info(_msg, state) do
    {:noreply, state}
  end
end
