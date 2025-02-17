import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "../components/Experience";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup to prevent memory leaks
  }, []);
  return (
    <div className="screenHeight">
      {isLoading ? <LoadingScreen /> : null}
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
