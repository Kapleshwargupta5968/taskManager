import React from 'react';
import { Row, Col, Typography, Space, Input, Button } from 'antd';
import { 
  GithubOutlined, 
  TwitterOutlined, 
  LinkedinOutlined, 
  InstagramOutlined,
  SendOutlined
} from '@ant-design/icons';

const { Title, Text, Link, Paragraph } = Typography;

const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 py-24 px-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[64, 48]}>
          {/* Brand Column */}
          <Col xs={24} lg={8}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/10">
                  <span className="text-white font-black text-lg">T</span>
                </div>
                <Title level={4} className="!text-white !mb-0 !font-bold tracking-tight">TaskManager<span className="text-purple-500">.</span></Title>
              </div>
              <Paragraph className="text-gray-500 leading-relaxed max-w-sm text-base">
                Building the next generation of productivity tools. Designed for teams who value speed, privacy, and beautiful design.
              </Paragraph>
              <Space size="large" className="mt-8">
                <Link href="#" className="text-gray-600 hover:text-white transition-all text-xl"><TwitterOutlined /></Link>
                <Link href="#" className="text-gray-600 hover:text-white transition-all text-xl"><GithubOutlined /></Link>
                <Link href="#" className="text-gray-600 hover:text-white transition-all text-xl"><LinkedinOutlined /></Link>
                <Link href="#" className="text-gray-600 hover:text-white transition-all text-xl"><InstagramOutlined /></Link>
              </Space>
            </div>
          </Col>

          {/* Links Columns */}
          <Col xs={12} sm={6} lg={4}>
            <Title level={5} className="!text-white mb-8 !text-sm !font-black uppercase tracking-widest">Product</Title>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Features</Link></li>
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Integrations</Link></li>
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Pricing</Link></li>
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Changelog</Link></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <Title level={5} className="!text-white mb-8 !text-sm !font-black uppercase tracking-widest">Company</Title>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">About Us</Link></li>
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Careers</Link></li>
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Privacy</Link></li>
              <li><Link href="#" className="!text-gray-500 hover:!text-purple-400 transition-colors text-base font-medium">Contact</Link></li>
            </ul>
          </Col>

          {/* Newsletter Column */}
          <Col xs={24} lg={8}>
            <Title level={5} className="!text-white mb-8 !text-sm !font-black uppercase tracking-widest">Newsletter</Title>
            <Paragraph className="text-gray-500 mb-8 text-base">
              Get weekly insights on how to optimize your workflow and team performance.
            </Paragraph>
            <div className="flex gap-2 h-14">
              <input 
                type="email"
                placeholder="you@example.com" 
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 text-white outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-500"
              />
              <button 
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr from-pink-600 to-purple-700 text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
              >
                <SendOutlined className="text-xl" />
              </button>
            </div>
          </Col>
        </Row>

        <div className="border-t border-white/5 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-pink-500">❤️</span>
            <Text className="text-gray-600 text-sm font-medium">
              Designed for the modern professional. © 2026 TaskManager.
            </Text>
          </div>
          <Space size="xl" className="text-sm">
            <Link href="#" className="!text-gray-600 hover:!text-white transition-colors">Privacy</Link>
            <Link href="#" className="!text-gray-600 hover:!text-white transition-colors">Terms</Link>
            <Link href="#" className="!text-gray-600 hover:!text-white transition-colors">Cookies</Link>
          </Space>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
