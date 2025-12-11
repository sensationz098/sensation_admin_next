




import Link from "next/link";
import { LucideIcon } from "lucide-react";

type BaseProps = {
  className?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  // optional small note shown in footer
  footer?: string;
};

/**
 * Simple stat card: title + value + optional description (original use).
 */
type StatVariant = {
  variant?: "stat";
  title: string;
  value: string | number;
  description?: string;
} & BaseProps;

/**
 * Course card: used for course listings
 */
type CourseVariant = {
  variant: "course";
  courseName: string;
  teacher?: string;
  duration?: string; // e.g. "8 weeks"
  price?: number; // original price
  discountPercent?: number; // optional percent, 0-100
  // optional call to action (server side link)
  ctaLabel?: string;
  ctaHref?: string;
} & BaseProps;

/**
 * Batch card: used for "Active Batches"
 */
type BatchVariant = {
  variant: "batch";
  title: string; // batch or course title
  teacher?: string;
  duration?: string;
  studentsEnrolled?: number;
  // is this batch active? used to style the action button
  active?: boolean;
  // server-side link for action (view/join/manage)
  actionLabel?: string;
  actionHref?: string;
} & BaseProps;

type StudentCourseVariant = {
  variant: "StudentCourse";
  title: string;
  teacher?: string;
  duration?: string;
  // allow either Date or ISO string input for convenience
  joinedDate: Date | string;
  endDate: Date | string;
  // optional action for student (resume/view)
  actionLabel?: string;
  actionHref?: string;
  // whether the course is currently active for the student
  active?: boolean;
} & BaseProps;

export type StatsCardProps = StatVariant | CourseVariant | BatchVariant | StudentCourseVariant;


function PriceBlock({ price, discountPercent }: { price?: number; discountPercent?: number | null }) {
  if (typeof price !== "number") return null;

  const dp = discountPercent && discountPercent > 0 ? discountPercent : 0;
  const discounted = dp > 0 ? +(price * (1 - dp / 100)).toFixed(2) : price;

  return (
    <div className="flex items-baseline gap-3">
      <div className="text-lg font-semibold text-white">₹{discounted}</div>
      {dp > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="line-through text-muted-foreground">₹{price}</span>
          <span className="rounded-full bg-green-600/20 px-2 py-0.5 text-xs font-medium text-green-300">
            {dp}% OFF
          </span>
        </div>
      )}
    </div>
  );
}

