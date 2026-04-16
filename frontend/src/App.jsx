import Home from "../src/pages/home/Home";
function App() {
  return (
    <>
  <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Home
    raysOrigin="top-center"
    raysColor="#ffffff"
    raysSpeed={1}
    lightSpread={0.5}
    rayLength={3}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0}
    distortion={0}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
</div>

      <Home />
    </>
  );
}

export default App;
