defmodule GameWeb.RoomChannel do
  use GameWeb, :channel

  def join("rooms:canvas", %{"color" => color} = params, socket) do
    Game.Registry.create(Game.Registry, color)
    send(self(), {:after_join, params})
    {:ok, socket}
  end

  def join(_room, _params, _socket) do
    {:error, %{reason: "can only join lobby"}}
  end

  def handle_info({:after_join, %{"color" => color}}, socket) do
    {:ok, existing_events} = Game.Registry.get_all_events(Game.Registry, color)

    Enum.map(existing_events, fn (%{"event_type" => event_type} = event) ->
      push(socket, event_type, event)
    end)

    {:noreply, socket}
  end

  def handle_in("stroke_" <> _type = event_type, %{"color" => color} = event, socket) do
    broadcast!(socket, event_type, event)
    event_store = Map.put_new(event, "event_type", event_type)
    Game.Registry.add_event(Game.Registry, color, event_store)
    {:noreply, socket}
  end
end
