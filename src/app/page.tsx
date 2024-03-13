'use client'
import DatePickerWithPresets, { SelectionItem } from "@/components/DatePickerWithPresets";
import PrayerCardCounter, { Prayers} from "@/components/PrayerCardCounter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const FromSelection : SelectionItem = [
  {
    name: "1 Month Ago",
    value: `${-(365/12)}`,
  },
  {
    name: "1 Years Ago",
    value: -365,
  },
  {
    name: "5 Years Ago",
    value: -730,
  },
  {
    name: "10 Years Ago",
    value: -3650,
  },
]
const ToSelection: SelectionItem = [
  {
    name: "Today",
    value: `0`,
  },
  {
    name: "1 Week ago",
    value: `7`,
  },
  {
    name: "1 Years Ago",
    value: -365,
  },
]

export default function Home() {
  
  let [prayerCounts, setPrayerCounts] = useState<Prayers>({
    Subuh: 0,
    Zohor: 0,
    Asar: 0,
    Maghrib: 0,
    Isyak: 0
  });
  
  const [FromDate, setFromDate] = useState<Date>()
  const [ToDate, setToDate] = useState<Date>(new Date())
  const [daysDifference, setDaysDifference] = useState(0);
  
  useEffect((): void => {
    const calculateDaysDifference = (fromDate: Date | undefined, toDate: Date | undefined) => {
      if(!fromDate || !toDate) return;
      
      const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const diffDays = Math.round(Math.abs((toDate.getTime() - fromDate.getTime()) / oneDay));
      setDaysDifference(diffDays);
    };

    calculateDaysDifference(FromDate,ToDate);
  
  },[FromDate,ToDate])
  
  useEffect((): void => {
    setPrayerCounts(prevCounts => {
      return {
        Subuh: daysDifference,
        Zohor: daysDifference,
        Asar: daysDifference,
        Maghrib: daysDifference,
        Isyak: daysDifference
      };
    });
    
  },[daysDifference])
  function handleSetPrayerCount(prayer: keyof Prayers ) {
    setPrayerCounts(prevCounts => {
      return {
      ...prevCounts,
      [prayer]: (prevCounts[prayer] || 0) + 1
    }});
  }
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-3">
      
      <div className="p-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Qada Solat Tracker</h1>
        <p className="scroll-m-20 text-md tracking-tighter text-muted-foreground">One Prayer at a time, Track with Confidence.</p>
      </div>
      
      <div className="p-10 flex flex-col gap-4">
          <Label>From</Label>
        <div>
          <DatePickerWithPresets FromSelection={FromSelection} setDate={setFromDate} date={FromDate}></DatePickerWithPresets>
        </div>
          <Label>To</Label>
        <div>
          <DatePickerWithPresets FromSelection={ToSelection} setDate={setToDate} date={ToDate}></DatePickerWithPresets>
        </div>
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="estimation">Estimation</Label>
          <Input type="text" id="estimation" placeholder="Enter your estimation (days)" />
        </div> */}
        
        {/* <div>
          Date 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline-block h-4 w-4 shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"></path></svg>
        </div> */}
        
      </div>  

      <div className="flex justify-center flex-col gap-5 card-container w-full">
        {/* Render PrayerCardCounter for each prayer */}
        {Object.entries(prayerCounts).map(([prayer, count]) => (

          <PrayerCardCounter
            key={prayer}
            prayer={prayer}
            prayerCount={count}
            OnSetPrayerCount={() => handleSetPrayerCount(prayer as keyof Prayers)}
          />
        ))}
      </div>
    </main>
  );
}
