import React, { useState, useEffect } from 'react';
import { Card, Button, Tag, Typography, Tooltip, Empty, Row, Col, Badge, Divider, Modal, Form, Input, DatePicker } from 'antd';
import { 
  CheckCircleOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CalendarOutlined
} from '@ant-design/icons';
import { getTasks, updateTask, deleteTask } from '../../services/api/taskService';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const showEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      deadline: task.deadline ? dayjs(task.deadline) : null
    });
  };

  const handleUpdate = async (values) => {
    try {
      const updatedData = {
        ...values,
        deadline: values.deadline ? values.deadline.toISOString() : null
      };
      await updateTask(editingTask._id, updatedData);
      toast.success("Task updated successfully!");
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedStatus = !task.isCompleted;
      await updateTask(task._id, { isCompleted: updatedStatus });
      toast.success(updatedStatus ? "Task completed!" : "Task set to pending");
      fetchTasks(); 
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Title level={2} className="m-0 text-gray-800">My Tasks</Title>
          <Text type="secondary">Manage and track your progress</Text>
        </div>
        <Badge count={tasks.length} overflowCount={99} style={{ backgroundColor: '#f5222d' }}>
            <div className="px-3" />
        </Badge>
      </div>

      {tasks.length === 0 && !loading ? (
        <Empty description="No tasks found" />
      ) : (
        <Row gutter={[24, 24]}>
          {tasks.map((task) => (
            <Col xs={24} sm={12} lg={8} key={task._id}>
              <Card
                hoverable
                loading={loading}
                className={`rounded-2xl shadow-md border-none overflow-hidden h-full transition-all duration-300 ${task.isCompleted ? 'bg-gray-50' : 'bg-white'}`}
                bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <Tag color={task.isCompleted ? "success" : "processing"} className="rounded-full px-3">
                    {task.isCompleted ? "Completed" : "In Progress"}
                  </Tag>
                  <Tooltip title="Delete Task">
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleDelete(task._id)}
                    />
                  </Tooltip>
                </div>

                <Title level={4} delete={task.isCompleted} className={`mb-2 ${task.isCompleted ? 'text-gray-400' : ''}`}>
                  {task.title}
                </Title>

                <Paragraph type="secondary" ellipsis={{ rows: 2 }} className="mb-4">
                  {task.description}
                </Paragraph>

                <div className="flex items-center text-gray-500 text-xs mb-4">
                  <CalendarOutlined className="mr-2" />
                  <span>Deadline: {new Date(task.deadline).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                </div>

                <Divider className="my-4" />

                <div className="mt-auto flex gap-3">
                  <Button 
                    type={task.isCompleted ? "default" : "primary"}
                    className={`flex-grow rounded-xl h-10 font-medium ${!task.isCompleted ? 'bg-green-500 hover:bg-green-600 border-none' : ''}`}
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleToggleComplete(task)}
                  >
                    {task.isCompleted ? "Undo" : "Complete"}
                  </Button>
                  <Tooltip title="Edit Task">
                    <Button 
                      className="rounded-xl h-10 w-10 flex items-center justify-center" 
                      icon={<EditOutlined />} 
                      onClick={() => showEditModal(task)}
                    />
                  </Tooltip>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Modal */}
      <Modal
        title={<Title level={3}>Edit Task</Title>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        centered
        className="rounded-3xl"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate} className="pt-4">
          <Form.Item label={<span className="font-semibold">Task Title</span>} name="title" rules={[{ required: true }]}>
            <Input placeholder="What are you working on?" className="rounded-lg h-11" />
          </Form.Item>
          <Form.Item label={<span className="font-semibold">Description</span>} name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Add some details..." rows={4} className="rounded-lg" />
          </Form.Item>
          <Form.Item label={<span className="font-semibold">Deadline</span>} name="deadline" rules={[{ required: true }]}>
            <DatePicker className="w-full h-11 rounded-lg" />
          </Form.Item>
          <div className="flex gap-3 mt-6">
            <Button className="flex-grow h-12 rounded-xl" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="flex-grow h-12 bg-blue-500 rounded-xl font-bold border-none">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewTask;