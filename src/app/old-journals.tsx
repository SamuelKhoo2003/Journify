"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { getJournalAtDate } from "@/Helpers/Helper"

// TODO: make it so once you click on a calendar, it shows up with the text of the entry for that day


export default function OldJournals() {
    const [date, setDate] = React.useState<Date>()
    
    var title = date?.getFullYear() + "" + date?.getMonth() + "" + date?.getDate();
    console.log(title);
    const titleElement = document?.getElementById("title");
    // lol
    if (titleElement !== null && title != "undefinedundefinedundefined") {
        if(date?.toDateString() != null){
            titleElement.innerHTML = date?.toDateString();
        }
    }
    var data = getJournalAtDate(title);
    var text;
    var sentiment;
    if(data != null){
        data = JSON.parse(data);
        if(data != null){  
            text = data.text;
            sentiment = data.sentiment;
        }
    } else {
        text = null;
        sentiment = null;
        const contentElement = document?.getElementById("content");
        const titleElement = document?.getElementById("title");
        // lol
        if (contentElement !== null && titleElement !== null) {
            contentElement.innerHTML = "NO JOURNAL FOR THIS DATE";
            titleElement.innerHTML = "NO JOURNAL FOR THIS DATE";
        }
    }
    if(text != null && sentiment != null){
        const contentElement = document?.getElementById("content");
        // lol
        if (contentElement !== null) {
            contentElement.innerHTML = text;
        }
    }

    return (
            <div className="flex flex-col z-50 opacity-85 bg-slate-800 p-10 gap-5 rounded-lg w-full items-left justify-center">
            <h2 className='text-xl' style={{ color: '#D9C4B3' }}>View Previous Journals</h2>
            <div className="flex flex-row h-10 justify-between">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Card className="flex">
                    <CardContent className='p-0 px-2 pt-2 pb-0 w-40 text-s text-center align-center'>{sentiment ? "Sentiment: " + sentiment: "No Score"}</CardContent>
                </Card>
            </div> 
            <Card>
                <CardHeader>
                    <CardTitle>
                    <p id="title"></p>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p id="content"></p>
                </CardContent>
            </Card>
        </div>
    )
}