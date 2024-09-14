import React from "react";
import { List, Card, Typography, Tag } from "antd";

type Incidents = {
    id: number;
	title: string;
	status: string;
	priority: string;
	assignedTo: number;
	createdAt: string;
	updatedAt: string;
	assignedUser: {
        id: number,
		username: string
	}
}

const { Title, Text } = Typography;
export const IncidentList: React.FC<{ incidents: Incidents[] }> = ({ incidents }) => {
    return (
    <>
      <Title level={2} className="mb-4">Incidentes</Title>
      <List
        itemLayout="vertical"
        dataSource={incidents}
        renderItem={(incident) => (
          <List.Item key={incident.id}>
            <Card
              hoverable
              title={<Text strong>{incident.title}</Text>}
              extra={<Tag color={incident.status === 'OPEN' ? 'green' : 'red'}>{incident.status}</Tag>}
              className="transition-shadow duration-300"
            >
              {/* <Text type="secondary">{incident.description}</Text> */}
              <br />
              <Text type="secondary" className="text-sm">{incident.createdAt}</Text>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};


