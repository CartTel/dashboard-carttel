import UAParser from "ua-parser-js"; // or import * as UAParser from "ua-parser-js";
import { format, formatDistanceToNowStrict, isPast } from "date-fns";
import { Laptop, LucideIcon, Smartphone } from "lucide-react";

type DeviceType = "desktop" | "mobile";

interface AgentType {
  deviceType: DeviceType;
  browser: string;
  os: string;
  timeAgo: string;
  icon: LucideIcon;
}

export const parseUserAgent = (
  userAgent: string,
  createdAt: string
): AgentType => {
  const parser = new UAParser(); // Ensure this line works now
  const result = parser.setUA(userAgent).getResult();

  const deviceType: DeviceType =
    result.device.type === "mobile" ? "mobile" : "desktop";

  const browser = result.browser.name || "Unknown Browser";
  const os = `${result.os.name || "Unknown OS"} ${result.os.version || ""}`.trim();

  const icon = deviceType === "mobile" ? Smartphone : Laptop;

  const formattedAt = isPast(new Date(createdAt))
    ? `${formatDistanceToNowStrict(new Date(createdAt))} ago`
    : format(new Date(createdAt), "d MMM, yyyy");

  return {
    deviceType,
    browser,
    os,
    timeAgo: formattedAt,
    icon,
  };
};