export default function StatsCard(props: StatsCardProps) {
  // Shared wrapper classes
  const wrapperBase =
    "rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/60 to-zinc-900 p-4 shadow-sm";

  // Variant: stat (default)
  if ((props as StatVariant).variant === undefined || (props as StatVariant).variant === "stat") {
    const { title, value, description, icon: Icon, footer, className } = props as StatVariant;
    return (
      <div className={`${wrapperBase} ${className ?? ""}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium text-zinc-300">{title}</div>
            <div className="mt-2 text-2xl font-extrabold text-white">{value}</div>
          </div>
          {Icon && <Icon className="h-6 w-6 text-zinc-400" />}
        </div>
        {description && <p className="mt-3 text-sm text-zinc-400">{description}</p>}
        {footer && <div className="mt-4 text-xs text-zinc-500">{footer}</div>}
      </div>
    );
  }

  // Variant: course
  if ((props as CourseVariant).variant === "course") {
    const {
      courseName,
      teacher,
      duration,
      price,
      discountPercent,
      ctaHref,
      ctaLabel,
      icon: Icon,
      footer,
      className,
    } = props as CourseVariant;

    return (
      <article className={`${wrapperBase} ${className ?? ""}`}>
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white leading-tight">{courseName}</h3>
            <p className="mt-1 text-sm text-zinc-400">
              {teacher ?? "—"} • {duration ?? "—"}
            </p>
          </div>
          {Icon && <Icon className="h-5 w-5 text-zinc-400" />}
        </header>

        <div className="mt-4 flex items-center justify-between">
          <PriceBlock price={price} discountPercent={discountPercent ?? 0} />
          {ctaHref ? (
            <Link
              href={ctaHref}
              className="ml-4 inline-flex items-center rounded-md bg-[#00BFFF] px-3 py-1.5 text-sm font-medium text-black hover:opacity-95"
            >
              {ctaLabel ?? "View"}
            </Link>
          ) : (
            <div className="ml-4 text-sm text-zinc-500">No action</div>
          )}
        </div>

        {footer && <div className="mt-3 text-xs text-zinc-500">{footer}</div>}
      </article>
    );
  }

  // Variant: batch
  if ((props as BatchVariant).variant === "batch") {
    const {
      title,
      teacher,
      duration,
      studentsEnrolled,
      active,
      actionHref,
      actionLabel,
      icon: Icon,
      footer,
      className,
    } = props as BatchVariant;

    // Style for active vs inactive
    const actionBase = active
      ? "bg-[#00BFFF] text-black hover:opacity-95"
      : "bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800";

    return (
      <div className={`${wrapperBase} ${className ?? ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white leading-tight">{title}</h4>
            <p className="mt-1 text-xs text-zinc-400">
              {teacher ?? "—"} • {duration ?? "—"}
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full bg-zinc-800 px-2 py-0.5 text-xs">
                  Students
                </span>
                <span className="font-medium">{studentsEnrolled ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            {Icon && <Icon className="h-5 w-5 text-zinc-400" />}
            {actionHref ? (
              <Link
                href={actionHref}
                className={`mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${actionBase}`}
                aria-label={actionLabel ?? "Action"}
              >
                {actionLabel ?? (active ? "Active" : "View")}
              </Link>
            ) : (
              <button
                type="button"
                className={`mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${actionBase}`}
                aria-disabled={!active}
              >
                {active ? "Active" : "Inactive"}
              </button>
            )}
          </div>
        </div>

        {footer && <div className="mt-3 text-xs text-zinc-500">{footer}</div>}
      </div>
    );
  }



  // Variant: StudentCourse
  if ((props as StudentCourseVariant).variant === "StudentCourse") {
    const {
      title,
      teacher,
      duration,
      joinedDate,
      endDate,
      actionHref,
      actionLabel,
      active,
      icon: Icon,
      footer,
      className,
    } = props as StudentCourseVariant;

    // Normalize dates
    const joined = typeof joinedDate === "string" ? new Date(joinedDate) : (joinedDate as Date);
    const end = typeof endDate === "string" ? new Date(endDate) : (endDate as Date);

  

    // action style - active student has primary button
    const actionBase = active ? "bg-[#00BFFF] text-black hover:opacity-95" : "bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800";

    return (
      <div className={`${wrapperBase} ${className ?? ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white leading-tight">{title}</h4>
            <p className="mt-1 text-xs text-zinc-400">
              {teacher ?? "—"} • {duration ?? "—"}
            </p>

            <div className="mt-3 space-y-2">
              <div className="text-xs text-zinc-400">
                Joined: <span className="font-medium text-zinc-200">(DATE )</span>
                {" • "}
                Ends: <span className="font-medium text-zinc-200">(end)</span>
              </div>

          
            </div>
          </div>
{/* 
          <div className="flex flex-col items-end justify-between">
            {Icon && <Icon className="h-5 w-5 text-zinc-400" />}

            {actionHref ? (
              <Link
                href={actionHref}
                className={`mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${actionBase}`}
                aria-label={actionLabel ?? "Open course"}
              >
                {actionLabel ?? (active ? "Resume" : "View")}
              </Link>
            ) : (
              <button
                type="button"
                className={`mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${actionBase}`}
                aria-disabled={!active}
              >
                {active ? actionLabel ?? "Resume" : actionLabel ?? "View"}
              </button>
            )}
          </div> */}
        </div>

        {footer && <div className="mt-3 text-xs text-zinc-500">{footer}</div>}
      </div>
    );
  }

  // Fallback: shouldn't reach here
  return null;
}