import { Table, Tag, Button, Space, message, Flex, Popconfirm } from "antd";
import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { useIncidentActions } from "../hooks"; // Ajusta la ruta según sea necesario

type User = {
  username: string;
  id: number;
  role: string;
}

interface TableComponentProps {
  incidents: any[];
  totalIncidents: number;
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loadIncidents: () => void;
  currentUser: any;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  incidents,
  totalIncidents,
  loading,
  currentPage,
  setCurrentPage,
  loadIncidents,
  currentUser,
}) => {
  const {
    handleAssignIncident,
    handleUpdateIncidentStatus,
    assigningIncident,
    updatingIncidentStatus,
  } = useIncidentActions(loadIncidents);

  const columns = [
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Título de la Incidencia",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Space>
          <Tag color={status === "OPEN" ? "green" : "red"}>{status}</Tag>
          {status === "OPEN" && (
            <Flex>
              <Popconfirm
                title="Vas a cerrar la incidencia, ¿estás seguro?"
                onConfirm={() => handleUpdateIncidentStatus(record.id, "CLOSED")}
                okText="Sí"
                cancelText="No"
              >
                <Button
                  disabled={updatingIncidentStatus}
                  icon={<CheckOutlined />}
                >
                  Cerrar
                </Button>
              </Popconfirm>
            </Flex>
          )}
        </Space>
      ),
    },
    {
      title: "Persona Asignada",
      dataIndex: ["assignedUser"],
      key: "assignedUser",
      render: (assignedUser: User | null, record: any) => (
        <Space>
          <span>{assignedUser?.username || "Sin Asignación"}</span>
          {(!assignedUser || assignedUser?.username !== currentUser?.username) && (
            <Button
              icon={<UserOutlined />}
              onClick={() => handleAssignIncident(record.id)}
              disabled={assigningIncident}
            >
              Asignarme
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
    },
  ];

  return (
    <Table
      dataSource={incidents}
      columns={columns}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: 10,
        total: totalIncidents,
        onChange: (page) => setCurrentPage(page),
      }}
      loading={loading || assigningIncident || updatingIncidentStatus}
      className="w-11/12 overflow-x-auto"
      scroll={{ x: true }}
    />
  );
};
