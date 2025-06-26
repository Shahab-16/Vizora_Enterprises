import React, { useCallback } from "react";
import EditorContext from "./editorContext";
import { useState } from "react";
import { weld, quantize, dedup } from "@gltf-transform/functions";
import {
  KHRONOS_EXTENSIONS,
  KHRDracoMeshCompression,
} from "@gltf-transform/extensions";
import { WebIO } from "@gltf-transform/core";
import { DracoEncoderModule } from "../assets/draco/draco_encoder.js";
import { DracoDecoderModule } from "../assets/draco/draco_decoder.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

const exporter = new GLTFExporter();
const options = { binary: true };

const io = new WebIO({ credentials: "include" })
  .registerExtensions(KHRONOS_EXTENSIONS)
  .registerDependencies({
    "draco3d.encoder": new DracoEncoderModule(),
    "draco3d.decoder": new DracoDecoderModule(),
  });

function EditorState(props) {
  const [three, setThree] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [roomModel, setRoomModel] = useState(null);
  const [model, setModel] = useState(null);
  const [singleRoom, setSingleRoom] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const captureScreenshot = useCallback(() => {
    three?.gl.render(three?.scene, three?.camera);
    const dataURL = three?.gl.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "screenshot.png";
    link.click();
  }, [three?.camera, three?.gl, three?.scene]);

  const compressAndExport = useCallback(
    async (setModelData) => {
      exporter.parse(
        three?.groupRef,
        async (glb) => {
          const unit8array = new Uint8Array(glb);
          const glbfile = await io.readBinary(unit8array);
          glbfile
            .createExtension(KHRDracoMeshCompression)
            .setRequired(true)
            .setEncoderOptions({
              method: KHRDracoMeshCompression.EncoderMethod.SEQUENTIAL,
              encodeSpeed: 5,
              decodeSpeed: 5,
            });
          await glbfile.transform(weld(), quantize(), dedup());
          const BinaryData = await io.writeBinary(glbfile);
          setModelData(BinaryData);
        },
        (error) => console.error("An error happened", error),
        options
      );
    },
    [exporter, io, options]
  );

  const lockControls = useCallback(() => {
    three?.controls.lock();
  }, [three?.controls]);

  return (
    <EditorContext.Provider
      value={{
        three,
        roomModel,
        setRoomModel,
        isEditing,
        setIsEditing,
        model,
        setModel,
        singleRoom,
        setSingleRoom,
        setThree,
        captureScreenshot,
        compressAndExport,
        lockControls,
        isLocked,
        setIsLocked,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
}

export default EditorState;
