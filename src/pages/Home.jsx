import React from "react";
import { Canvas } from '@react-three/fiber'
import Experience from "../components/Experience";

const Home = () => {
  return (
    <div className="screenHeight">
        <Canvas
        //  style={{ background: 'linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)' }}
          className="r3f"
          camera={{
              fov: 45,
              near: 0.1,
              far: 2000,
              position: [-3, 1.5, 4],
          }}
        >
          <Experience />
        </Canvas>
    </div>
  );
};

export default Home;
