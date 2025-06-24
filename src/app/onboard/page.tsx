"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Schema
const formSchema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10),
  categories: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  fee: z.string(),
  location: z.string(),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const categoryOptions = ["Singer", "Dancer", "DJ", "Speaker"];
const languageOptions = ["English", "Hindi", "Spanish", "French"];

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      languages: [],
    },
  });

  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/manager/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const onSubmit = async (data: FormData) => {
    try {
      const existing = JSON.parse(localStorage.getItem("artists") || "[]");
      const newArtist = { ...data, id: Date.now() };

      localStorage.setItem("artists", JSON.stringify([...existing, newArtist]));

      toast.success("Artist submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Artist Onboarding Form</h1>
      <Link href="/" className="inline-block mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Home
        </button>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea {...register("bio")} />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <div>
              <Label>Category</Label>
              <div className="space-y-1">
                {categoryOptions.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={cat}
                      {...register("categories")}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
              {errors.categories && (
                <p className="text-sm text-red-500">
                  Select at least one category
                </p>
              )}
            </div>

            <div>
              <Label>Languages Spoken</Label>
              <div className="space-y-1">
                {languageOptions.map((lang) => (
                  <label key={lang} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={lang}
                      {...register("languages")}
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
              {errors.languages && (
                <p className="text-sm text-red-500">
                  Select at least one language
                </p>
              )}
            </div>

            <div>
              <Label>Fee Range</Label>
              <select
                {...register("fee")}
                className="border rounded p-2 w-full"
              >
                <option value="">Select</option>
                <option value="$800 - $1200">$800 - $1200</option>
                <option value="$1000 - $1500">$1000 - $1500</option>
                <option value="$1500 - $2500">$1500 - $2500</option>
              </select>
              {errors.fee && (
                <p className="text-sm text-red-500">{errors.fee.message}</p>
              )}
            </div>

            <div>
              <Label>Location</Label>
              <Input {...register("location")} />
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <Label>Profile Image (optional)</Label>
              <Input type="file" {...register("image")} />
            </div>

            <Button type="submit">Submit Artist</Button>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
