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

    existing_events
    |> Enum.sort(fn (%{"timestamp" => time1}, %{"timestamp" => time2}) ->
      time1 < time2
    end)
    |> Enum.map(fn (%{"event_type" => event_type} = event) ->
      push(socket, event_type, event)
    end)

    {:noreply, socket}
  end

  def handle_in("stroke_" <> _type = event_type, %{"color" => color} = event, socket) do
    augmented_event = event
      |> Map.put_new("event_type", event_type)
      |> Map.put_new("timestamp", System.monotonic_time())
    broadcast!(socket, event_type, augmented_event)
    Game.Registry.add_event(Game.Registry, color, augmented_event)
    {:noreply, socket}
  end
end
