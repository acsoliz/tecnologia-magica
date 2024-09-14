"use client";

import { Flex, Typography, Button, Modal } from "antd";
import { useState } from "react";
import { TableComponent } from "./components/TableComponent";
import { FiltersComponent } from "./components/FiltersComponent";
import { useIncidentLoader, useUserProfile } from "./hooks";
import protectedRoute from "@/src/components/protectedRoute";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { PoweroffOutlined } from "@ant-design/icons";

type User = {
  username: string;
  id: number;
  role: string;
}

function IncidentsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [assignmentFilter, setAssignmentFilter] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Usa el hook para cargar el perfil del usuario
  const { profile, loading: profileLoading, error: profileError } = useUserProfile();
  // Usa el hook para cargar las incidencias
  const { incidents, totalIncidents, loading, loadIncidents, error } = useIncidentLoader(currentPage, statusFilter, assignmentFilter);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    signOut();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function signOut() {
    if (getCookie("userToken")) deleteCookie("userToken");
    router.replace("/login");
  }

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

      {/* Filtros */}
      <FiltersComponent
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        assignmentFilter={assignmentFilter}
        onAssignmentChange={setAssignmentFilter}
      />

      {/* Tabla de Incidencias */}
      <TableComponent
        incidents={incidents}
        totalIncidents={totalIncidents}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loadIncidents ={loadIncidents}
        currentUser={profile}
      />

      {/* Modal de confirmación */}
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
