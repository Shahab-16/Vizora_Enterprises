import React, { useState, useEffect, useRef } from "react";

const UploadWidget = ({ onUploadSuccess, text }) => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    // Function to initialize the widget
    const initWidget = () => {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            if (onUploadSuccess) {
              onUploadSuccess(result.info);
            }
          }
        }
      );

      setWidgetLoaded(true);
    };

    if (!widgetLoaded) {
      initWidget();
    }
  }, [widgetLoaded, onUploadSuccess]);

  // Function to open the widget
  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <button
      className="bg-indigo-500 rounded-md text-white px-5 py-0.5 flex mx-auto my-2"
      type="button"
      onClick={openWidget}
    >
      {text}
    </button>
  );
};

export default UploadWidget;
