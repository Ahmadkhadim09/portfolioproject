import React from "react";

type Props = React.SVGProps<SVGSVGElement> & { className?: string };

export default function BadgeCheck({ className, ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 2l2.5 1.5 2.5.5 1.5 2-0.5 2.5L21 12l-1.5 2.5.5 2.5-1.5 2-2.5.5L12 22l-2.5-1.5-2.5-.5-1.5-2 .5-2.5L3 12l1.5-2.5-.5-2.5 1.5-2 2.5-.5L12 2z"
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
