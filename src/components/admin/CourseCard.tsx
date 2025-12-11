import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  image_url: string;
  teacher_name: string;
  price: number;
  discounted_price: number | null;
  duration: string;

  // 🆕 NEW FIELDS
  days: string[];
  category: string;
}

export function CourseCard({
  id,
  title,
  image_url,
  teacher_name,
  price,
  discounted_price,
  duration,
  days,
  category,
}: CourseCardProps) {

  const hasDiscount = discounted_price && discounted_price < price;
  const discount = hasDiscount
    ? Math.round(((price - discounted_price) / price) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <Image
          src={"/default.jpg"}
          alt={title}
          fill
          loading="eager"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {hasDiscount && (
          <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}

        <Badge className="absolute top-3 left-3 bg-gray-500/70 text-white">
          <Clock className="w-3 h-3 mr-1" />
          {duration}
        </Badge>
      </div>

      {/* CONTENT */}
      <CardHeader className="pb-3">

        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Teacher */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <User className="w-4 h-4" />
          <span>{teacher_name || "no teacher assigned"}</span>
        </div>

        {/* 🆕 CATEGORY */}
        <Badge className="mt-2 w-fit bg-blue-500/20 text-blue-700 hover:bg-blue-600/30">
          {category}
        </Badge>

        {/* 🆕 DAYS LIST */}
        <div className="flex flex-wrap gap-1 mt-2">
          {days?.map((day) => (
            <Badge
              key={day}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              {day}
            </Badge>
          ))}
        </div>

      </CardHeader>

      {/* FOOTER */}
      <CardFooter className="flex items-center justify-between pt-0">
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-2xl font-bold text-primary">
                ₹{discounted_price?.toLocaleString() || 0}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{price?.toLocaleString() || 0}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-primary">
              ₹{price?.toLocaleString() || 0}
            </span>
          )}
        </div>

        {/* <Button size="sm" variant="outline" asChild>
          <Link href={`/admin/dashboard/courses/view/${id}`}>View Details</Link>
        </Button> */}

      </CardFooter>
    </Card>
  );
}
