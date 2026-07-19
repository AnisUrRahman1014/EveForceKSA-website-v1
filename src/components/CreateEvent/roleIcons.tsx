import {
  CameraOutlined,
  NotificationOutlined,
  VideoCameraOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
  IdcardOutlined,
  CoffeeOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const getRoleIcon = (roleType: string) => {
  switch (roleType) {
    case "Photographer":
      return <CameraOutlined />;
    case "Event Host":
      return <NotificationOutlined />;
    case "Videographer":
      return <VideoCameraOutlined />;
    case "Musician":
      return <CustomerServiceOutlined />;
    case "Stage Crew":
      return <ToolOutlined />;
    case "VIP Coordinator":
      return <IdcardOutlined />;
    case "Catering Staff":
      return <CoffeeOutlined />;
    default:
      return <UserOutlined />;
  }
};
