defmodule IslandsInterfaceWeb.GameChannel do
  use IslandsInterfaceWeb, :channel

  alias IslandsEngine.{Game, GameSupervisor}

  def join("game:" <> _plauer, _payload, socket) do
    {:ok, socket}
  end

  def handle_in("hello", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end
end
