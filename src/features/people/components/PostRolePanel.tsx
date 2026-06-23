"use client";

import Link from "next/link";
import { ArrowRight, FilePlus2, Megaphone, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  {
    icon: FilePlus2,
    title: "Build a hiring form",
    description:
      "Create a tailored application form with the exact questions and screening you need.",
  },
  {
    icon: Megaphone,
    title: "Publish & share",
    description:
      "Publish the role to your public job board and share a single link with candidates.",
  },
  {
    icon: Users,
    title: "Review applicants",
    description:
      "Track submissions, GitHub insights, and move strong candidates through your pipeline.",
  },
];

export default function PostRolePanel() {
  return (
    <section className="space-y-6">
      <div className="rounded-xl border bg-linear-to-br from-primary/10 via-card to-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <h2 className="text-xl font-semibold">Post a new role</h2>
            <p className="text-sm text-muted-foreground">
              Create a hiring form to collect applications, then publish it to your
              job board. Combine it with â€œFind peopleâ€ to proactively reach top
              open-source contributors.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="/dashboard/forms/new">
              <FilePlus2 className="size-4" />
              Create hiring form
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <div key={item.title} className="rounded-xl border bg-card/80 p-5 shadow-xs">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </div>
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-xl border bg-card/80 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Already posted roles?</p>
          <p className="text-sm text-muted-foreground">
            Manage and track all your existing hiring forms from the dashboard.
          </p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/dashboard">
            View dashboard
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

