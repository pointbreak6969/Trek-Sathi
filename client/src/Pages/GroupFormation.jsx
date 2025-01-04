import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
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
import { 
  CalendarIcon, 
  UsersIcon, 
  MapPinIcon, 
  Mountain, 
  Users,
  Clock,
  ChevronRight
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const GroupFormation = () => {
  const [groupSize, setGroupSize] = useState(null);
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
  const { control, handleSubmit, setValue, watch } = methods;
  const [step, setStep] = useState(1);

  const handleCreateGroup = (data) => {
    console.log("Group created with the following details:", {
      ...data,
      groupSize,
    });
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              step === num
                ? "bg-[#6366f1] text-white"
                : step > num
                ? "bg-[#6366f1]/20 text-[#6366f1]"
                : "bg-gray-100 text-gray-400"
            )}
          >
            {num}
          </div>
          {num < 3 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-2",
                step > num ? "bg-[#6366f1]" : "bg-gray-100"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#6366f1]/60 bg-clip-text text-transparent">
                Create Your Trek Group
              </h1>
              <p className="text-gray-500 mt-2">
                Find the perfect companions for your adventure
              </p>
            </div>

            {renderStepIndicator()}

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleCreateGroup)} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <FormField
                      name="trekRoute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <Mountain className="w-4 h-4" />
                            Trek Route
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Everest Base Camp"
                              {...field}
                              className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#6366f1]/20"
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
                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Start Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "h-12 w-full rounded-xl border-gray-200",
                                      !field.value && "text-gray-400"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "MMM d, yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className="rounded-lg border"
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
                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              End Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "h-12 w-full rounded-xl border-gray-200",
                                      !field.value && "text-gray-400"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "MMM d, yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className="rounded-lg border"
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <FormField
                      name="groupSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Current Group Size
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="1"
                              placeholder="How many trekkers do you have?"
                              className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#6366f1]/20"
                              onChange={(e) => {
                                field.onChange(e);
                                setGroupSize(parseInt(e.target.value, 10));
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="additionalMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium flex items-center gap-2">
                            <UsersIcon className="w-4 h-4" />
                            Additional Members Needed
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="How many more people do you need?"
                              className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#6366f1]/20"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <FormField
                      name="genderPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Gender Preference
                          </FormLabel>
                          <Select onValueChange={field.onChange} {...field}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-gray-200">
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="ageFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Age Range (From)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Min age"
                                className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#6366f1]/20"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="ageTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              To
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Max age"
                                className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#6366f1]/20"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="rounded-xl border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1]/10"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="ml-auto rounded-xl bg-[#6366f1] hover:bg-[#6366f1]/90 text-white"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button type="submit" className="ml-auto rounded-xl bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
                      Create Group
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GroupFormation;