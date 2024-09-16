"use client"
import { Flex, Typography, Button, Modal } from "antd";
import { useState } from "react";
import { TableComponent } from "./components/TableComponent";
import { FiltersComponent } from "./components/FiltersComponent";
import { useIncidentLoader, useUserProfile } from "./hooks";
import protectedRoute from "@/src/components/protectedRoute";
import { PoweroffOutlined } from "@ant-design/icons";
import { useSignOutModal } from "@/app/login/hooks";


function IncidentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [assignmentFilter, setAssignmentFilter] = useState<string | undefined>(undefined);

  const { profile } = useUserProfile();
  const { incidents, totalIncidents, loading, loadIncidents } = useIncidentLoader(currentPage, statusFilter, assignmentFilter);
  const { isModalVisible, showModal, handleOk, handleCancel } = useSignOutModal(); // Usando el hook

  return (
    <Flex className="w-full h-full flex flex-col items-center pt-8 space-y-8 max-w-full overflow-x-auto" align="center">
      <Flex justify="flex-end" className="w-full pr-10">
        <Button
          icon={<PoweroffOutlined />}
          type="primary"
          danger
          onClick={showModal}
          className="flex items-center"
        >
          Cerrar sesión
        </Button>
      </Flex>

      <Typography.Title level={2}>¿Qué bug enfrentarás hoy?</Typography.Title>

      <FiltersComponent
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        assignmentFilter={assignmentFilter}
        onAssignmentChange={setAssignmentFilter}
      />

      <TableComponent
        incidents={incidents}
        totalIncidents={totalIncidents}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loadIncidents={loadIncidents}
        currentUser={profile}
      />

      <Modal
        title="Confirmación de Cierre de Sesión"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sí, cerrar sesión"
        cancelText="Cancelar"
      >
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
      </Modal>
    </Flex>
  );
}

export default protectedRoute(IncidentsPage);
