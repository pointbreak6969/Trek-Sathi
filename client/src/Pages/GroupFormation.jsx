"use client";

import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function GroupFormation() {
  const [step, setStep] = useState(1);
  const [groupSize, setGroupSize] = useState(null);
  const [wantMoreMembers, setWantMoreMembers] = useState(null);
  const methods = useForm({
    defaultValues: {
      trekRoute: "",
      startDate: null,
      endDate: null,
      genderPreference: "",
      ageFrom: "",
      ageTo: "",
      additionalMembers: "",
      groupSize: "",
    },
  });
  const { control, handleSubmit, setValue } = methods;

  const handleCreateGroup = (data) => {
    console.log("Group created with the following details:", {
      ...data,
      groupSize,
      wantMoreMembers,
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create a Trekking Group
      </h1>

      {step === 1 && (
        <FormProvider {...methods}>
          <form className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 text-center">
              How many trekkers are in your group?
            </h2>
            <FormField
              name="groupSize"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      placeholder="Enter number of trekkers"
                      className="w-full text-center border-gray-300"
                      onChange={(e) => {
                        field.onChange(e);
                        setGroupSize(parseInt(e.target.value, 10));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => {
                  if (groupSize) setStep(2);
                }}
                className="px-6"
              >
                Next
              </Button>
            </div>
          </form>
        </FormProvider>
      )}

      {step === 2 && (
        <div className="space-y-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Would you like to add more members to your group?
          </h2>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                setWantMoreMembers(true);
                setStep(3);
              }}
              className="px-6"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setWantMoreMembers(false);
                handleSubmit(handleCreateGroup)();
              }}
              className="px-6"
            >
              No
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleCreateGroup)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-gray-700 text-center">
                Current members: <strong>{groupSize}</strong>
              </p>
              <p className="text-gray-700 text-center">
                Looking for: 
              </p>
            </div>

            <FormField
              name="additionalMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center">
                    looking for
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 3"
                      min={0}
                      max={100 - groupSize}
                      {...field}
                      onChange={(e) => {
                        const value = Math.min(
                          Math.max(0, parseInt(e.target.value, 10)),
                          100 - groupSize
                        );
                        field.onChange(value);
                      }}
                      className="text-center border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="trekRoute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trek Route</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter trek route"
                      {...field}
                      className="border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-gray-300",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setValue("startDate", date, { shouldValidate: true });
                          }}
                          disabled={(date) =>
                            date < new Date() ||
                            (methods.watch("endDate")
                              ? date > methods.watch("endDate")
                              : false)
                          }
                          onClickDay={() => setValue("startDate", field.value, { shouldValidate: true })}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border-gray-300",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setValue("endDate", date, { shouldValidate: true });
                          }}
                          disabled={(date) =>
                            date < new Date() ||
                            (methods.watch("startDate")
                              ? date < methods.watch("startDate")
                              : false)
                          }
                          onClickDay={() => setValue("endDate", field.value, { shouldValidate: true })}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="genderPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender Preference</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="ageFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age From</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 18"
                        type="number"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="ageTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 50"
                        type="number"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Create Group
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}