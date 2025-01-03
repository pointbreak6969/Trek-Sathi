import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Sign Up</h2>
        <form action="/submit_signup" method="post" encType="multipart/form-data">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input id="name" name="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input type="tel" id="phone" name="phone" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
            <Input type="file" id="image" name="image" accept="image/*" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div className="mb-6">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <Select id="gender" name="gender" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <SelectTrigger>
                <button className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">Select Gender</button>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <Input type="number" id="age" name="age" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
          </div>

          <div className="mb-6">
            <label htmlFor="socials" className="block text-sm font-medium text-gray-700">Social Media Links (optional)</label>
            <Textarea id="socials" name="socials" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Add your social media links here..."/>
          </div>

          <div className="mb-6">
            <label htmlFor="past_treks" className="block text-sm font-medium text-gray-700">Past Treks (optional)</label>
            <Textarea id="past_treks" name="past_treks" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Describe your past treks here..."/>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;