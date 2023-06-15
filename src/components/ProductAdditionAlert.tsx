import Alert from "@mui/material/Alert";
interface AlertProps {
  setShowAlert: (value: boolean) => void;
  message: string;
}
const ProductAdditionAlert = ({ setShowAlert, message }: AlertProps) => {
  return (
    <div className="alert-container">
      <Alert severity="success" onClose={() => setShowAlert(false)}>
        {message}
      </Alert>
    </div>
  );
};

export default ProductAdditionAlert;
