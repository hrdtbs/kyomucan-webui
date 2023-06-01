"use server";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export async function handleSubmit(formData: FormData) {
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

  //const filePath = "./data.csv";
  const data = [
    "allocation_date",
    "9999/12/31,定期,この行は読み込まれません",
    result,
  ].join("\n");

  return data;
}
