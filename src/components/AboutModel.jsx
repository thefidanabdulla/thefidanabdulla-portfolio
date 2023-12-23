import { Text ,Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from "@react-three/drei";
import InnerScreen from "./InnerScreen";

export default function AboutModel() {
  const keyboard = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mechanical-keyboard-tenkeyless/model.gltf"
  );

  return (
    <>
      <Environment preset="city" />
      
      <PresentationControls 
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{mass:2, tention: 400}}
        snap={{mass:4, tension:400}}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight 
            width={2.5}
            height={1.65}
            intensity={65}
            color={ '#D2C0FF' }
            rotation={[ 0.1, Math.PI,0 ]}
            position={[ 0, 0.55, - 1.15 ]}
          />
          <primitive 
            object={keyboard.scene} 
            scale={0.5}
            position-y={0} 
            position-x={-0.8}
          >
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows 
        position-y={ - 1.4 } 
        opacity={ 0.4 }  
        scale={5}
        blur={2.4}
      />
    </>
  );
}
