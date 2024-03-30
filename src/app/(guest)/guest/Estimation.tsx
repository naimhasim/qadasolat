'use client'
import DatePickerWithPresets, { SelectionItem } from "@/components/DatePickerWithPresets";
// import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Prayer, prayerColumnDefs } from "@/components/salah/columns"
import { DataTable } from "@/components/DataTable"
import { PaginationState } from "@tanstack/react-table";
// import { Session } from "next-auth";

const FromSelection : SelectionItem = [
  {
    name: "1 Month Ago",
    value: `${-(365/12)}`,
  },
  {
    name: "6 Months Ago",
    value: `${-(365/2)}`,
  },
  {
    name: "1 Year Ago",
    value: -365,
  },
  {
    name: "5 Years Ago",
    value: -730,
  },
  {
    name: "10 Years Ago",
    value: -3650,
    disabled: false
  },
]
const ToSelection: SelectionItem = [
  {
    name: "Today",
    value: 0,
  }
]

let savedDaysDifference: number
let savedEstimationData: Prayer[]
let savedFromDate: Date | undefined
let savedToDate: Date | undefined
export default function Estimation() {
  // const { data: session, status } = useSession();
  const [estimationData, setEstimationData] = useState<Prayer[]>([])
  
  const [isDownload, setDownload] = useState<boolean>(false)
  const [FromDate, setFromDate] = useState<Date>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const [ToDate, setToDate] = useState<Date | undefined>(new Date())
  const [daysDifference, setDaysDifference] = useState<number>(0);
  const { toast } = useToast()
  
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
    // setPrayerCounts(prevCounts => {
    //   return {
    //     Subuh: daysDifference,
    //     Zohor: daysDifference,
    //     Asar: daysDifference,
    //     Maghrib: daysDifference,
    //     Isyak: daysDifference
    //   };
    // });
    
    setDownload(false); 
    if (daysDifference > 0) {
      if (savedEstimationData && savedEstimationData.length === daysDifference) {
          setEstimationData([...savedEstimationData]);
      } else {
          let initialEstimationPrayers: Prayer[] = Array.from({ length: daysDifference }, (_, index) => ({
              set: index + 1,
              subuh: false,
              zohor: false,
              asar: false,
              maghrib: false,
              isyak: false,
          }));
          setEstimationData([...initialEstimationPrayers]);
      }
  }
  },[daysDifference])

  useEffect(() => {
    savedDaysDifference = JSON.parse(localStorage.getItem('daysDifference') || '0');;
    if (!daysDifference) {
      setDaysDifference(savedDaysDifference);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) // strict mode and useRef causing unexpected result.
  
  useEffect(() => {
    savedEstimationData = JSON.parse(localStorage.getItem('estimationData') || '[]');
    if (!estimationData.length) {
      setEstimationData([...savedEstimationData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) // strict mode and useRef causing unexpected result.
  
  useEffect(() => {
    
    if(!localStorage.getItem('FromDate')){ return }
    
    savedFromDate = localStorage.getItem('FromDate') === 'undefined' ? undefined : new Date(JSON.parse(localStorage.getItem('FromDate') as string ));
    
    if(savedFromDate){
      setFromDate(savedFromDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) // strict mode and useRef causing unexpected result.
  
  useEffect(() => {
    
    if(!localStorage.getItem('ToDate')){ return }
    
    savedToDate = localStorage.getItem('ToDate') === 'undefined' ? undefined : new Date(JSON.parse(localStorage.getItem('ToDate') as string ));
    
    if(savedToDate){
      setToDate(savedToDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) // strict mode and useRef causing unexpected result.
  
  useEffect(() => {
    localStorage.setItem('FromDate', JSON.stringify(FromDate?.toJSON()));
  }, [FromDate]);
  useEffect(() => {
    localStorage.setItem('ToDate', JSON.stringify(ToDate?.toJSON()));
  }, [ToDate]);
  
  useEffect(() => {
    localStorage.setItem('estimationData', JSON.stringify(estimationData));
  }, [estimationData]);
  
  useEffect(() => {
    localStorage.setItem('daysDifference', JSON.stringify(daysDifference));
  }, [daysDifference]);
  
  // let [prayerCounts, setPrayerCounts] = useState<Prayers>({
  //   Subuh: 0,
  //   Zohor: 0,
  //   Asar: 0,
  //   Maghrib: 0,
  //   Isyak: 0
  // });
  
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
  
  const handleSetToDate: (ToDate: Date | undefined) => Dispatch<SetStateAction<Date | undefined>> | void = (ToDate) => {
    
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
    <section className="flex flex-col items-center justify-start text-foreground p-3">

      <div className="p-10 flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          {/* <Label className="">From</Label> */}
          <DatePickerWithPresets FromSelection={FromSelection} placeholder="Enter your start date" setDate={handleSetFromDate} date={FromDate}></DatePickerWithPresets>
        </div>
        <div className="flex flex-col gap-3">
          {/* <Label>To</Label> */}
          <DatePickerWithPresets FromSelection={ToSelection} placeholder="Enter your end date" setDate={handleSetToDate} date={ToDate}></DatePickerWithPresets>
        </div>
        {/* {!session && <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-secondary"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <Link className="px-2 text-muted-foreground hover:underline hover:cursor-pointer" href={'/auth/signin'}>Sign Up to save Progress</Link>
          </div>
        </div>} */}
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="estimation">Estimation</Label>
          <Input type="text" id="estimation" placeholder="Enter your estimation (days)" />
        </div> */}
        
        {/* <div>
          Date 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline-block h-4 w-4 shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"></path></svg>
        </div> */}
        
      </div>  

      <div className="flex justify-center flex-row flex-wrap gap-5 card-container w-screen">
        {/* Render PrayerCardCounter for each prayer */}
        {
          daysDifference > 0 ?
            (
              <div className="flex justify-center flex-col sm:flex-row flex-wrap gap-5 card-container w-full">
                <div className=" text-xl font-light w-full text-center p-8 md:p-4">
                  You have remaining <span className="text-2xl font-medium text-primary">  {daysDifference}</span> {daysDifference>1 ? "sets" : "set"} of missed salah. 
                </div>
                
                <div className="px-3 sm:px-0 w-screen sm:w-auto">
                    <DataTable 
                      columns={columns} 
                      daysDifference={daysDifference}
                      data={estimationData} 
                      pagination={pagination} 
                      isDownload={isDownload}
                      setDownload={setDownload}
                      setPagination={setPagination} />
                </div>
                
                {/* PrayerCount Card */}
                {/* {Object.entries(prayerCounts).map(([prayer, count]) => (

                  <PrayerCardCounter
                    key={prayer}
                    prayer={prayer}
                    prayerCount={count}
                    ActionButton
                    OnClickIncrement={() => handleIncreasePrayerCount(prayer as keyof Prayers)}
                    OnClickDecrement={() => handleDecreasePrayerCount(prayer as keyof Prayers)}
                  />
                ))} */}
              </div>
            )
            :
            (
              <div className=" text-md font-light w-full text-center text-muted-foreground px-20 sm:px-24 break-words">
                  Specify date range and calculate the number of missed Salah prayers up to any given date.
                </div>
              // <p className="text-center pt-0 p-12 text-muted-foreground pb-80 w-3/5 sm:w-3/5 lg:w-2/4">Specify date range and calculate the number of missed Salah prayers up to any given date.</p>
            )
        }
      </div>
    </section>
  );
}
