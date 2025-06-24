"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import { motion } from "framer-motion";
import IMAGE from "next/image";

export default function HomePage() {
  const categories = [
    { name: "Singers", image: "/images/singers.svg" },
    { name: "Dancers", image: "/images/dancers.svg" },
    { name: "DJs", image: "/images/djs.svg" },
    { name: "Speakers", image: "/images/speakers.svg" },
  ];

  return (
    <>
      <Head>
        <title>Artistly | Book the Best Performing Artists</title>
        <meta
          name="description"
          content="Discover top singers, DJs, dancers, and speakers for your events. Easy booking and amazing performances await."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen p-6 md:p-10 space-y-10 bg-white text-black dark:bg-gray-950 dark:text-white"
      >
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl font-bold">Artistly</h1>
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/artists">Artists</Link>
            <Link href="/onboard">Onboard</Link>
            <Link href="/manager/dashboard">Dashboard</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold">
            Book the Best Performing Artists for Your Event
          </h2>
          <p className="text-muted-foreground dark:text-gray-400">
            Discover top singers, dancers, speakers, and DJs. Simple booking,
            instant impact.
          </p>
          <Button asChild>
            <Link href="/artists">Explore Artists</Link>
          </Button>
        </section>

        {/* Category Cards */}
        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="overflow-hidden shadow-md dark:bg-gray-800"
            >
              <IMAGE
                src={cat.image}
                alt={cat.name}
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-4 text-center font-semibold">
                {cat.name}
              </CardContent>
            </Card>
          ))}
        </section>
      </motion.main>
    </>
  );
}
