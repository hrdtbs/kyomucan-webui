import dayjs from "dayjs";
import "dayjs/locale/ja";
import { Calendar } from "../components/Calendar";
import { Routes } from "../components/Routes";
import fs from "fs/promises";
import iconv from "iconv-lite";

export const writeFileShiftJIS = (filePath: string, data: string) => {
  const buf = iconv.encode(data, "Shift_JIS");
  return fs.writeFile(filePath, buf);
};

dayjs.locale("ja");

export default function Home(props: {
  searchParams: {
    year: string;
    month: string;
    weekdays: string[];
    routesCount: string;
    from: string[];
    to: string[];
    amount: string[];
    days: string[];
  };
}) {
  async function handleSubmit(formData: FormData) {
    "use server";

    const year = formData.get("year") as string;
    const month = formData.get("month") as string;
    const days = formData.getAll("days") as string[];
    const from = formData.getAll("from") as string[];
    const to = formData.getAll("to") as string[];
    const amount = formData.getAll("amount") as string[];

    console.log(from);

    const result = days
      .map((day) => {
        return from
          .map((_, routeIndex) => {
            return [
              dayjs(`${year}-${month}-${day}`).format("YYYY/MM/DD"),
              "s",
              "s",
              from[routeIndex],
              "s",
              "s",
              to[routeIndex],
              amount[routeIndex],
              "s",
              "s",
              "s",
            ].join(",");
          })
          .flat();
      })
      .flat()
      .join("\n");

    await writeFileShiftJIS(
      "./hoge.csv",
      [
        "allocation_date",
        "9999/12/31,定期,この行は読み込まれません",
        result,
      ].join("\n")
    );
  }

  return (
    <main className="p-24">
      <header className="mb-12">
        <h1 className="text-6xl font-bold text-center">Kyomucan WebUI</h1>
      </header>

      <form action={handleSubmit}>
        <div className="mb-8">
          <Calendar />
        </div>
        <div className="mb-8">
          <Routes
            routes={
              props.searchParams.from?.length
                ? Array.from({ length: props.searchParams.from.length }).map(
                    (_, index) => {
                      return {
                        from: props.searchParams.from[index],
                        to: props.searchParams.to[index],
                        amount: props.searchParams.amount[index],
                      };
                    }
                  )
                : []
            }
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          生成
        </button>
      </form>
    </main>
  );
}
