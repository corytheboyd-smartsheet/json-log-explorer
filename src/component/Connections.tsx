import React, { FormEventHandler } from "react";
import { SidebarSection } from "../ui/SidebarSection";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import classNames from "classnames";
import { useStore } from "../lib/store/useStore";

const AddConnection: React.FC = () => {
  const addConnection = useStore((state) => state.addConnection);

  const handleCreateConnection: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address = data.get("address") as string;
    addConnection(address);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <p className="font-bold">Add Connection</p>
        <p className="italic text-xs text-gray-400">
          Address of Websocket server emitting log data
        </p>
      </div>
      <form onSubmit={handleCreateConnection}>
        <div className="flex flex-col space-y-2">
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="localhost:3100"
          />
          <Button buttonClassNames="bg-green-600">Add Connection</Button>
        </div>
      </form>
    </div>
  );
};

const ConnectionList: React.FC = () => {
  const connections = useStore((state) => Object.values(state.connections));
  const removeConnection = useStore((state) => state.removeConnection);
  const resetConnection = useStore((state) => state.resetConnection);

  const areConnectionsPresent = connections.length > 0;

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <p className="font-bold">Connections</p>
        {!areConnectionsPresent && (
          <p className="italic text-xs text-gray-400">No connections added</p>
        )}
        {areConnectionsPresent && (
          <p className="italic text-xs text-gray-400">
            List of connections to receive logs from
          </p>
        )}
      </div>
      {areConnectionsPresent && (
        <div>
          <ul className="space-y-1">
            {connections.map((connection) => (
              <li
                key={connection.socket.address}
                className="font-mono text-xs bg-gray-100 text-gray-800 p-1 rounded"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={classNames("w-3 h-3 rounded", {
                      "bg-yellow-500 animate-ping":
                        connection.status === "initial",
                      "bg-green-500": connection.status === "open",
                      "bg-red-500 animate-ping": connection.status === "closed",
                    })}
                  ></div>
                  <div className="flex-grow">{connection.socket.address}</div>
                  <div className="flex space-x-1">
                    <button
                      className="bg-blue-400 hover:bg-blue-500 w-10 rounded text-white"
                      onClick={() => resetConnection(connection.socket.address)}
                    >
                      Con
                    </button>
                    <button
                      className="bg-red-400 hover:bg-red-500 w-10 rounded text-white"
                      onClick={() =>
                        removeConnection(connection.socket.address)
                      }
                    >
                      Del
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Connections: React.FC = () => {
  return (
    <SidebarSection title="Connections">
      <div className="flex flex-col space-y-5">
        <AddConnection />
        <ConnectionList />
      </div>
    </SidebarSection>
  );
};
