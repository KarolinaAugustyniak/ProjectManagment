import CloseIcon from "../assets/img/close.svg";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button onClick={onClick} className="task-details__close">
      <img src={CloseIcon} alt="close" />
    </button>
  );
};

export default CloseButton;
