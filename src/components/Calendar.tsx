"use client";
import dayjs from "dayjs";
import { useState } from "react";

export const Calendar = () => {
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [weekdays, setWeekdays] = useState([2, 4]);
  const date = dayjs()
    .year(year)
    .month(month - 1)
    .date(1);
  return (
    <div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="year"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            年
          </label>
          <input
            id="year"
            name="year"
            type="number"
            defaultValue={dayjs().year()}
            step={1}
            min={1990}
            max={dayjs().year() + 1}
            onChange={(event) => setYear(Number(event.target.value))}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="month"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            月
          </label>
          <input
            id="month"
            name="month"
            type="number"
            defaultValue={dayjs().month() + 1}
            onChange={(event) => setMonth(Number(event.target.value))}
            step={1}
            min={1}
            max={12}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <fieldset className="mb-6">
        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          出勤曜日
        </legend>

        <div className="flex flex-wrap gap-x-6">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const id = `day-${day}`;
            return (
              <div className="flex items-center mb-4" key={day}>
                <input
                  id={id}
                  type="checkbox"
                  name="weekdays"
                  defaultChecked={day === 2 || day === 4}
                  onChange={(event) => {
                    if (event.currentTarget.checked) {
                      setWeekdays([...weekdays, day]);
                    } else {
                      setWeekdays(weekdays.filter((d) => d !== day));
                    }
                  }}
                  value={day}
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={id}
                  className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {dayjs().day(day).format("dddd")}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      <div>
        <h2 className="text-2xl font-bold mb-2">{date.format("YYYY年MM月")}</h2>
        <div className="grid grid-cols-7">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            return (
              <div className="text-center" key={day}>
                {date.day(day).format("dd")}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 border-t-2 border-l-2 border-blue-300">
          {Array.from({ length: date.day() }).map((_, index) => {
            return (
              <div
                className="text-center border-b-2 border-r-2 border-blue-300"
                key={index}
              ></div>
            );
          })}
          {Array.from({ length: date.daysInMonth() }).map((_, index) => {
            const day = date.date(index + 1);
            const checked = weekdays.includes(day.day());
            return (
              <label
                className="text-center border-b-2 border-r-2 border-blue-300 p-2 cursor-pointer"
                key={index}
              >
                <div>{index + 1}</div>
                <input
                  type="checkbox"
                  name="days"
                  value={index + 1}
                  key={checked.toString()}
                  defaultChecked={checked}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
