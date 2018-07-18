defmodule GameWeb.RoomChannel do
  use GameWeb, :channel

  def join("rooms:canvas", %{"color" => color}, socket) do
    Game.Registry.create(Game.Registry, color)
    {:ok, socket}
  end

  def join(_room, _params, _socket) do
    {:error, %{reason: "can only join lobby"}}
  end

  def handle_in("stroke_started", %{"color" => color} = stroke, socket) do
    broadcast!(socket, "stroke_started", stroke)
    Game.Registry.add_event(Game.Registry, color, stroke);
    {:noreply, socket}
  end

  def handle_in("stroke_added", %{"color" => color} = stroke, socket) do
    broadcast!(socket, "stroke_added", stroke)
    Game.Registry.add_event(Game.Registry, color, stroke);
    {:noreply, socket}
  end

  def handle_in("stroke_ended", %{"color" => color} = stroke, socket) do
    broadcast!(socket, "stroke_ended", stroke)
    Game.Registry.add_event(Game.Registry, color, stroke);
    {:noreply, socket}
  end

end
