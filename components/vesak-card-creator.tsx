"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toPng } from "html-to-image"
import { Download, Share, RefreshCw, Palette, Type, ImageIcon } from "lucide-react"
import AppBar from "./app-bar"

const poems = [
  { id: 1, value: "poem1", label: "මෙතෙක් කෙරෙන දුරු කරමින්" },
  { id: 2, value: "poem2", label: "සැමට සතුට සෙත සලසමින්" },
  { id: 3, value: "poem3", label: "බුදු සරණයි" },
  {
    id: 4,
    value: "poem4",
    label: "තෙරුවන් සරණයි",
    text: `තෙරුවන් සරණයි සිරි සදහම් වෙසෙක්හි
සෙත් සිතුවිලි පතුරුවාගෙන බලාපොරොත්තු
වෙත දහම් සිසිලස බව උදාවෙත්වා
සෙත් අත්වේවා සෙත් සාදා වේවාමයි`,
  },
]

const colorThemes = [
  { id: 1, name: "Saffron Gold", primary: "bg-amber-500", secondary: "bg-amber-50", accent: "text-amber-600" },
  { id: 2, name: "Bodhi Leaf", primary: "bg-emerald-600", secondary: "bg-emerald-50", accent: "text-emerald-600" },
  { id: 3, name: "Lotus Pink", primary: "bg-pink-500", secondary: "bg-pink-50", accent: "text-pink-600" },
  { id: 4, name: "Meditation Blue", primary: "bg-blue-600", secondary: "bg-blue-50", accent: "text-blue-600" },
  { id: 5, name: "Teal Harmony", primary: "bg-teal-600", secondary: "bg-teal-50", accent: "text-teal-600" },
]

