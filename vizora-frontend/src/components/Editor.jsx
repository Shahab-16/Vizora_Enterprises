import React, {
  useRef,
  memo,
  useMemo,
  Suspense,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  OrbitControls,
  useGLTF,
  Html,
  TransformControls,
  GizmoHelper,
  GizmoViewport,
  Gltf,
  Outlines,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import EditorContext from "../context/editorContext";

const RoomModel = memo(({ modelUrl, selectedRoom, setSelectedRoom, scale }) => {
  const result = useGLTF(modelUrl);
  const { scene } = result;

  if (scale) {
    scene.scale.set(scale[0], scale[1], scale[2]);
  }

  const handleRoomSelection = useCallback(
    (e) => {
      if (selectedRoom === null) {
        const rooms = e.object.name.split("_");
        let tmpSelectedRoom = "";
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i] === "bedroom") {
            tmpSelectedRoom = "bedroom";
            break;
          } else if (rooms[i] === "bathroom") {
            tmpSelectedRoom = "bathroom";
            break;
          }
        }
        if (tmpSelectedRoom !== "") {
          setSelectedRoom(tmpSelectedRoom);
          scene.children.forEach((child) => {
            if (child.isMesh && !child.name.includes(tmpSelectedRoom)) {
              scene.remove(child);
            } else if (
              child.isMesh &&
              child.name.includes(tmpSelectedRoom) &&
              child.name.includes("walls")
            ) {
              child.material.side = THREE.FrontSide;
            }
          });
        }
      }
    },
    [selectedRoom, scene, setSelectedRoom]
  );

  const handlePointerOver = useCallback(
    (e) => {
      if (selectedRoom === null) {
        const rooms = e.object.name.split("_");
        let tmpSelectedRoom = "";
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i] === "bedroom") {
            tmpSelectedRoom = "bedroom";
            break;
          } else if (rooms[i] === "bathroom") {
            tmpSelectedRoom = "bathroom";
            break;
          }
        }
        if (tmpSelectedRoom !== "") {
          scene.children.forEach((child) => {
            if (
              child.isMesh &&
              child.name.includes("walls") &&
              child.name.includes(tmpSelectedRoom)
            ) {
              child.material = new THREE.MeshStandardMaterial({
                color: child.material.color,
              });
              child.material.emissive = new THREE.Color(0x00ff00);
              child.material.emissiveIntensity = 0.5;
            }
          });
        }
      }
    },
    [selectedRoom, scene]
  );

  const handlePointerOut = useCallback(() => {
    if (scene) {
      scene.children.forEach((child) => {
        if (child.isMesh) {
          child.material.emissiveIntensity = 0;
        }
      });
    }
  }, [scene]);

  return (
    <primitive
      key={modelUrl}
      object={scene}
      onClick={handleRoomSelection}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
});

const ProductModel = ({ modelUrl }) => {
  return <Gltf src={modelUrl} />;
};

