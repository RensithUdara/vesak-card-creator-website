import Image from "next/image"
import { Bell, Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppBar() {
  return (
    <header className="sticky top-0 z-10 w-full shadow-md">
      <div className="h-2 w-full flex">
        <div className="flex-1 bg-blue-700"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-orange-500"></div>
      </div>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden text-teal-600">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png?height=40&width=40"
                alt="Code Craftix Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-teal-700">Vesak Card Creator</h1>
              <p className="text-xs text-teal-600/80">by CodeCraftix Technologies</p>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <h1 className="text-lg font-bold text-teal-700">Vesak Card</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-teal-600">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-teal-600">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
