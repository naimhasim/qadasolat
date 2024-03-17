'use client'
import DatePickerWithPresets, { SelectionItem } from "@/components/DatePickerWithPresets";
import PrayerCardCounter, { Prayers} from "@/components/PrayerCardCounter";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Prayer, prayerColumnDefs } from "@/components/salah/columns"
import { DataTable } from "@/components/DataTable"
import { PaginationState } from "@tanstack/react-table";

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
    value: 0,
  },
]

export default function Estimation() {
  const [estimationData, setEstimationData] = useState<Prayer[]>([])
  const [FromDate, setFromDate] = useState<Date>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const [ToDate, setToDate] = useState<Date | undefined>(new Date())
  const [daysDifference, setDaysDifference] = useState(0);
  const { toast } = useToast()
  
  
  let [prayerCounts, setPrayerCounts] = useState<Prayers>({
    Subuh: 0,
    Zohor: 0,
    Asar: 0,
    Maghrib: 0,
    Isyak: 0
  });
  
  const columns = prayerColumnDefs({setStateFunction: setEstimationData, prayers: estimationData});
  
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
    
    if(daysDifference > 0){
        
        let cubaan : Prayer[] = Array.from({ length: daysDifference }, (_, index) => ({
            set: index + 1,
            subuh: false,
            zohor: false,
            asar: false,
            maghrib: false,
            isyak: false,
        }));
        
        console.log({cubaan});
        setEstimationData(cubaan);
        
    }
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
      
      <div className="p-10 flex flex-col gap-4">
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
                <div className=" text-xl font-light w-full text-center p-8 md:p-4">You have remaining <span className="text-2xl font-medium text-primary">{daysDifference}</span> {daysDifference>1 ? "sets" : "set"} of missed salah.</div>
                
                <div className="sm: w-full md:w-auto">
                    <DataTable 
                      columns={columns} 
                      data={estimationData} 
                      pagination={pagination} 
                      setPagination={setPagination} />
                </div>
                
                {/* PrayerCount Card */}
                {/* {Object.entries(prayerCounts).map(([prayer, count]) => (

                  <PrayerCardCounter
                    key={prayer}
                    prayer={prayer}
                    prayerCount={count}
                  // ActionButton
                  // OnClickIncrement={() => handleIncreasePrayerCount(prayer as keyof Prayers)}
                  // OnClickDecrement={() => handleDecreasePrayerCount(prayer as keyof Prayers)}
                  />
                ))} */}
              </div>
            )
            :
            (
              <div className="text-center p-12 w-full text-muted-foreground pb-80">Specify date range and calculate the number of missed Salah prayers up to any given date.</div>
            )
        }
      {/* </div> */}
    </main>
  );
}
