"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useZustandStore } from "@/lib/useZustandStore";
import { createRandomMatch } from "@/lib/demo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import FactionComboBox from "@/components/ComboBoxFaction";
import type { Faction } from "@/types";

const formSchema = z.object({
  batchSize: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Please enter a valid number",
  }),
  faction: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MatchGenerate() {
  const addMatchDb = useZustandStore((state) => state.addMatchDb);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batchSize: "10",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const promises = [];
      const batchSize = parseInt(values.batchSize, 10);
      for (let i = 0; i < batchSize; i++) {
        const match = createRandomMatch(values.faction as Faction | undefined);
        promises.push(addMatchDb(match));
      }
      await Promise.all(promises);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["matches"] });
      toast.success("Matches generated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to generate matches:", { description: error.message });
    },
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Match Generation</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="batchSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Size</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  The number of matches to generate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faction</FormLabel>
                <FormControl>
                  <FactionComboBox
                    initialValue={field.value as Faction | null}
                    onSelectCb={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Select a faction to be used for all generated matches.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Generating..." : "Generate Matches"}
          </Button>
        </form>
      </Form>
    </div>
  );
}