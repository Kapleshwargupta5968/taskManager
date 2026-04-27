import React from 'react';
import { Row, Col, Typography, Space, Button, Tag } from 'antd';
import { 
  ThunderboltOutlined, 
  CloudSyncOutlined, 
  LockOutlined, 
  BarChartOutlined,
  BulbOutlined,
  CompassOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const Features = () => {
  const navigate = useNavigate();

  const featureList = [
    {
      title: "AI Smart Scheduling",
      desc: "Our neural engine learns your peak productivity hours and automatically suggests the best time for deep work tasks.",
      icon: <BulbOutlined />,
      gradient: "from-amber-400 to-orange-500",
      shadow: "rgba(245, 158, 11, 0.2)"
    },
    {
      title: "Real-time Team Sync",
      desc: "Collaborate effortlessly with instant updates. See what your team is working on without ever sending a 'status update' ping.",
      icon: <CloudSyncOutlined />,
      gradient: "from-blue-400 to-indigo-600",
      shadow: "rgba(59, 130, 246, 0.2)"
    },
    {
      title: "Deep Work Mode",
      desc: "Activate zen with a single click. Silence notifications and focus on a single task with our distraction-free interface.",
      icon: <ThunderboltOutlined />,
      gradient: "from-pink-500 to-rose-600",
      shadow: "rgba(244, 63, 94, 0.2)"
    },
    {
      title: "Advanced Analytics",
      desc: "Visualize your progress with beautiful heatmaps and velocity charts. Identify bottlenecks and optimize your output.",
      icon: <BarChartOutlined />,
      gradient: "from-emerald-400 to-teal-600",
      shadow: "rgba(16, 185, 129, 0.2)"
    },
    {
      title: "Bank-Level Security",
      desc: "Your data is encrypted at rest and in transit. We use the same security standards as top financial institutions.",
      icon: <LockOutlined />,
      gradient: "from-violet-500 to-purple-700",
      shadow: "rgba(139, 92, 246, 0.2)"
    },
    {
      title: "Custom Workflows",
      desc: "Whether it's Kanban, GTD, or your own secret method, our flexible system adapts to how you naturally work.",
      icon: <CompassOutlined />,
      gradient: "from-cyan-400 to-sky-600",
      shadow: "rgba(6, 182, 212, 0.2)"
    }
  ];

  return (
    <div className="bg-[#020202] min-h-screen text-white pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 mb-32 text-center max-w-5xl mx-auto relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <Tag color="cyan" className="mb-8 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs border-none bg-cyan-500/20 text-cyan-400">
           POWERFUL CAPABILITIES
        </Tag>
        <Title className="!text-white !text-6xl md:!text-8xl !font-black !mb-8 tracking-tighter leading-none">
          Tools for the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            modern builder.
          </span>
        </Title>
        <Paragraph className="!text-gray-400 !text-xl md:!text-2xl leading-relaxed max-w-3xl mx-auto">
          Everything you need to manage complex projects without the complex overhead. 
          Built for speed, designed for clarity.
        </Paragraph>
      </section>

      {/* Feature Grid */}
      <section className="px-6 mb-40 max-w-7xl mx-auto">
        <Row gutter={[48, 48]}>
          {featureList.map((f, i) => (
            <Col xs={24} md={12} lg={8} key={i}>
              <div className="relative group h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 rounded-[40px] transition-opacity duration-500`} />
                <div className="relative h-full bg-white/5 border border-white/5 p-10 rounded-[40px] hover:border-white/10 transition-all duration-500 flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 bg-gradient-to-br ${f.gradient} text-white shadow-lg`} style={{ boxShadow: `0 15px 30px ${f.shadow}` }}>
                    {f.icon}
                  </div>
                  <Title level={3} className="!text-white mb-6 !font-bold">{f.title}</Title>
                  <Paragraph className="!text-gray-500 text-lg leading-relaxed flex-grow">
                    {f.desc}
                  </Paragraph>
                  <div className="mt-8 pt-8 border-t border-white/5">
                     <Text className="text-white font-bold cursor-pointer hover:gap-4 flex items-center gap-2 transition-all group-hover:text-cyan-400">
                        Learn more <ArrowRightOutlined />
                     </Text>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* CTA Section */}
      <section className="px-6 text-center py-32 bg-white/5 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Title level={2} className="!text-white !text-5xl md:!text-6xl !font-black mb-10">Experience the difference.</Title>
          <Paragraph className="!text-gray-400 !text-xl mb-12">
            Sign up today and get 14 days of Pro features for free. No credit card required.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            className="h-20 px-16 rounded-3xl bg-white text-black text-2xl font-black hover:scale-105 transition-all shadow-2xl border-none"
            onClick={() => navigate('/signup')}
          >
            Get Started <ArrowRightOutlined className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Features;
