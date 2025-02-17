import {
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";
import InnerScreen from "./InnerScreen";
import { useEffect, useState } from "react";

export default function Experience() {
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );

  const [currentScreenWith, setCurrentScreenWith] = useState(null);
  useEffect(() => {
    setCurrentScreenWith(window.innerWidth);
  }, []);

  return (
    <>
      <Environment preset="city" />

      {/* <color args={["#4D4F94"]} attach="background" /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tention: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#D2C0FF"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive
            object={computer.scene}
            position-y={currentScreenWith > 758 ? -1.4 : -0.2}
            scale={currentScreenWith > 768 ? 1 : 0.4}
          >
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              {/* <iframe src="https://code.edu.az/" /> */}
              <InnerScreen />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={currentScreenWith > 768 ? 0.75 : 0.5}
            position={
              currentScreenWith > 768 ? [2, 0.75, 0.75] : [1, 0.65, -0.2]
            }
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
            scale={currentScreenWith > 768 ? 1 : 0.5}
          >
            Fidan Abdulla
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={currentScreenWith > 758 ? -1.4 : -0.8}
        opacity={0.4}
        scale={5}
        blur={2.4}
      />
    </>
  );
}
