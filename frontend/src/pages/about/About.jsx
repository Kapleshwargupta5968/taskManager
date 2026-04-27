import React from 'react';
import { Row, Col, Typography, Space, Card, Avatar, Tag } from 'antd';
import { 
  HeartOutlined, 
  GlobalOutlined, 
  RocketOutlined, 
  SafetyCertificateOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const About = () => {
  const values = [
    {
      title: "Simplicity First",
      desc: "We believe complexity is the enemy of productivity. Our tools are designed to be intuitive and invisible.",
      icon: <RocketOutlined />,
      color: "#ff0080"
    },
    {
      title: "Privacy by Design",
      desc: "Your data belongs to you. We use end-to-end encryption to ensure your thoughts stay private.",
      icon: <SafetyCertificateOutlined />,
      color: "#7928ca"
    },
    {
      title: "Global Collaboration",
      desc: "Built for the remote-first world, enabling teams to sync across timezones without missing a beat.",
      icon: <GlobalOutlined />,
      color: "#0070f3"
    }
  ];

  const team = [
    { name: "Alex Rivera", role: "Founder & CEO", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    { name: "Sarah Chen", role: "Head of Design", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { name: "Marcus Thorne", role: "CTO", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
    { name: "Elena Vogt", role: "Product Manager", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" }
  ];

  return (
    <div className="bg-[#020202] min-h-screen text-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-32 text-center max-w-4xl mx-auto">
        <Tag color="purple" className="mb-8 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs border-none bg-purple-500/20 text-purple-400">
           OUR MISSION
        </Tag>
        <Title className="!text-white !text-6xl md:!text-8xl !font-black !mb-8 leading-tight tracking-tighter">
          We're building the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            future of focus.
          </span>
        </Title>
        <Paragraph className="!text-gray-400 !text-xl md:!text-2xl leading-relaxed">
          In a world of constant distractions, TaskManager was born from a simple idea: 
          technology should help you do your best work, not keep you busy.
        </Paragraph>
      </section>

      {/* Values Section */}
      <section className="px-6 mb-40 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Title level={2} className="!text-white !text-4xl font-bold">Our Core Values</Title>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>
        <Row gutter={[40, 40]}>
          {values.map((v, i) => (
            <Col xs={24} md={8} key={i}>
              <div className="h-full bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 bg-white/5 transition-transform group-hover:scale-110" style={{ color: v.color }}>
                  {v.icon}
                </div>
                <Title level={3} className="!text-white mb-4">{v.title}</Title>
                <Paragraph className="!text-gray-500 text-lg leading-relaxed">{v.desc}</Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Story Section */}
      <section className="px-6 mb-40 bg-gradient-to-b from-white/[0.02] to-transparent py-32 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-grow">
            <Title level={2} className="!text-white !text-4xl md:!text-5xl !font-black mb-8">Our Story</Title>
            <Paragraph className="!text-gray-400 text-lg leading-relaxed mb-6">
              It started in a small apartment in 2024. We were tired of productivity apps that felt like data entry chores. 
              We wanted something that felt like an extension of our own minds—something that understood priority, 
              energy levels, and the flow of creative work.
            </Paragraph>
            <Paragraph className="!text-gray-400 text-lg leading-relaxed">
              Today, TaskManager is used by thousands of creators and teams worldwide. 
              We're still that same small team, obsessing over every pixel and every micro-second of performance.
            </Paragraph>
          </div>
          <div className="w-full md:w-[400px] aspect-square rounded-[60px] bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
             <Title className="!text-white !text-8xl !font-black opacity-10 group-hover:scale-125 transition-transform duration-700">T</Title>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                   <HeartOutlined className="text-pink-500 text-4xl animate-pulse" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 max-w-7xl mx-auto text-center pb-32">
        <Title level={2} className="!text-white !text-4xl font-bold mb-20">Meet the Builders</Title>
        <Row gutter={[48, 48]}>
          {team.map((person, i) => (
            <Col xs={12} md={6} key={i}>
              <div className="group cursor-default">
                <div className="relative mb-8 inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                  <Avatar 
                    src={person.img} 
                    size={160} 
                    className="relative rounded-[40px] border-2 border-white/10 p-2 bg-zinc-900 group-hover:border-purple-500 transition-colors"
                  />
                </div>
                <Title level={4} className="!text-white mb-1">{person.name}</Title>
                <Text className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{person.role}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default About;
