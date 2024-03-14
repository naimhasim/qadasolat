'use client'
import { format } from "date-fns"
import DatePickerWithPresets, { SelectionItem } from "@/components/DatePickerWithPresets";
import PrayerCardCounter, { Prayers} from "@/components/PrayerCardCounter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
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
  const [ToDate, setToDate] = useState<Date | undefined>(new Date())
  const [daysDifference, setDaysDifference] = useState(0);
  const { toast } = useToast()
  
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
  // function handleIncreasePrayerCount(prayer: keyof Prayers ) {
  //   setPrayerCounts(prevCounts => {
  //     return {
  //     ...prevCounts,
  //     [prayer]: (prevCounts[prayer] || 0) + 1
  //   }});
  // }
  
  // function handleDecreasePrayerCount(prayer: keyof Prayers ) {
  //   setPrayerCounts(prevCounts => {
  //     if((prevCounts[prayer] || 0) - 1 < 0) return prevCounts;
      
  //     return {
  //     ...prevCounts,
  //     [prayer]: (prevCounts[prayer] || 0) - 1
  //   }});
  // }

  const handleSetFromDate = (FromDate: Date | undefined) => {
    if (FromDate) {
      if (ToDate && FromDate && FromDate.getTime() > ToDate.getTime()) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Your start date should be before your end date!",
          variant: "destructive"
        })
        return ;
      }
    }
    setFromDate(FromDate);
  };
  
  const handleSetToDate = (ToDate: Date) => {
    
    if (ToDate && FromDate && FromDate.getTime() > ToDate.getTime()) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Your end date should be after your start date!",
        variant: "destructive"
      })
      return ;
    }

    setToDate(ToDate);
  };
  
  return (
    <main className="flex flex-col items-center justify-start bg-background text-foreground p-3">
      
      <div className="p-10 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-3">
          <Label className="">From</Label>
          <DatePickerWithPresets FromSelection={FromSelection} setDate={handleSetFromDate} date={FromDate}></DatePickerWithPresets>
        </div>
        <div className="flex flex-col gap-3">
          <Label>To</Label>
          <DatePickerWithPresets FromSelection={ToSelection} setDate={handleSetToDate} date={ToDate}></DatePickerWithPresets>
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

      {/* <div className="flex justify-center flex-col sm:flex-row flex-wrap gap-5 card-container w-full sm:w-4/5 md:w-3/5 lg:w-2/4"> */}
        {/* Render PrayerCardCounter for each prayer */}
        {
          daysDifference > 0 ?
            (
              <div className="flex justify-center flex-col sm:flex-row flex-wrap gap-5 card-container w-full sm:w-4/5 md:w-3/5 lg:w-2/4">
                <div className=" font-light w-full text-center p-8 md:p-4">Since {format(FromDate ?? 0, "dd/MM/yyyy")} until {format(ToDate, "dd/MM/yyyy")}, you have remaining {daysDifference} days of salah.</div>
                {Object.entries(prayerCounts).map(([prayer, count]) => (

                  <PrayerCardCounter
                    key={prayer}
                    prayer={prayer}
                    prayerCount={count}
                  // ActionButton
                  // OnClickIncrement={() => handleIncreasePrayerCount(prayer as keyof Prayers)}
                  // OnClickDecrement={() => handleDecreasePrayerCount(prayer as keyof Prayers)}
                  />
                ))}
              </div>
            )
            :
            (
              <div className="p-12 w-full text-muted-foreground">Specify your start date and calculate the number of missed Salah prayers up to any given date.</div>
            )
        }
      {/* </div> */}
    </main>
  );
}
