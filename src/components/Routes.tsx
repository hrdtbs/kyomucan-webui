"use client";
import { useState } from "react";

export const Routes = (props: {
  routes: { from: string; to: string; amount: string }[];
}) => {
  const [routesCount, setRouteCount] = useState(props.routes.length || 1);
  return (
    <div>
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            交通経路数
          </label>
          <input
            name="routesCount"
            type="number"
            required
            value={routesCount}
            onChange={(event) => {
              setRouteCount(Number(event.target.value));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <fieldset>
        <legend className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          交通経路
        </legend>
        {[...Array(routesCount)].map((_, index) => {
          const route = props.routes[index];
          return (
            <div key={index}>
              <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    From
                  </label>
                  <input
                    name="from"
                    type="text"
                    required
                    defaultValue={route?.from}
                    placeholder="池袋駅"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    To
                  </label>
                  <input
                    name="to"
                    type="text"
                    required
                    placeholder="東京駅"
                    defaultValue={route?.to}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    費用（円）
                  </label>
                  <input
                    name="amount"
                    defaultValue={route?.amount}
                    type="number"
                    step={1}
                    placeholder="500"
                    min={0}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
        <p className="text-sm text-right text-gray-700">
          往復は自動保管されるため片道のみ入力してください。
        </p>
      </fieldset>
    </div>
  );
};
