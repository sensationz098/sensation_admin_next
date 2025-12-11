"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Generic profile card that renders any object shape based on a "fields" config.
 *
 * T is the data shape (StudentType, TeacherType, whatever).
 */
export type FieldConfig<T> = {
  key: keyof T & string;               // property name on the data object
  label?: string;                      // label to show in UI (defaults to key)
  editable?: boolean;                  // show input in edit modal
  render?: (value: any, row: T) => React.ReactNode; // custom render for this field
  hideOnCard?: boolean;                // don't show this field on the main card
};

type ProfileCardProps<T> = {
  data: T;
  fields?: FieldConfig<T>[];           // order + config for fields to display
  titleKey?: keyof T & string;         // primary title field (defaults to 'name' or first field)
  avatarKey?: keyof T & string;        // image url field (defaults to 'image' or 'image_url')
  footer?: React.ReactNode;
  editable?: boolean;                  // enable Edit button/modal
  onSave?: (newData: T) => Promise<void> | void; // save callback (optional)
  className?: string;
  actions?: React.ReactNode;           // extra action buttons to show
};

export default function ProfileCard<T extends Record<string, any>>(props: ProfileCardProps<T>) {
  const {
    data,
    fields,
    titleKey,
    avatarKey,
    footer,
    editable = true,
    onSave,
    className = "",
    actions,
  } = props;

  const resolvedTitleKey = (titleKey || ((("name" in data) && "name") || Object.keys(data)[0])) as string;
  const resolvedAvatarKey = (avatarKey || (("image_url" in data ? "image_url" : "image") as keyof T & string));

  const defaultFieldOrder = useMemo<FieldConfig<T>[]>(() => {
    if (fields && fields.length) return fields;
    const keys = [
      "email",
      "phone_no",
      "gender",
      "state",
      "join_date",
      "enrolled_courses",
      "experienceYears",
      "subject",
    ];
    return keys
      .map((k) => (k in data ? { key: k as keyof T & string } : null))
      .filter(Boolean) as FieldConfig<T>[];
  }, [fields, data]);

  const fieldList = fields && fields.length ? fields : defaultFieldOrder;

  // edit modal state
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Record<string, any>>(() => ({ ...data }));

  // update local editData when data prop changes
  React.useEffect(() => {
    setEditData({ ...data });
  }, [data]);

  const handleEditChange = (k: string, v: any) => {
    setEditData((s) => ({ ...s, [k]: v }));
  };

  const handleSave = async () => {
    if (onSave) await onSave(editData as T);
    setOpen(false);
  };

  const avatarSrc = (data as any)[resolvedAvatarKey];

  return (
    <div className={`bg-[#181818] text-white rounded-xl shadow-lg p-6 max-w-3xl w-full border border-[#222] ${className}`}>
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden border border-[#333] bg-zinc-800">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={String(data[resolvedTitleKey] ?? "avatar")} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400">No Image</div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{String(data[resolvedTitleKey] ?? "")}</h2>

          {/* Render main fields (first few non-hidden fields) */}
          <div className="mt-2 space-y-1 text-sm text-zinc-300">
            {fieldList.map((f) => {
              if (f.hideOnCard) return null;
              const value = (data as any)[f.key];
              const label = f.label ?? f.key;
              return (
                <div key={f.key} className="flex gap-2 items-start">
                  <div className="w-24 text-zinc-500">{label}:</div>
                  <div className="flex-1">
                    {f.render ? f.render(value, data) : Array.isArray(value) ? value.join(", ") : String(value ?? "—")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / actions */}
      <div className="flex items-center justify-between gap-3 mt-6">
        <div>{footer}</div>

        <div className="flex items-center gap-3">
          {actions}
          {editable && (
            <>
              <Button onClick={() => setOpen(true)} className="bg-[#00BFFF] text-black hover:bg-[#1E90FF]">
                Edit
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#181818] text-white border border-[#333] max-w-2xl">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Edit</h3>

            {fieldList.map((f) => {
              if (!f.editable) return null;
              const value = editData[f.key];
              const label = f.label ?? f.key;
              // simple input only for primitive/string/number and arrays handled as comma separated
              const inputValue = Array.isArray(value) ? (value as any).join(", ") : String(value ?? "");
              return (
                <div key={f.key}>
                  <Label>{label}</Label>
                  <Input
                    name={f.key}
                    value={inputValue}
                    onChange={(e) => {
                      const v = e.target.value;
                      handleEditChange(f.key, Array.isArray(value) ? v.split(",").map((s) => s.trim()) : v);
                    }}
                    className="bg-[#222] border-[#333] text-white"
                  />
                </div>
              );
            })}

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)} className="border-[#333] text-gray-300 hover:bg-[#222]">
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#00BFFF] text-black hover:bg-[#1E90FF]">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
