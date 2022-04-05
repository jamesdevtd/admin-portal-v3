
import styles from './styles.module.scss';

type StepsButtonsProps = {
  currentStep: number,
  handleStepChange: (arg: number) => void
}

const StepsButtons = ({ currentStep, handleStepChange }: StepsButtonsProps) => {

  const handleClick = (val: number) => {
    if (val < 0 && currentStep > 1) {
      handleStepChange(--currentStep);
    } else if (val > 4 && currentStep < 4) {
      handleStepChange(++currentStep);
    } else {
      handleStepChange(val);
    }
  };

  return (
    <div className={styles.stepsButtons}>
      <button disabled={currentStep < 1} onClick={() => handleClick(-1)} className="arrow prev">PREV</button>
      <button disabled={false} onClick={() => handleClick(1)} className={currentStep >= 0 ? 'filled' : ''}>1</button>
      <button disabled={false} onClick={() => handleClick(2)} className={currentStep >= 2 ? 'filled' : ''}>2</button>
      <button disabled={false} onClick={() => handleClick(3)} className={currentStep >= 3 ? 'filled' : ''}>3</button>
      <button disabled={false} onClick={() => handleClick(4)} className={currentStep >= 4 ? 'filled' : ''}>4</button>
      <button disabled={currentStep >= 4} onClick={() => handleClick(5)} className="arrow next">NEXT</button>
    </div>
  );
}

export default StepsButtons;


