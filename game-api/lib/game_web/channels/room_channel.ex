defmodule GameWeb.RoomChannel do
  use GameWeb, :channel

  def join("rooms:canvas", _params, socket) do
    {:ok, socket}
  end

  def join(_room, _params, _socket) do
    {:error, %{reason: "can only join lobby"}}
  end

  def handle_in("stroke_added", stroke, socket) do
    broadcast!(socket, "stroke_added", stroke)
    {:noreply, socket}
  end

  def handle_in("stroke_started", stroke, socket) do
    broadcast!(socket, "stroke_started", stroke)
    {:noreply, socket}
  end

  def handle_in("stroke_ended", stroke, socket) do
    broadcast!(socket, "stroke_ended", stroke)
    {:noreply, socket}
  end


end
