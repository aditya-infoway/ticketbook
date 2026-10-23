import { IconType } from "react-icons";

export interface RegistrationStep {
  key: string;
  component: React.ComponentType<{
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  label: string;
  icon: IconType;
}
