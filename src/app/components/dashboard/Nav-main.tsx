"use client"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { JSX, useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { getMenuItems } from "@/constants/dashboard"

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

type IconComponent = (props: IconProps) => JSX.Element;

interface SubNavItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  icon?: IconComponent;
  items?: SubNavItem[];
}

export function NavMain() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [openItems, setOpenItems] = useState<string[]>([])

  const items = getMenuItems(session?.user?.role, session?.user?.userType)

  useEffect(() => {
    items.forEach((item) => {
      if (item.items && isParentActive(item) && !openItems.includes(item.title)) {
        setOpenItems(prev => [...prev, item.title])
      }
    })
  }, [pathname])

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isItemOpen = (title: string) => openItems.includes(title)

  const isParentActive = (item: NavItem) => {
    if (!item.items) return false
    return item.items.some(subItem => pathname === subItem.href || pathname.startsWith(subItem.href + '/'))
  }
  const isDashboardActive = pathname === '/dashboard'

  const isMenuItemActive = (item: NavItem) => {
    if (item.items && item.items.length > 0) {
      return false 
    }
    if (item.href === '/dashboard') {
      return pathname === '/dashboard'
    }
    
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 px-3">
        <SidebarMenu>
          <SidebarMenuItem className="mb-4">
            <Link href="/" className="block w-full">
              <SidebarMenuButton
                tooltip="Dashboard Overview"
                className={cn(
                  "group relative overflow-hidden hover:text-white py-4 px-4 w-full",
                  "transition-all duration-300 ease-out",
                  "border",
                  isDashboardActive ? [
                    "bg-gradient-to-r from-green-600 via-green-700 to-green-700",
                    "text-white font-semibold text-lg shadow-xl",
                    "border-green-500/40 scale-[1.02]"
                  ] : [
                    "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-700",
                    "text-white font-semibold text-lg shadow-lg",
                    "border-green-500/20",
                    "hover:shadow-xl hover:scale-[1.02]",
                    "hover:from-green-600/90 hover:via-green-700/90 hover:to-green-700/90"
                  ]
                )}
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span className="tracking-wide">
                    <Link href="/">AgroYouth</Link>
                    </span>
                  {isDashboardActive && (
                    <div className="absolute -right-1 -top-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = isMenuItemActive(item)
              const hasSubItems = item.items && item.items.length > 0
              const isOpen = isItemOpen(item.title) || isParentActive(item)
              const parentActive = isParentActive(item)
              
              return (
                <SidebarMenuItem key={item.title}>
                  {hasSubItems ? (
                    <>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => toggleItem(item.title)}
                        className={cn(
                          "group relative rounded-lg py-3 px-4 transition-all duration-300 ease-out w-full",
                          "hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50/50",
                          "hover:shadow-md hover:scale-[1.02] hover:border-green-200/50",
                          "active:scale-[0.98] active:shadow-sm",
                          "border border-transparent cursor-pointer",
                          parentActive && [
                            "bg-gradient-to-r from-green-50 to-indigo-50",
                            "border-green-200 shadow-md",
                            "text-green-700 font-medium"
                          ],
                          !parentActive && [
                            "text-gray-700 hover:text-green-700",
                            "hover:border-gray-200"
                          ]
                        )}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={cn(
                            "flex items-center justify-center w-5 h-5 transition-all duration-300",
                            parentActive && "text-green-600 scale-110",
                            !parentActive && "text-gray-500 group-hover:text-green-600 group-hover:scale-110"
                          )}>
                            {item.icon && (
                              <item.icon 
                                size={20} 
                                strokeWidth={1.5}
                              />
                            )}
                          </div>

                          <span className={cn(
                            "transition-all duration-300 tracking-wide",
                            parentActive && "font-medium text-green-800",
                            !parentActive && "group-hover:translate-x-1"
                          )}>
                            {item.title}
                          </span>

                          <ChevronRight 
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-300",
                              isOpen && "rotate-90",
                              parentActive && "text-green-600"
                            )}
                          />
                        </div>
                      </SidebarMenuButton>

                      {isOpen && (
                        <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                          {item.items?.map((subItem) => {
                            const isSubActive = pathname === subItem.href || pathname.startsWith(subItem.href + '/')
                            
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <Link href={subItem.href} className="block w-full">
                                  <SidebarMenuSubButton
                                    className={cn(
                                      "rounded-md py-2 px-3 transition-all duration-200 w-full",
                                      "hover:bg-green-50 hover:text-green-700",
                                      "border border-transparent",
                                      isSubActive && [
                                        "bg-green-100 text-green-800 font-medium",
                                        "border-green-200 shadow-sm"
                                      ],
                                      !isSubActive && "text-gray-600"
                                    )}
                                  >
                                    <span className="flex items-center gap-2">
                                      <div className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all",
                                        isSubActive ? "bg-green-600 scale-125" : "bg-gray-400"
                                      )} />
                                      {subItem.title}
                                    </span>
                                  </SidebarMenuSubButton>
                                </Link>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block w-full">
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          "group relative rounded-lg py-3 px-4 transition-all duration-300 ease-out w-full",
                          "hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50/50",
                          "hover:shadow-md hover:scale-[1.02] hover:border-green-200/50",
                          "active:scale-[0.98] active:shadow-sm",
                          "border border-transparent cursor-pointer",
                          isActive && [
                            "bg-gradient-to-r from-green-50 to-indigo-50",
                            "border-green-200 shadow-md",
                            "text-green-700 font-medium"
                          ],
                          !isActive && [
                            "text-gray-700 hover:text-green-700",
                            "hover:border-gray-200"
                          ]
                        )}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={cn(
                            "flex items-center justify-center w-5 h-5 transition-all duration-300",
                            isActive && "text-green-600 scale-110",
                            !isActive && "text-gray-500 group-hover:text-green-600 group-hover:scale-110"
                          )}>
                            {item.icon && (
                              <item.icon 
                                size={20} 
                                strokeWidth={1.5}
                              />
                            )}
                          </div>

                          <span className={cn(
                            "transition-all duration-300 tracking-wide",
                            isActive && "font-medium text-green-800",
                            !isActive && "group-hover:translate-x-1"
                          )}>
                            {item.title}
                          </span>

                          {isActive && (
                            <div className="ml-auto flex items-center">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                            </div>
                          )}

                          <div className={cn(
                            "ml-auto w-0 h-0.5 bg-green-500 rounded-full transition-all duration-300",
                            "group-hover:w-6",
                            isActive && "w-0"
                          )} />
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  )}

                  {isActive && !hasSubItems && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
                  )}
                </SidebarMenuItem>
              )
            })}
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}