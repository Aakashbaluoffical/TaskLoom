import React from "react";
import { Row, Col, Card, Button, ConfigProvider, Input } from "antd";
import { PlusSquareOutlined, FilterOutlined } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";
import "./styles.css";

const MyTasks = () => {
  const { Search } = Input;

  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <Row gutter={24} style={{ display: "flex" }}>
        <Card className="cardStyle">
          <Row gutter={24}>
            <Col span={4}>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                        ", "
                      )})`,
                      colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                        colors3
                      ).join(", ")})`,
                      colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                        colors3
                      ).join(", ")})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  size="medium"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Create
                  <PlusSquareOutlined />
                </Button>
              </ConfigProvider>
            </Col>
            <Col span={16}>
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ width: "80%" }}
                enterButton
              />
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                size="medium"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Filter
                <FilterOutlined />
              </Button>
            </Col>
          </Row>
        </Card>
        <Card className="cardStyle"></Card>
        <Card className="cardStyle"></Card>
      </Row>
    </>
  );
};

export default MyTasks;
