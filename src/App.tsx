import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import AppRoutes from "./routes/AppRoutes";

const theme = {
  token: {
    colorPrimary: "#2563eb",
    borderRadius: 8,
    fontFamily:
      "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

function App() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <ConfigProvider theme={theme} direction={direction}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
