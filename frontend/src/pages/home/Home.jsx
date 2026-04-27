import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import { Button, Row, Col, Typography, Space, Tag, Avatar } from 'antd';
import { 
  RocketOutlined, 
  ThunderboltOutlined, 
  SafetyCertificateOutlined, 
  TeamOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
  UserOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

function hexToVec3(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uOctaveDecay;
uniform float uLayerOffset;
uniform float uColorSpeed;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318

vec3 gradientHash(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 234.6)),
    dot(p, vec3(269.5, 183.3, 198.3)),
    dot(p, vec3(169.5, 283.3, 156.9))
  );
  vec3 h = fract(sin(p) * 43758.5453123);
  float phi = acos(2.0 * h.x - 1.0);
  float theta = TAU * h.y;
  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));
}

float quinticSmooth(float t) {
  float t2 = t * t;
  float t3 = t * t2;
  return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float perlin3D(float amplitude, float frequency, float px, float py, float pz) {
  float x = px * frequency;
  float y = py * frequency;

  float fx = floor(x); float fy = floor(y); float fz = floor(pz);
  float cx = ceil(x);  float cy = ceil(y);  float cz = ceil(pz);

  vec3 g000 = gradientHash(vec3(fx, fy, fz));
  vec3 g100 = gradientHash(vec3(cx, fy, fz));
  vec3 g010 = gradientHash(vec3(fx, cy, fz));
  vec3 g110 = gradientHash(vec3(cx, cy, fz));
  vec3 g001 = gradientHash(vec3(fx, fy, cz));
  vec3 g101 = gradientHash(vec3(cx, fy, fz));
  vec3 g011 = gradientHash(vec3(fx, cy, cz));
  vec3 g111 = gradientHash(vec3(cx, cy, cz));

  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));
  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));
  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));
  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));
  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));
  float d101 = dot(g101, vec3(x - cx, y - fy, pz - fz));
  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));
  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));

  float sx = quinticSmooth(x - fx);
  float sy = quinticSmooth(y - fy);
  float sz = quinticSmooth(pz - fz);

  float lx00 = mix(d000, d100, sx);
  float lx10 = mix(d010, d110, sx);
  float lx01 = mix(d001, d101, sx);
  float lx11 = mix(d011, d111, sx);

  float ly0 = mix(lx00, lx10, sy);
  float ly1 = mix(lx01, lx11, sy);

  return amplitude * mix(ly0, ly1, sz);
}

float auroraGlow(float t, vec2 shift) {
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  uv += shift;

  float noiseVal = 0.0;
  float freq = uNoiseFreq;
  float amp = uNoiseAmp;
  vec2 samplePos = uv * uScale;

  for (float i = 0.0; i < 3.0; i += 1.0) {
    noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);
    amp *= uOctaveDecay;
    freq *= 2.0;
  }

  float yBand = uv.y * 10.0 - uBandHeight * 10.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uSpeed * 0.4 * uTime;

  vec2 shift = vec2(0.0);
  if (uEnableMouse) {
    shift = (uMouse - 0.5) * uMouseInfluence;
  }

  vec3 col = vec3(0.0);
  col += 0.99 * auroraGlow(t, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3, 0.20, 0.20)) * uColor1;
  col += 0.99 * auroraGlow(t + uLayerOffset, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25)) * uColor2;

  col *= uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

