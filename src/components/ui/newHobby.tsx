import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hobby } from "@/app/types/Hobby"
import { NewHobbyDrawerProps } from "@/app/types/NewHobbyProps"
import { HobbyFormProps } from "@/app/types/HobbyFormProps"



export const NewHobbyDrawer: React.FC<NewHobbyDrawerProps> = ({ hobbies, setHobbies }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className ='mt-5 text-xl bg-lime-700 border-secondary text-white color-stone-200' >Add Mood</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Your Mood Today</DrawerTitle>
          {/* <DrawerDescription>
            Thinking of a new daily habit? It can be anything to keep you sane and happy!
          </DrawerDescription> */}
        </DrawerHeader>
        <HobbyForm hobbies={hobbies} setHobbies={setHobbies} setOpen={setOpen} className="px-4"/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
const HobbyForm: React.FC<HobbyFormProps> = ({ hobbies, setHobbies, setOpen, className }) => {
  const addNewHobby = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hobbyInput = (event.currentTarget.elements.namedItem("hobbyInput") as HTMLInputElement).value;
    const newHobby: Hobby = { name: hobbyInput, count: 0 };
    setHobbies([...hobbies, newHobby]);
    setOpen(false);
  };
  document.getElementById("hobbyInput")?.focus();
  return (
    <form className={`grid items-start gap-4 ${className}`} onSubmit={addNewHobby}>
      <div className="grid gap-2">
        {/* <Label htmlFor="hobbyInput">New Habit</Label> */}
        <select className="px-4 ga-4" name="hobbyInput" id="hobbyInput">
          <option value="Very Happy">Very Happy</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Not too good">Not too good</option>
          <option value="Sad">Sad</option>
        </select>
        {/* <Input autoComplete='off' required type="text" id="hobbyInput" name="hobbyInput" defaultValue="" placeholder="Enter a new habbit" /> */}
      </div>
      <Button type="submit" style={{backgroundColor: "#D9C4B3"}}>Add Tagline</Button>
    </form>
  );
}
