import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },

    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },

    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },

    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    // consoles the current path of browser that used for active tab
    //console.log(path);
  }, [path]);

  return (
    <div className="h-screen shadow-md border">
      {/* Tabs */}
      <div className="p-5">
        {menuList.map((menu, index) => {
          return (
            <Link
            href={menu.path}
              key={index}
              className={`text-sm  font-semibold flex items-center gap-3 px-4 py-2 mb-2 hover:bg-primary 
            hover:text-white rounded-lg 
            cursor-pointer text-gray-500
            ${path == menu.path && "bg-primary text-white"}
            `}
            >
              <menu.icon />
              {menu.name}
            </Link>
          );
        })}
      </div>

      {/* Create new Button and Progress */}
      <div className="fixed bottom-7 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>

        <div className="my-5">
          <Progress value={33} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>2 </strong>Out of<strong>3 </strong>File Created
          </h2>

          <h2 className="text-sm mt-3 text-gray-600">
            Upgrade your Plan for unlimited AI Form
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
