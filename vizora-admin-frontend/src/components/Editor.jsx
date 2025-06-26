import React, {
  useRef,
  memo,
  useMemo,
  Suspense,
  useState,
  useEffect,
} from "react";
import {
  OrbitControls,
  useGLTF,
  Html,
  TransformControls,
  PivotControls,
  DragControls,
} from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Physics, RigidBody } from "@react-three/rapier";

const RoomModel = memo(({ modelUrl }) => {
  const result = useGLTF(modelUrl);
  const { scene } = result;
  console.log("scene = ", scene);
  scene.scale.set(10, 10, 10);
  scene.traverse((child) => {
    if (child.isMesh && child.name === "walls") {
      child.material.side = THREE.FrontSide; // Set material to one-sided
    }
  });
  return <primitive key={modelUrl} object={scene} />;
});

const ProductModel = memo(({ modelUrl }) => {
  const result = useGLTF(modelUrl);
  const { scene } = result;
  console.log("result = ", result);
  return <primitive key={modelUrl} object={scene} />;
});

const Editor = ({ roomModel, products, saveScene }) => {
  const { camera, scene } = useThree();
  const groupRef = useRef();
  const ambientLight = useMemo(() => <ambientLight intensity={1} />, []);
  const directionalLight = useMemo(
    () => <directionalLight position={[10, 10, 5]} intensity={1} />,
    []
  );

  const [transformMode, setTransformMode] = useState();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const handleMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const handleMouseClick = () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(
      groupRef.current.children,
      true
    );

    if (intersects.length > 0 && intersects[0].object.name !== "walls") {
      setSelectedObject(intersects[0].object);
      console.log("selected object = ", intersects[0].object);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [camera]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "t") {
        setTransformMode("translate");
      } else if (event.key === "r") {
        setTransformMode("rotate");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const groundMesh = useMemo(
    () => (
      <mesh rotation-x={-Math.PI * 0.5} position-y={-0.01} scale={[20, 20, 20]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial color="#c9bec3" />
      </mesh>
    ),
    []
  );

  function Loader() {
    return (
      <Html>
        <div className="z-10 bg-white absolute top-1/2">Loading...</div>
      </Html>
    );
  }
  const [hoveringRoom, setHoveringRoom] = useState("");

  const [selectedObject, setSelectedObject] = useState(null);

  return (
    <Suspense fallback={<Loader />}>
      <OrbitControls makeDefault />
      {ambientLight}
      {directionalLight}

      <group ref={groupRef}>
        {roomModel && <RoomModel modelUrl={roomModel.modelUrl} />}
        {products.map((product) => (
          <ProductModel modelUrl={product.modelUrl} />
        ))}
      </group>

      {groundMesh}

      <Html>
        <button
          className="absolute top-64 -left-10 p-2 w-40  bg-white border border-gray-300 rounded-md"
          onClick={() => {
            saveScene(groupRef.current);
          }}
        >
          Save Scene
        </button>
      </Html>
      {selectedObject && (
        <TransformControls object={selectedObject} mode={transformMode} />
      )}
    </Suspense>
  );
};

export default Editor;
