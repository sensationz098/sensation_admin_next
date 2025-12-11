"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CouponFormData = {
  coupon_code: string;
  description: string;
  discount_amount: number;
  min_amount: number;
  expiry: string;
};

export default function TransactionCouponForm() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormData>({
    defaultValues: {
      coupon_code: "",
      description: "",
      discount_amount: 0,
      min_amount: 0,
      expiry: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CouponFormData) => {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: "ACTIVE", // DB default
        }),
      });

      if (!res.ok) throw new Error("Failed to add coupon");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 2000);
    },
  });

  const onSubmit = (data: CouponFormData) => mutation.mutate(data);

  return (
    <div >
              <h1 className="text-4xl font-bold mb-6">Transaction Coupon</h1>


<div  className="bg-[#111] border border-[#222] rounded-2xl p-6"  >
<h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Coupon Code */}
        <div>
          <label className="block mb-1">Coupon Code</label>
          <input
            {...register("coupon_code", { required: "Code is required" })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
            placeholder="SAVE20"
          />
          {errors.coupon_code && (
            <p className="text-red-500 text-sm">{errors.coupon_code.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <input
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
            placeholder="Flat 20% off on orders above ₹500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block mb-1">Discount Amount (%)</label>
          <input
            type="number"
            {...register("discount_amount", {
              required: "Discount is required",
              min: { value: 1, message: "Minimum 1%" },
              max: { value: 100, message: "Maximum 100%" },
            })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
            placeholder="20"
          />
          {errors.discount_amount && (
            <p className="text-red-500 text-sm">{errors.discount_amount.message}</p>
          )}
        </div>

        {/* Minimum Amount */}
        <div>
          <label className="block mb-1">Minimum Amount (₹)</label>
          <input
            type="number"
            {...register("min_amount", {
              required: "Minimum amount is required",
              min: { value: 1, message: "Must be greater than 0" },
            })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
            placeholder="500"
          />
          {errors.min_amount && (
            <p className="text-red-500 text-sm">{errors.min_amount.message}</p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block mb-1">Expiry Date</label>
          <input
            type="date"
            {...register("expiry", { required: "Expiry date is required" })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
          />
          {errors.expiry && (
            <p className="text-red-500 text-sm">{errors.expiry.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-[#00BFFF] text-white rounded-md hover:opacity-80"
        >
          {mutation.isPending ? "Adding..." : "Add Coupon"}
        </button>

        {success && <p className="text-green-500 text-sm mt-2">Coupon added successfully.</p>}
      </form>
</div>
      
    </div>
  );
}
