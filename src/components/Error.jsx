import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

function Error({ error }) {
  return (
    <div className="flex justify-center text-xl">
      <div
        role="alert"
        className="alert alert-error w-6/12 flex justify-center font-semibold"
      >
        <ErrorOutlineOutlinedIcon />
        <span>{error}</span>
      </div>
    </div>
  );
}

export default Error;
