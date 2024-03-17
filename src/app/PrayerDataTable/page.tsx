import { Prayer, prayerColumnDefs } from "@/components/salah/columns"
import { DataTable } from "@/components/DataTable"
async function getData(): Promise<Prayer[]> {
  // Fetch data from your API here.
  return [
    {
      set: 1,
      subuh: true,
      zohor: false,
      asar: false,
      maghrib: true,
      isyak: true,
    },
    {
      set: 1,
      subuh: true,
      zohor: true,
      asar: true,
      maghrib: true,
      isyak: true,
    },
    // ...
  ]
}


const PrayerDataTable = async () => {
  const data = await getData();
  const columns = prayerColumnDefs; 
  return (
    <>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default PrayerDataTable;