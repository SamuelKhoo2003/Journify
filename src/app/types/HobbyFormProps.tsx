import { Hobby } from "./Hobby";
export type HobbyFormProps = {
    hobbies: Hobby[];
    setHobbies: React.Dispatch<React.SetStateAction<Hobby[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}