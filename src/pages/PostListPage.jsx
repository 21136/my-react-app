import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message, Modal, Table, Button, Space } from "antd";
import { useFetch } from "@/hooks/useFetch.js";
import useDebouncedValue from "@/hooks/useDebouncedValue"
import {API_BASE} from "@/config/env.js"
import "./PostListPage.css";

const POSTS_URL = `${API_BASE}/posts?_limit=50`;

export function PostPreviewButton({ post }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        预览
      </Button>
      <Modal
        title={post.title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <p>{post.body}</p>
      </Modal>
    </>
  );
}

function PostListPage() {
  const navigate = useNavigate();
  const { data: fetchedPosts, loading, error } = useFetch(POSTS_URL);
  const [form] = Form.useForm();

  const [list, setList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 300);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (fetchedPosts) setList(fetchedPosts);
  }, [fetchedPosts]);

  useEffect(() => {
    setCurrent(1);
  }, [debouncedKeyword]);

  function openCreate() {
    setEditingId(null);
    form.resetFields();
    setModalOpen(true);
  }

  function openEdit(record) {
    setEditingId(record.id);
    form.setFieldsValue({
      title: record.title,
      body: record.body,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    form.resetFields();
  }

  function handleSave(values) {
    const title = values.title.trim();
    const body = values.body.trim();

    if (editingId == null) {
      const newPost = {
        id: Date.now(),
        title,
        body,
        userId: 1,
      };
      setList((prev) => [newPost, ...prev]);
      message.success("已新建");
      setCurrent(1);
    } else {
      setList((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, title, body } : p
        )
      );
      message.success("已保存");
    }

    closeModal();
  }

  function handleDelete(id) {
    Modal.confirm({
      title: "确认删除这篇文章？",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        setList((prev) => prev.filter((p) => p.id !== id));
        message.success("已删除");
      },
    });
  }

  const filteredList = useMemo(() => {
    if (!list.length) return [];
    const q = debouncedKeyword.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => p.title.toLowerCase().includes(q));
  }, [list, debouncedKeyword]);

  const pageData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, current, pageSize]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <Link to={`/posts/${record.id}`}>{title}</Link>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/posts/${record.id}`)}>
            查看
          </Button>
          <Button type="link" onClick={() => openEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  if (error) return <p>错误：{error}</p>;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreate}>
          新建文章
        </Button>
        <Input
          allowClear
          placeholder="搜索标题…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 280 }}
        />
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={pageData}
        loading={loading}
        locale={{
          emptyText: debouncedKeyword ? "没有匹配的文章" : "暂无数据",
        }}
        pagination={{
          current,
          pageSize,
          total: filteredList.length,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
          },
        }}
      />

      <Modal
        title={editingId == null ? "新建文章" : "编辑文章"}
        open={modalOpen}
        onCancel={closeModal}
        onOk={() => form.submit()}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="正文"
            name="body"
            rules={[{ required: true, message: "请输入正文" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PostListPage;
