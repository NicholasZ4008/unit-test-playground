import { Skeleton } from "antd";
import React from "react";

interface CardProps {
  loading?: boolean;
  children?: React.ReactNode;
}

export default function Card({ loading, children }: CardProps) {
  return (
    <div
      className="bg-white rounded-md w-full p-10 shadow-md dark:bg-gray-500"
      data-testid="card-component"
    >
      {loading ? (
        <div data-testid="loading-component">
          <Skeleton loading active />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