const Editor = ({
  products,
  activeWallColor,
  activeWallTexture,
  setShowPaintsModal,
  setShowTilesModal,
  setShowWallpapersModal,
  setWallsCost,
  wallsCost,
}) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { roomModel, singleRoom, setThree, isLocked, setIsLocked } =
    useContext(EditorContext);
  const [transformMode, setTransformMode] = useState("translate");

  const { camera, gl, scene } = useThree();
  const controls = useMemo(
    () => new PointerLockControls(camera, gl.domElement),
    [camera, gl.domElement]
  );
  const groupRef = useRef();
  const groundRef = useRef();
  setThree({ camera, gl, scene, groupRef: groupRef.current, controls });

  const ambientLight = useMemo(() => <ambientLight intensity={1} />, []);
  const directionalLight = useMemo(
    () => <directionalLight position={[10, 10, 5]} intensity={1} />,
    []
  );
  const raycaster = new THREE.Raycaster();
  const mouse = useMemo(() => new THREE.Vector2(), []);

  const calculateSurfaceArea = (object) => {
    console.log("object =", object);

    const geometry = object.geometry;
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    const width = boundingBox.max.x - boundingBox.min.x;
    const height = boundingBox.max.y - boundingBox.min.y;
    return width * height;
  };

  useEffect(() => {
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

      if (intersects.length > 0) {
        setSelectedObject((prev) => {
          if (prev && prev?.name.includes("walls")) {
            prev.material.emissiveIntensity = 0;
          }

          return intersects[0].object;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [camera, mouse, raycaster]);

  useEffect(() => {
    if (selectedRoom !== null && selectedObject?.name.includes("walls")) {
      setShowPaintsModal(true);
      setShowTilesModal(true);
      setShowWallpapersModal(true);
    } else {
      setShowPaintsModal(false);
      setShowTilesModal(false);
      setShowWallpapersModal(false);
    }
    if (selectedObject !== null && selectedObject?.name.includes("walls")) {
      selectedObject.material.emissive = new THREE.Color(0x00ff00);
      selectedObject.material.emissiveIntensity = 0.5;
    }
  }, [selectedObject, selectedRoom]);

  useEffect(() => {
    if (selectedObject?.name.includes("walls") && activeWallColor[0] !== null) {
      selectedObject.material.map = null;
      selectedObject.material.color.set(activeWallColor[0]);
      const price = activeWallColor[1];
      const SA = calculateSurfaceArea(selectedObject);
      const wallCost = {};
      wallCost[selectedObject.name] = SA * price;
      setWallsCost((prev) => {
        return { ...prev, ...wallCost };
      });
    }
  }, [activeWallColor, selectedObject]);

  useEffect(() => {
    if (
      activeWallTexture[0] !== null &&
      selectedObject?.name.includes("walls")
    ) {
      selectedObject.material.color.set(0xffffff);
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(activeWallTexture[0], (texture) => {
        selectedObject.material.map = texture;
        selectedObject.material.needsUpdate = true;
        const price = activeWallTexture[1];
        const SA = calculateSurfaceArea(selectedObject).toFixed(1);
        const wallCost = {};
        wallCost[selectedObject.name] = SA * price;
        setWallsCost((prev) => {
          return { ...prev, ...wallCost };
        });
      });
    }
  }, [activeWallTexture, selectedObject]);

  const groundMesh = useMemo(
    () => (
      <group>
        {/* Main Ground */}
        <mesh position-y={-0.25} ref={groundRef}>
          <boxGeometry args={[60, 0.4, 60]} />
          <Outlines thickness={0.05} color="hotpink" />
          <meshStandardMaterial color={[2, 1, 3]} />
        </mesh>

        {/* Edge Light */}
        <mesh position-y={-0.05} scale={[60.01, 0.5, 60.01]} layers={[0]}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial
            color="#c9bfc6" // Orange color
          />
        </mesh>
      </group>
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

  const keyboard = useMemo(() => ({}), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      keyboard[e.key] = true;
    };
    const handleKeyUp = (e) => {
      keyboard[e.key] = false;
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyboard]);

  const processKeyboard = useCallback(() => {
    if (isLocked) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);

      if (keyboard["w"]) {
        camera.position.addScaledVector(direction, 0.1);
      }
      if (keyboard["s"]) {
        camera.position.addScaledVector(direction, -0.1);
      }
      if (keyboard["a"]) {
        camera.position.addScaledVector(
          new THREE.Vector3().crossVectors(camera.up, direction).normalize(),
          0.1
        );
      }
      if (keyboard["d"]) {
        camera.position.addScaledVector(
          new THREE.Vector3().crossVectors(camera.up, direction).normalize(),
          -0.1
        );
      }
    }
  }, [camera, isLocked, keyboard]);

  useFrame(() => {
    processKeyboard();
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "t") {
        setTransformMode("translate");
      } else if (event.key === "r") {
        setTransformMode("rotate");
      }
      if (event.key === "Escape") {
        setIsLocked(false);
        controls.unlock();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [controls]);

  return (
    <Suspense fallback={<Loader />}>
      {!isLocked && (
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05} // Increased damping factor for more friction-like effect
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation
          minDistance={2} // Minimum zoom distance
          maxDistance={50} // Maximum zoom distance
          rotateSpeed={0.6} // Adjust the speed of rotation
          zoomSpeed={0.6} // Adjust the speed of zoom
          panSpeed={0.6} // Adjust the speed of panning
        />
      )}
      <GizmoHelper
        alignment="bottom-right"
        margin={[80, 80]}
        onTarget={() => controls.current.target}
      >
        <GizmoViewport scale={40} position={[0, -20, -20]} />
      </GizmoHelper>
      {ambientLight}
      {directionalLight}
      <group ref={groupRef}>
        {roomModel && singleRoom === null && (
          <RoomModel
            modelUrl={roomModel.modelUrl}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        )}
        {singleRoom && (
          <RoomModel
            modelUrl={singleRoom.modelUrl}
            scale={singleRoom.scale}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        )}
        {products.map((product, index) => (
          <ProductModel
            key={`${product._id}-${index}`}
            modelUrl={product.modelUrl}
          />
        ))}
      </group>
      {groundMesh}
      {selectedObject && (
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          showX={
            transformMode === "rotate" || selectedObject?.name.includes("walls")
              ? false
              : true
          }
          showZ={
            transformMode === "rotate" || selectedObject?.name.includes("walls")
              ? false
              : true
          }
          showY={selectedObject?.name.includes("walls") ? false : true}
        />
      )}
    </Suspense>
  );
};

export default Editor;
