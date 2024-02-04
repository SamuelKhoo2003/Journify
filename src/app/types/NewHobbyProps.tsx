import { Hobby } from "./Hobby";
export type NewHobbyDrawerProps = {
    hobbies: Hobby[];
    setHobbies: React.Dispatch<React.SetStateAction<Hobby[]>>;
}