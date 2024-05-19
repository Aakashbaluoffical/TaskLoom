import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  List,
  Modal,
  Form,
  DatePicker,
  Select,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./styles.css";

const { Option } = Select;
const priorityOptions = [
  {
    value: "low",
    label: "Low",
    color: "#52c41a",
    icon: <CheckCircleOutlined />,
  },
  {
    value: "medium",
    label: "Medium",
    color: "#faad14",
    icon: <ExclamationCircleOutlined />,
  },
  {
    value: "high",
    label: "High",
    color: "#f5222d",
    icon: <CloseCircleOutlined />,
  },
];

const MyTasks = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
  };

  const handleCreateTask = (values) => {
    console.log("Received values of form: ", values);
    // Add logic to create the task, e.g., send a request to the server
    const newTask = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate,
      priority: values.priority,
      status: "Pending", // Assuming the initial status is "Pending"
    };
    setTasks([...tasks, newTask]); // Add the new task to the list of tasks
    setShowCreateForm(false);
  };

  return (
    <div className="my-tasks">
      <header className="my-tasks-header">
        <h2>My Tasks</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleCreateClick}
        >
          Create
        </Button>
      </header>
      <div className="search-filter">
        <Input
          placeholder="Search tasks..."
          prefix={<SearchOutlined />}
          size="large"
          style={{ flex: 1, marginRight: "10px" }}
        />
        <Button icon={<FilterOutlined />} size="large">
          Filter
        </Button>
      </div>

      <Card className="task-list">
        <List
          grid={{ gutter: 24, column: 4 }}
          // dataSource={[] /* Add your tasks here */}
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item key={task.title}>
              <Card className="list-item" title={task.title}>
                <p>{task.description}</p>
                <p>Due: {moment(task.dueDate).format("DD-MM-YYYY")}</p>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
              </Card>
            </List.Item>
          )}
        />
      </Card>
      {/* Create Task Form Modal */}
      <Modal
        title="Create Task"
        open={showCreateForm}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="createTaskForm" onFinish={handleCreateTask}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter the task title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the task description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select the priority!" }]}
          >
            <Select>
              {/* <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option> */}
              {priorityOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  <span style={{ color: option.color }}>
                    {option.icon}&nbsp;{option.label}
                  </span>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyTasks;
