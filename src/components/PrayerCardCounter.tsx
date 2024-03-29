// 'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MouseEventHandler } from "react";

export type Prayers = {
    Subuh: number;
    Zohor: number;
    Asar: number;
    Maghrib: number;
    Isyak: number
  }
  
export type PrayerCardCounterProps = { 
    prayer: string,
    prayerCount: number,
  } & (
    { 
        ActionButton: true, 
        OnClickIncrement: MouseEventHandler<HTMLButtonElement> | undefined, 
        OnClickDecrement: MouseEventHandler<HTMLButtonElement> | undefined 
    } |
    { 
        ActionButton?: false, 
        OnClickIncrement?: never, 
        OnClickDecrement?: never 
    }
  ); 

  const PrayerCardCounter = function PrayerCardCounter( 
    { 
        prayer, 
        prayerCount, 
        OnClickIncrement, 
        OnClickDecrement, 
        ActionButton = false 
    } : PrayerCardCounterProps ) {

    
    return (
        <>
            <Card className=" border-none">
                <CardHeader>
                    {/* <CardTitle>Qada</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                    <CardContent className="p-0">
                        <div className="flex items-center justify-center space-x-2">
                            
                            {
                                ActionButton ?
                                    <button onClick={OnClickDecrement} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 w-12 shrink-0 rounded-full">{'<'}</button>
                                    : null

                            }

                            <div className="flex-1 text-center">
                                <div className="text-center text-5xl font-bold tracking-tighter select-none" >{prayerCount}</div>
                                <div className="text-center text-[0.70rem] uppercase text-muted-foreground">{prayer} left</div>
                            </div>
                            
                            {
                                ActionButton ?
                                    <button onClick={OnClickIncrement} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 w-12 shrink-0 rounded-full">{'>'}</button>
                                    : null
                            }
                            
                        </div>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
}

export default PrayerCardCounter;