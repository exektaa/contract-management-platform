import { useEffect, useState } from "react";
import type { Contract, ContractStatus } from "./models";
import { loadContracts, saveContracts } from "./storage";

const transitions: Record<ContractStatus, ContractStatus[]> = {
  CREATED: ["APPROVED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: []
};

export default function ContractDashboard() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    setContracts(loadContracts());
  }, []);

  const createContract = () => {
    const newContract: Contract = {
      id: Date.now().toString(),
      name: "Employment Agreement",
      blueprintName: "Standard Template",
      status: "CREATED",
      createdAt: new Date().toISOString()
    };

    const updated = [...contracts, newContract];
    setContracts(updated);
    saveContracts(updated);
  };

  const updateStatus = (id: string, status: ContractStatus) => {
    const updated = contracts.map(c =>
      c.id === id ? { ...c, status } : c
    );
    setContracts(updated);
    saveContracts(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contract Management Dashboard</h2>

      <button onClick={createContract}>Create Contract</button>

      <ul>
        {contracts.map(contract => (
          <li key={contract.id} style={{ marginTop: "10px" }}>
            <strong>{contract.name}</strong> <br />
            Status: {contract.status}

            <div>
              {transitions[contract.status].map(next => (
                <button
                  key={next}
                  onClick={() => updateStatus(contract.id, next)}
                  style={{ marginRight: "5px" }}
                >
                  Move to {next}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
