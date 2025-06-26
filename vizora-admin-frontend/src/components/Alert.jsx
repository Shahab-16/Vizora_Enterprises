import React from "react";

function Alert(props) {
  const { alert, closeAlert } = props;

  const getColor = () => {
    if (alert.type === "success") {
      return "bg-green-50 text-green-700";
    } else if (alert.type === "danger") {
      return "bg-red-50 text-red-700";
    } else if (alert.type === "warning") {
      return "bg-yellow-50 text-yellow-700";
    } else if (alert.type === "info") {
      return "bg-blue-50 text-blue-700";
    }
  };

  return (
    <>
      {alert && (
        <div
          className={`fixed z-30 w-full flex items-center p-4 mb-4 ${getColor()}`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Close</span>
          <div className="ms-3 text-sm font-medium">
            <span className="mx-5">
              {alert.type === "success" && (
                <span className="text-green-700">Success</span>
              )}
              {alert.type === "danger" && (
                <span className="text-red-700">Error</span>
              )}
              {alert.type === "warning" && (
                <span className="text-yellow-700">Warning</span>
              )}
              {alert.type === "info" && (
                <span className="text-blue-700">Info</span>
              )}
              :{" "}
            </span>
            {alert.msg}
          </div>
          <button
            onClick={() => {
              closeAlert();
            }}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 px-4"
            data-dismiss-target="#alert-1"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default Alert;
