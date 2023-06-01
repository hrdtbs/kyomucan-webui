"use client";
import { Calendar } from "../components/Calendar";
import { Routes } from "../components/Routes";
import { handleSubmit } from "./actions";
import Encoding from "encoding-japanese";

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
  return (
    <main className="p-6 md:p-24">
      <header className="mb-12">
        <h1 className="text-6xl font-bold text-center">Kyomucan WebUI</h1>
      </header>

      <form
        action={async (formData) => {
          const csvData = await handleSubmit(formData);

          const codes = Encoding.stringToCode(csvData);
          const shiftJisCodeList = Encoding.convert(codes, "SJIS", "UNICODE");

          const blob = new Blob([new Uint8Array(shiftJisCodeList)], {
            type: "text/csv;charset=Shift_JIS",
          });

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "kyomucan.csv";
          link.click();
        }}
      >
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
