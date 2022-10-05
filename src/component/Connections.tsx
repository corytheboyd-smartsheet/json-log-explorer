import React, { FormEventHandler } from "react";
import { SidebarSection } from "../ui/SidebarSection";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useStore } from "../lib/store";
import classNames from "classnames";

const AddConnection: React.FC = () => {
  const handleCreateConnection: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("CREATE CONNECTION", event, data);
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
          <Input id="address" type="text" placeholder="localhost:3100" />
          <Button buttonClassNames="bg-green-600">Add Connection</Button>
        </div>
      </form>
    </div>
  );
};

const ConnectionList: React.FC = () => {
  const connections = useStore((state) => Object.values(state.connections));

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
          <ul>
            {connections.map((connection) => (
              <li
                key={connection.address}
                className="font-mono text-sm bg-gray-100 text-gray-800 rounded px-2 py-1"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={classNames("w-3 h-3 rounded", {
                      "bg-yellow-500 animate-ping":
                        connection.status === "initial",
                      "bg-green-500": connection.status === "open",
                      "bg-red-500": connection.status === "closed",
                    })}
                  ></div>
                  <div>{connection.address}</div>
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
