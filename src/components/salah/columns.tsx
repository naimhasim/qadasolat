// "use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export type Prayer = {
    set: number
    subuh: boolean
    zohor: boolean
    asar: boolean
    maghrib: boolean
    isyak: boolean
}

type PrayerKeysExceptSet = Exclude<keyof Prayer, 'set'>;

const CheckboxCell = (
    {
        row,
        accessor,
        onCheckedChange
    }: {
        row: Row<Prayer>,
        accessor: PrayerKeysExceptSet,
        onCheckedChange: (isChecked: CheckedState, accessor: PrayerKeysExceptSet) => void
    }) => {

    return (

        <div className="flex items-center justify-center p-4">
            <Checkbox className="scale-150"
                name={`${accessor}.${row.id}`}
                checked={row.original[accessor] ? true : false}
                onCheckedChange={(isChecked) => onCheckedChange(isChecked, accessor)}
                aria-label={`${accessor}-${row.id}`}
            />
        </div>
    )
};

export const prayerColumnDefs = ( { setStateFunction, prayers } : { setStateFunction : any, prayers : Prayer[] } ) => {
    
    const handleCheckedChange = (accessor: PrayerKeysExceptSet, isChecked : CheckedState, set : Prayer['set']) => {
        
        const updatedPrayers = prayers.map(prayer => {
            if (prayer.set === set) {
                return { ...prayer, [accessor]: isChecked };
            }
            return prayer;
        });
        
        setStateFunction([...updatedPrayers]);
    };
    
    const columns: ColumnDef<Prayer>[] = [
        {
            accessorKey: "set",
            header: "Set",
            enableSorting: true,
        },
        {
            accessorKey: "subuh",
            header: "Subuh",
            cell: ({ row }) => (
                <CheckboxCell
                    row={row}
                    accessor="subuh"
                    onCheckedChange={(isChecked, accessor)=>(handleCheckedChange( accessor, isChecked, row.original.set))}
                />
            ),
        },
        {
            accessorKey: "zohor",
            header: "Zohor",
            cell: ({ row }) => (
                <CheckboxCell
                    row={row}
                    accessor="zohor"
                    onCheckedChange={(isChecked, accessor)=>(handleCheckedChange( accessor, isChecked, row.original.set))}
                />
            ),
        },
        {
            accessorKey: "asar",
            header: "Asar",
            cell: ({ row }) => (
                <CheckboxCell
                    row={row}
                    accessor="asar"
                    onCheckedChange={(isChecked, accessor)=>(handleCheckedChange( accessor, isChecked, row.original.set))}
                />
            ),
        },
        {
            accessorKey: "maghrib",
            header: "Maghrib",
            cell: ({ row }) => (
                <CheckboxCell
                    row={row}
                    accessor="maghrib"
                    onCheckedChange={(isChecked, accessor)=>(handleCheckedChange( accessor, isChecked, row.original.set))}
                />
            ),
        },
        {
            accessorKey: "isyak",
            header: "Isyak",
            cell: ({ row }) => (
                <CheckboxCell
                    row={row}
                    accessor="isyak"
                    onCheckedChange={(isChecked, accessor)=>(handleCheckedChange( accessor, isChecked, row.original.set))}
                />
            ),
        },
    ]
    
    return columns;
}