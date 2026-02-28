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

const BREAKPOINT = 768;
const BREAKPOINT_SHADOW = 758;

const MODEL_URL = "/macbook_laptop/scene.gltf";

export default function Experience() {
  const { scene } = useGLTF(MODEL_URL);

  const [currentScreenWidth, setCurrentScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  useEffect(() => {
    const onResize = () => setCurrentScreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDesktop =
    currentScreenWidth !== null && currentScreenWidth > BREAKPOINT;
  const isDesktopShadow =
    currentScreenWidth !== null && currentScreenWidth > BREAKPOINT_SHADOW;

  return (
    <>
      <Environment preset="city" />

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
            intensity={-4}
            color={"#323133"}
            rotation={[0.4, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive
            object={scene}
            position-y={isDesktopShadow ? -2 : -0.2}
            position-z={isDesktopShadow ? -10 : 0}
            position-x={isDesktopShadow ? -34 : 0}
            scale={isDesktop ? 5 : 2}
          >
            <Html
              transform
              wrapperClass="htmlScreen"
              position={[0.01, 0.02, 0.01]}
              rotation={[1.53, 0, 0]}
              scale={0.11}
              distanceFactor={1.1}
            >
              <InnerScreen />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={isDesktop ? 0.75 : 0.5}
            position={isDesktop ? [2, 0.75, 0.75] : [1, 0.65, -0.2]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
            scale={isDesktop ? 1 : 0.5}
          >
            Fidan Abdulla
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={isDesktopShadow ? -1.4 : -0.8}
        opacity={0.4}
        scale={5}
        blur={2.4}
      />
    </>
  );
}
