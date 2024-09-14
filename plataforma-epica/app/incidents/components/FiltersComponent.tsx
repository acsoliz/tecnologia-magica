// FiltersComponent.tsx
import { Select, Space } from "antd";

const { Option } = Select;

interface FiltersComponentProps {
  statusFilter: string | undefined;
  onStatusChange: (value: string | undefined) => void;
  assignmentFilter: string | undefined;
  onAssignmentChange: (value: string | undefined) => void;
}

export const FiltersComponent: React.FC<FiltersComponentProps> = ({
  statusFilter,
  onStatusChange,
  assignmentFilter,
  onAssignmentChange,
}) => {
  return (
    <Space className="w-full justify-center">
      <Select
        placeholder="Filtrar por Estado"
        value={statusFilter}
        onChange={onStatusChange}
        className="w-40"
        allowClear
      >
        <Option value="OPEN">Abiertas</Option>
        <Option value="CLOSED">Cerradas</Option>
      </Select>
      <Select
        placeholder="Filtrar por Asignación"
        value={assignmentFilter}
        onChange={onAssignmentChange}
        className="w-40"
        allowClear
      >
        <Option value="unassigned">Sin Asignación</Option>
        <Option value="assigned_to_me">Asignadas a Mí</Option>
        <Option value="assigned_to_others">Asignadas a Otros</Option>
      </Select>
    </Space>
  );
};
