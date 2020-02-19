defmodule IslandsInterfaceWeb.GameChannel do
  use IslandsInterfaceWeb, :channel
  alias IslandsInterfaceWeb.Presence

  alias IslandsEngine.{Game, GameSupervisor}

  def join("game:lobby", payload, socket) do
      IO.inspect(payload)
      send(self(), :after_join)
      
      {:ok, :ok, assign(socket, :user_id, 10)}
  end

  def join("game:" <> _player, _payload, socket) do
    send(self(), :after_join)
    {:ok, :ok, assign(socket, :user_id, :rand.phash2(10))}
  end

  def handle_in("hello", payload, socket) do
    {:reply, {:ok, %{message: "Hello"}}, socket}
  end

  def handle_info(:after_join, socket) do
      push(socket, "presence_state", Presence.list(socket))
      {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
          online_at: inspect(System.system_time(:second))
      })
      broadcast!(socket, "join", %{body: "body"})
      {:noreply, socket}
  end

  def handle_in("join", _payload, socket) do
    {:reply, :ok, socket}
  end
end