export default function Home({
  speed = 0.6,
  scale = 1.5,
  brightness = 1.0,
  color1 = '#f7f7f7',
  color2 = '#e100ff',
  noiseFrequency = 2.5,
  noiseAmplitude = 1.0,
  bandHeight = 0.5,
  bandSpread = 1.0,
  octaveDecay = 0.1,
  layerOffset = 0,
  colorSpeed = 1.0,
  enableMouseInteraction = true,
  mouseInfluence = 0.25
}) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let program;
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e) {
      const rect = gl.canvas.getBoundingClientRect();
      targetMouse = [
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      ];
    }

    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
      }
    }
    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uBrightness: { value: brightness },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
        uNoiseFreq: { value: noiseFrequency },
        uNoiseAmp: { value: noiseAmplitude },
        uBandHeight: { value: bandHeight },
        uBandSpread: { value: bandSpread },
        uOctaveDecay: { value: octaveDecay },
        uLayerOffset: { value: layerOffset },
        uColorSpeed: { value: colorSpeed },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: mouseInfluence },
        uEnableMouse: { value: enableMouseInteraction }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    if (enableMouseInteraction) {
      gl.canvas.addEventListener('mousemove', handleMouseMove);
      gl.canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let animationFrameId;

    function update(time) {
      animationFrameId = requestAnimationFrame(update);
      program.uniforms.uTime.value = time * 0.001;

      if (enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }

      renderer.render({ scene: mesh });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        gl.canvas.removeEventListener('mousemove', handleMouseMove);
        gl.canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, scale, brightness, color1, color2, noiseFrequency, noiseAmplitude, bandHeight, bandSpread, octaveDecay, layerOffset, colorSpeed, enableMouseInteraction, mouseInfluence]);

  return (
    <div className="relative min-h-screen bg-[#020202] overflow-x-hidden">
      {/* Aurora Background */}
      <div ref={containerRef} className="fixed inset-0 z-0" />
      <div className="fixed inset-0 bg-black/60 z-5" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <Tag color="magenta" className="mb-8 px-6 py-1.5 rounded-full text-xs font-black border-none bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 tracking-[0.2em] uppercase">
             ✨ DISCOVER THE FUTURE OF WORK
          </Tag>
          
          <Title className="!text-white !text-6xl md:!text-9xl !font-black !mb-8 leading-[0.85] tracking-tighter">
            Organize life.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Conquer goals.
            </span>
          </Title>

          <Paragraph className="!text-gray-400 !text-xl md:!text-2xl !mb-12 !max-w-3xl mx-auto leading-relaxed font-medium">
            The intelligent workspace where your tasks, notes, and deadlines live in perfect harmony. Designed for builders, by builders.
          </Paragraph>

          <Space size="large" className="flex flex-wrap justify-center mb-20">
            <Button 
              type="primary" 
              size="large" 
              className="h-16 px-12 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 border-none text-lg font-black hover:scale-105 transition-all shadow-[0_10px_50px_rgba(192,38,211,0.4)]"
              onClick={() => navigate('/signup')}
              icon={<RocketOutlined />}
            >
              Start for Free
            </Button>
            <Button 
              size="large" 
              className="h-16 px-12 rounded-2xl bg-white/5 border-white/10 text-white text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-md"
              icon={<PlayCircleOutlined />}
            >
              How it works
            </Button>
          </Space>

          {/* Social Proof */}
          <div className="pt-24 border-t border-white/5">
             <Text className="text-gray-600 uppercase tracking-[0.3em] text-[10px] font-black block mb-12">Trusted by modern teams globally</Text>
             <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale brightness-200">
                <Title level={3} className="!text-white !mb-0 !font-black italic !text-2xl">METΛ</Title>
                <Title level={3} className="!text-white !mb-0 !font-black !text-2xl">NETFLIX</Title>
                <Title level={3} className="!text-white !mb-0 !font-black !text-2xl">stripe</Title>
                <Title level={3} className="!text-white !mb-0 !font-black !text-2xl tracking-tighter">airbnb</Title>
             </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-40 px-6 bg-[#020202]" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <Title level={2} className="!text-white !text-5xl md:!text-7xl !font-black mb-8 leading-none tracking-tight">
              Simple. Powerful. <br/><span className="text-purple-500">Effortless.</span>
            </Title>
            <Paragraph className="!text-gray-500 !text-xl md:!text-2xl max-w-2xl mx-auto leading-relaxed">
              Stop fighting with spreadsheets. Our 3-step workflow gets you organized in under 60 seconds.
            </Paragraph>
          </div>

          <Row gutter={[64, 64]}>
            {[
              {
                step: "01",
                title: "Capture Quickly",
                desc: "Add tasks as fast as you think of them. Our natural language processing handles the rest.",
                icon: <ThunderboltOutlined />,
                color: "#ff0080",
                shadow: "rgba(255, 0, 128, 0.2)"
              },
              {
                step: "02",
                title: "Plan Intelligently",
                desc: "AI-driven scheduling suggests the best time for deep work based on your peak energy levels.",
                icon: <RocketOutlined />,
                color: "#7928ca",
                shadow: "rgba(121, 40, 202, 0.2)"
              },
              {
                step: "03",
                title: "Execute Seamlessly",
                desc: "Focus on one thing at a time with our distraction-free 'Deep Work' mode.",
                icon: <CheckOutlined />,
                color: "#0070f3",
                shadow: "rgba(0, 112, 243, 0.2)"
              }
            ].map((item, i) => (
              <Col xs={24} md={8} key={i}>
                <div className="relative group cursor-default">
                  <div className="absolute -inset-8 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[48px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative p-4">
                    <span className="text-[120px] font-black text-white/[0.03] absolute -top-12 -left-8 leading-none select-none">{item.step}</span>
                    <div className="w-20 h-20 rounded-[24px] flex items-center justify-center text-4xl mb-10 bg-white/5 border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-white/10" style={{ color: item.color, boxShadow: `0 20px 40px ${item.shadow}` }}>
                      {item.icon}
                    </div>
                    <Title level={3} className="!text-white mb-6 font-black tracking-tight">{item.title}</Title>
                    <Paragraph className="!text-gray-500 text-lg leading-relaxed font-medium">{item.desc}</Paragraph>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-48 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-pink-600 to-indigo-700 rounded-[70px] p-16 md:p-32 text-center relative shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] group-hover:scale-110 transition-transform duration-[10s]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
          
          <Title className="!text-white !text-6xl md:!text-8xl !font-black mb-12 leading-none tracking-tighter">
            Ready to reclaim <br/>your time?
          </Title>
          <Paragraph className="!text-white/80 !text-xl md:!text-3xl mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Join 50,000+ professionals who are already doing their best work with TaskManager.
          </Paragraph>
          <Button 
            size="large" 
            className="h-24 px-20 rounded-[32px] bg-white text-black text-3xl font-black hover:scale-105 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.3)] border-none"
            onClick={() => navigate('/signup')}
          >
            Get Started Now <ArrowRightOutlined className="ml-3" />
          </Button>
          
          <div className="mt-16 flex flex-col items-center gap-6">
             <Avatar.Group maxCount={4} size="large" className="scale-125">
                <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
                <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb" />
                <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bella" />
             </Avatar.Group>
             <Text className="text-white/70 font-black tracking-widest text-xs uppercase">Loved by 50,000+ users</Text>
          </div>
        </div>
      </section>
    </div>
  );
}
