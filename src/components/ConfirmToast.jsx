import { toast } from "react-hot-toast";

const ConfirmToast = ({ topic, onContinue, onCancel }) => {
  return (
    <span>
      <div>
        Você já completou o quiz: <b>{topic}</b>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: "#f0f0f0",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={onContinue}
        >
          Continuar
        </button>
      </div>
    </span>
  );
};

export const showToast = (topic, onContinue) => {
  toast(
    (t) => (
      <ConfirmToast
        topic={topic}
        onContinue={() => {
          toast.dismiss(t.id);
          onContinue();
        }}
        onCancel={() => toast.dismiss(t.id)}
      />
    ),
    { duration: 5000 }
  );
};

export default ConfirmToast;
