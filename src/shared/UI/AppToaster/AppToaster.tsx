import { type FC, memo } from "react";
import { toast, ToastContainer } from "react-toastify";

interface AppToasterProps {
  label?: string;
  content?: string | string[];
}

export const useNotifications = () => {
  const notifySuccess = (label: string, content?: string | string[]) => {
    return toast.success(<ToasterBox label={label} content={content} />, {});
  };

  const notifyError = (label: string, content?: string | string[]) => {
    return toast.error(<ToasterBox label={label} content={content} />);
  };

  const notifyInfo = (label: string, content?: string | string[]) => {
    return toast.info(<ToasterBox label={label} content={content} />);
  };

  const notifyWarning = (label: string, content?: string | string[]) => {
    return toast.warning(<ToasterBox label={label} content={content} />);
  };

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
};

export const ToasterBox: FC<AppToasterProps> = ({ label, content }) => {
  if (Array.isArray(content)) {
    return (
      <div>
        {label && <h3 style={{ fontSize: "14px" }}>{label}</h3>}
        {content &&
          content.map((item, index) => (
            <p key={item + index} style={{ fontSize: "14px" }}>
              {item}
            </p>
          ))}
      </div>
    );
  }

  return (
    <div>
      {label && <h3 style={{ fontSize: "14px" }}>{label}</h3>}
      {content && <p style={{ fontSize: "14px" }}>{content}</p>}
    </div>
  );
};

const AppToaster = memo(() => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={10000}
      // autoClose={false}
      progressStyle={{}}
      // hideProgressBar
      toastClassName={"app-toaster"}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
});

AppToaster.displayName = "AppToaster";

export default AppToaster;
