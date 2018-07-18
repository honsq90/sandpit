defmodule GameWeb.RoomChannel do
  use GameWeb, :channel

  def join("rooms:canvas", _params, socket) do
    {:ok, socket}
  end

  def join(_room, _params, _socket) do
    {:error, %{reason: "can only join lobby"}}
  end

  def handle_in("stroke_added", stroke, socket) do
    broadcast!(socket, "draw_stroke", stroke)
    {:noreply, socket}
  end

  # def handle_in("stroke_added", %{ "x" => x, "y" => y }, socket) do
  #   broadcast!(socket, "draw_stroke", %{ x: x, y: y, color: socket.assigns[:color]})
  #   {:noreply, socket}
  # end

end