export default function VesakCardCreator() {
  const [customPoem, setCustomPoem] = useState("")
  const [cardImages, setCardImages] = useState([
    { id: 1, src: "/placeholder.svg?height=150&width=150", alt: "Buddha with lotus" },
    { id: 2, src: "/placeholder.svg?height=150&width=150", alt: "Buddha silhouette with moon" },
    { id: 3, src: "/placeholder.svg?height=150&width=150", alt: "Bodhi tree at sunset" },
    { id: 4, src: "/placeholder.svg?height=150&width=150", alt: "Buddha statue" },
    { id: 5, src: "/placeholder.svg?height=150&width=150", alt: "Buddha with golden light" },
  ])
  const [stampImages, setStampImages] = useState([
    { id: 1, src: "/placeholder.svg?height=100&width=100", alt: "Stamp 1" },
    { id: 2, src: "/placeholder.svg?height=100&width=100", alt: "Stamp 2" },
    { id: 3, src: "/placeholder.svg?height=100&width=100", alt: "Lotus flower" },
    { id: 4, src: "/placeholder.svg?height=100&width=100", alt: "Sinhala text 1" },
    { id: 5, src: "/placeholder.svg?height=100&width=100", alt: "Sinhala text 2" },
  ])
  const [selectedCardImage, setSelectedCardImage] = useState(cardImages[0])
  const [selectedStamp, setSelectedStamp] = useState(stampImages[0])
  const [selectedPoem, setSelectedPoem] = useState("poem1")
  const [sender, setSender] = useState("")
  const [recipient, setRecipient] = useState("")
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0])
  const [fontSize, setFontSize] = useState("medium")

  const cardRef = useRef<HTMLDivElement>(null)

  const exportAsImage = async () => {
    if (cardRef.current === null) return

    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 })

      // Create a link and trigger download
      const link = document.createElement("a")
      link.download = "vesak-card.png"
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Error exporting image:", err)
    }
  }

  const resetCard = () => {
    setSelectedCardImage(cardImages[0])
    setSelectedStamp(stampImages[0])
    setSelectedPoem("poem1")
    setCustomPoem("")
    setSender("")
    setRecipient("")
    setSelectedTheme(colorThemes[0])
    setFontSize("medium")
  }

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-xs"
      case "medium":
        return "text-sm"
      case "large":
        return "text-base"
      default:
        return "text-sm"
    }
  }

  return (
    <div className="min-h-screen bg-amber-50/50">
      <AppBar />

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Preview */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-2xl">
              <div ref={cardRef} className="border-4 border-teal-600 rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Image */}
                  <div className={`w-full md:w-1/2 ${selectedTheme.primary} relative`}>
                    <div className="aspect-square relative">
                      <Image
                        src={selectedCardImage.src || "/placeholder.svg"}
                        alt={selectedCardImage.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right side - Message */}
                  <div className={`w-full md:w-1/2 ${selectedTheme.secondary} p-6 flex flex-col`}>
                    {/* Logo */}
                    <div className="self-end flex items-center gap-1 mb-2">
                      <div className="relative h-5 w-5">
                        <Image src="/placeholder.svg?height=20&width=20" alt="Code Craftix" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Code Craftix</span>
                    </div>

                    {/* Stamp */}
                    <div className="self-end mb-4">
                      <Image
                        src={selectedStamp.src || "/placeholder.svg"}
                        alt={selectedStamp.alt}
                        width={60}
                        height={60}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex-grow">
                      {selectedPoem !== "custom" ? (
                        <p className={`${selectedTheme.accent} mb-4 ${getFontSizeClass()}`}>
                          {poems.find((p) => p.value === selectedPoem)?.text ||
                            poems.find((p) => p.value === selectedPoem)?.label}
                        </p>
                      ) : (
                        customPoem && (
                          <p className={`${selectedTheme.accent} mb-4 ${getFontSizeClass()}`}>
                            {customPoem.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </p>
                        )
                      )}

                      <div className="mt-8 border-t border-gray-300 pt-2">
                        <p className="text-right text-sm text-gray-600">
                          {sender ? `${sender} විසින්` : "............... විසින්"}
                          <br />
                          {recipient ? `${recipient} වෙත` : "............... වෙත"}
                        </p>
                      </div>
                    </div>

                    {/* QR Code - Removed as requested */}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={exportAsImage}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Card
                </Button>
                <Button
                  className="bg-amber-500 hover:bg-amber-600"
                  onClick={async () => {
                    if (cardRef.current === null) return

                    try {
                      // First generate the image
                      const dataUrl = await toPng(cardRef.current, { quality: 0.95 })

                      // Create a file from the data URL
                      const blob = await (await fetch(dataUrl)).blob()
                      const file = new File([blob], "vesak-card.png", { type: "image/png" })

                      // Check if navigator.share and navigator.canShare are available
                      if (navigator.share && navigator.canShare) {
                        const shareData = {
                          title: "My Vesak Card",
                          text: "Check out my Vesak Card for Vesak celebration!",
                          files: [file],
                        }

                        // Check if we can share files
                        if (navigator.canShare(shareData)) {
                          await navigator.share(shareData)
                          return
                        }

                        // If we can't share files, try sharing just the text
                        await navigator.share({
                          title: "My Vesak Card",
                          text: "Check out my Vesak Card for Vesak celebration!",
                        })
                      } else {
                        // Fallback for browsers that don't support Web Share API
                        alert("Your browser doesn't support sharing. You can download the image and share it manually.")
                      }
                    } catch (err) {
                      console.error("Error sharing:", err)

                      // Provide a more helpful error message
                      if (err instanceof DOMException && err.name === "NotAllowedError") {
                        alert(
                          "Sharing was denied. This might be because the page isn't served over HTTPS or the share action wasn't triggered by a user gesture.",
                        )
                      } else {
                        alert("Sharing failed. You can download the image and share it manually.")
                      }
                    }
                  }}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" onClick={resetCard}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-teal-200 bg-white shadow-md">
              <h2 className="text-xl font-bold mb-6 text-teal-600">Customize Your Card</h2>

              <Tabs defaultValue="images" className="mb-6">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="images" className="flex items-center gap-1">
                    <ImageIcon className="h-4 w-4" />
                    <span>Images</span>
                  </TabsTrigger>
                  <TabsTrigger value="theme" className="flex items-center gap-1">
                    <Palette className="h-4 w-4" />
                    <span>Theme</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-1">
                    <Type className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="images">
                  {/* Card Image Selection */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-teal-700">Vesak Card Image</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {cardImages.map((image) => (
                        <div
                          key={image.id}
                          className={`border-2 rounded cursor-pointer overflow-hidden ${
                            selectedCardImage.id === image.id ? "border-teal-500" : "border-gray-200"
                          }`}
                          onClick={() => setSelectedCardImage(image)}
                        >
                          <div className="aspect-square relative">
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                      <label className="border-2 border-dashed border-gray-200 rounded flex items-center justify-center aspect-square cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              const imageUrl = URL.createObjectURL(file)
                              const newImage = {
                                id: cardImages.length + 1,
                                src: imageUrl,
                                alt: "Custom uploaded image",
                              }
                              setCardImages([...cardImages, newImage])
                              setSelectedCardImage(newImage)
                            }
                          }}
                        />
                        <span className="text-gray-400">+</span>
                      </label>
                    </div>
                  </div>

                  {/* Stamp Selection */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-teal-700">Stamp Design</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {stampImages.map((stamp) => (
                        <div
                          key={stamp.id}
                          className={`border-2 rounded cursor-pointer overflow-hidden ${
                            selectedStamp.id === stamp.id ? "border-teal-500" : "border-gray-200"
                          }`}
                          onClick={() => setSelectedStamp(stamp)}
                        >
                          <div className="aspect-square relative">
                            <Image
                              src={stamp.src || "/placeholder.svg"}
                              alt={stamp.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                      <label className="border-2 border-dashed border-gray-200 rounded flex items-center justify-center aspect-square cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0]
                              const imageUrl = URL.createObjectURL(file)
                              const newStamp = {
                                id: stampImages.length + 1,
                                src: imageUrl,
                                alt: "Custom uploaded stamp",
                              }
                              setStampImages([...stampImages, newStamp])
                              setSelectedStamp(newStamp)
                            }
                          }}
                        />
                        <span className="text-gray-400">+</span>
                      </label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="theme">
                  {/* Color Theme Selection */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-teal-700">Color Theme</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {colorThemes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`border-2 rounded-md p-2 cursor-pointer ${
                            selectedTheme.id === theme.id ? "border-teal-500" : "border-gray-200"
                          }`}
                          onClick={() => setSelectedTheme(theme)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${theme.primary}`}></div>
                            <div className="flex-1">
                              <p className="font-medium">{theme.name}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-teal-700">Font Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={fontSize === "small" ? "default" : "outline"}
                        className={fontSize === "small" ? "bg-teal-600" : ""}
                        onClick={() => setFontSize("small")}
                      >
                        Small
                      </Button>
                      <Button
                        variant={fontSize === "medium" ? "default" : "outline"}
                        className={fontSize === "medium" ? "bg-teal-600" : ""}
                        onClick={() => setFontSize("medium")}
                      >
                        Medium
                      </Button>
                      <Button
                        variant={fontSize === "large" ? "default" : "outline"}
                        className={fontSize === "large" ? "bg-teal-600" : ""}
                        onClick={() => setFontSize("large")}
                      >
                        Large
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text">
                  {/* Poem/Blessing Selection */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-teal-700">Poem/Blessing</h3>
                    <div className="space-y-3">
                      <Select value={selectedPoem} onValueChange={setSelectedPoem}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a poem or blessing" />
                        </SelectTrigger>
                        <SelectContent>
                          {poems.map((poem) => (
                            <SelectItem key={poem.id} value={poem.value}>
                              {poem.label}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Add Custom</SelectItem>
                        </SelectContent>
                      </Select>

                      {selectedPoem === "custom" && (
                        <div className="mt-2">
                          <textarea
                            className="w-full min-h-[100px] p-2 border rounded-md text-sm"
                            placeholder="Enter your custom blessing or poem"
                            value={customPoem}
                            onChange={(e) => setCustomPoem(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sender & Recipient */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-teal-700">Sender & Recipient</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">From (විසින්):</label>
                        <Input placeholder="Sender's name" value={sender} onChange={(e) => setSender(e.target.value)} />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">To (වෙත):</label>
                        <Input
                          placeholder="Recipient's name"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Info Card */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-teal-50 to-amber-50 border-teal-100">
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Code Craftix Logo" width={48} height={48} />
                </div>
                <div>
                  <h3 className="font-medium text-teal-700">Code Craftix Technologies</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Create beautiful Vesak greeting cards to share with your loved ones.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p className="mt-4">© 2025 CodeCraftix Technologies — Developed by Rensith Udara Gonalagoda</p>
        </div>
      </div>
    </div>
  )
}
