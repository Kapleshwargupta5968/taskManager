import React, { useState } from "react";
import { Button, Form, Input, Card, Typography, DatePicker } from "antd";
import { PlusOutlined, CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { createTask } from "../../services/api/taskService";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateTask = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const taskData = {
                ...values,
                deadline: values.deadline ? values.deadline.toISOString() : null
            };

            const response = await createTask(taskData);
            console.log("Task created successfully", response);
            toast.success("Task created successfully!");
            form.resetFields();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-10 px-4">
            <Card 
                className="w-full max-w-lg shadow-2xl border-none rounded-3xl overflow-hidden"
                bodyStyle={{ padding: '40px' }}
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-2xl mb-4 shadow-lg">
                        <PlusOutlined style={{ fontSize: '32px' }} />
                    </div>
                    <Title level={2} className="m-0 text-gray-800">New Task</Title>
                    <Text type="secondary">Plan and organize your work effectively</Text>
                </div>

                <Form 
                    form={form}
                    layout="vertical" 
                    onFinish={handleSubmit}
                    requiredMark={false}
                >
                    <Form.Item 
                        label={<span className="font-semibold text-gray-700">Task Title</span>}
                        name="title" 
                        rules={[{ required: true, message: "A title is required" }]}
                    >
                        <Input 
                            prefix={<EditOutlined className="text-gray-400" />} 
                            placeholder="e.g., Design Landing Page" 
                            className="h-12 rounded-xl border-gray-200 hover:border-red-400 focus:border-red-500"
                        />
                    </Form.Item>

                    <Form.Item 
                        label={<span className="font-semibold text-gray-700">Description</span>}
                        name="description" 
                        rules={[{ required: true, message: "Please add some details" }]}
                    >
                        <TextArea 
                            placeholder="What needs to be done?" 
                            rows={4} 
                            className="rounded-xl border-gray-200 hover:border-red-400 focus:border-red-500"
                        />
                    </Form.Item>

                    <Form.Item 
                        label={<span className="font-semibold text-gray-700">Deadline</span>}
                        name="deadline" 
                        rules={[{ required: true, message: "Set a target date" }]}
                    >
                        <DatePicker 
                            className="w-full h-12 rounded-xl border-gray-200 hover:border-red-400 focus:border-red-500" 
                            suffixIcon={<CalendarOutlined className="text-gray-400" />}
                        />
                    </Form.Item>

                    <Form.Item className="mt-8 mb-0">
                        <Button
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                            className="w-full h-14 text-lg font-bold bg-red-500 hover:bg-red-600 border-none rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
                        >
                            Create Task
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default CreateTask;