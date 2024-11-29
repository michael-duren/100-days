import { useState } from "react";
import { Button } from "@/features/ui/button";
import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";
import { Switch } from "@/features/ui/switch";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/settings")({
  component: Settings,
});

function Settings() {
  const { user } = useAuthStore();
  const [notification, setNotification] = useState(false);

  return (
    <div className="shadow-md flex flex-col gap-8 border rounded-lg p-6 text-center max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={(v) => setNotification(v)}
            checked={notification}
            id="notifications"
          />
          <Label htmlFor="notifications">Daily Notifications</Label>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex mb-2">
            <Label>Notification Frequency</Label>
          </div>
          <div className="flex">
            <Select disabled={!notification}>
              <SelectTrigger>
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-full flex mb-2">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input id="email" disabled value={user?.email} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex mb-2">
            <Label htmlFor="username">Username</Label>
          </div>
          <Input id="username" disabled value={user?.userid} />
        </div>
        <Button variant={"secondary"}>Update</Button>
        <Button variant={"destructive"}>Delete Account</Button>
      </div>
    </div>
  );
}
