defmodule Game.Supervisor do
  use Supervisor

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, :ok, opts)
  end

  def init(:ok) do
    children = [
      {DynamicSupervisor, name: Game.PlayerSupervisor, strategy: :one_for_one},
      {Game.Registry, name: Game.Registry}
    ]

    Supervisor.init(children, strategy: :one_for_all)
  end
end
