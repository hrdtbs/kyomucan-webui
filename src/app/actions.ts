"use server";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

const rowTemplate = (
  from: string,
  to: string,
  amount: string,
  year: string,
  month: string,
  day: string
) => {
  return [
    dayjs(`${year}-${month}-${day}`).format("YYYY/MM/DD"),
    "s",
    "s",
    from,
    "s",
    "s",
    to,
    amount,
    "s",
    "s",
    "s",
  ].join(",");
};

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
      return [
        ...from.map((_, index) => {
          return rowTemplate(
            from[index],
            to[index],
            amount[index],
            year,
            month,
            day
          );
        }),
        ...from.map((_, routeIndex) => {
          const index = from.length - routeIndex - 1;
          return rowTemplate(
            to[index],
            from[index],
            amount[index],
            year,
            month,
            day
          );
        }),
      ].flat();
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
