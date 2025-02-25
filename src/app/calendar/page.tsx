"use client"

import { useState } from "react"
import { Calendar as BigCalendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import type { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "@/styles/calendar.css"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const locales = {
  "en-US": enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  category: string
}

interface DragDropData {
  event: Event
  start: Date
  end: Date
}

// Add after the Event interface
interface EventStyle {
  backgroundColor: string
  borderColor: string
}

const eventColors: { [key: string]: EventStyle } = {
  meeting: { backgroundColor: '#3b82f6', borderColor: '#2563eb' },    // blue
  review: { backgroundColor: '#10b981', borderColor: '#059669' },     // green
  training: { backgroundColor: '#f59e0b', borderColor: '#d97706' },   // amber
  quality: { backgroundColor: '#8b5cf6', borderColor: '#7c3aed' },    // purple
  inventory: { backgroundColor: '#ef4444', borderColor: '#dc2626' },   // red
  supplier: { backgroundColor: '#6366f1', borderColor: '#4f46e5' },   // indigo
  default: { backgroundColor: '#94a3b8', borderColor: '#64748b' },    // slate
}

// Update dummy events to include category
const dummyEvents: (Event & { category: string })[] = [
  {
    id: '1',
    title: "Client Meeting - ABC Corp",
    start: new Date(2025, 1, 5, 10, 0),
    end: new Date(2025, 1, 5, 11, 30),
    category: 'meeting'
  },
  {
    id: '2',
    title: "Production Review",
    start: new Date(2025, 1, 12, 14, 0),
    end: new Date(2025, 1, 12, 15, 0),
    category: 'review'
  },
  {
    id: '3',
    title: "Supplier Conference",
    start: new Date(2025, 1, 15, 9, 0),
    end: new Date(2025, 1, 15, 17, 0),
    category: 'supplier'
  },
  {
    id: '4',
    title: "Quality Control Check",
    start: new Date(2025, 1, 20, 11, 0),
    end: new Date(2025, 1, 20, 12, 30),
    category: 'quality'
  },
  {
    id: '5',
    title: "Team Training",
    start: new Date(2025, 1, 25, 13, 0),
    end: new Date(2025, 1, 25, 16, 0),
    category: 'training'
  },
  {
    id: '6',
    title: "Inventory Review",
    start: new Date(2025, 1, 28, 10, 0),
    end: new Date(2025, 1, 28, 11, 0),
    category: 'inventory'
  }
]

const Calendar = withDragAndDrop<Event>(BigCalendar)

// Update calendar styles
const calendarStyles = {
  height: "70vh",
}

// Add this utility function at the top level
function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>(dummyEvents)
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    title: "",
    start: new Date(),
    end: new Date(),
    category: 'meeting'
  })
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month")

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({
      id: generateUniqueId(), // Generate unique ID for new events
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
      category: 'meeting'
    })
    setIsOpen(true)
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsViewOpen(true)
  }

  const handleAddEvent = () => {
    if (newEvent.title.trim()) {
      // Ensure new event has unique ID
      const eventToAdd = {
        ...newEvent,
        id: newEvent.id || generateUniqueId()
      }
      setEvents([...events, eventToAdd])
      setNewEvent({
        id: '',
        title: "",
        start: new Date(),
        end: new Date(),
        category: 'meeting'
      })
      setIsOpen(false)
    }
  }

  const handleUpdateEvent = () => {
    if (selectedEvent && selectedEvent.title.trim()) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? selectedEvent : event
      ))
      setIsViewOpen(false)
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id))
      setIsViewOpen(false)
    }
  }

  const handleEventDrop = ({ event, start, end }: { event: Event, start: string | Date, end: string | Date }) => {
    const idx = events.findIndex(e => e.id === event.id)
    if (idx === -1) return // Guard against event not found
    
    const updatedEvent = { 
      ...event,
      start: start instanceof Date ? start : new Date(start), 
      end: end instanceof Date ? end : new Date(end)
    }
    
    const newEvents = [...events]
    newEvents.splice(idx, 1, updatedEvent)
    setEvents(newEvents)
  }

  const handleEventResize = ({ event, start, end }: { event: Event, start: string | Date, end: string | Date }) => {
    const idx = events.findIndex(e => e.id === event.id)
    if (idx === -1) return // Guard against event not found
    
    const updatedEvent = { 
      ...event,
      start: start instanceof Date ? start : new Date(start), 
      end: end instanceof Date ? end : new Date(end)
    }
    
    const newEvents = [...events]
    newEvents.splice(idx, 1, updatedEvent)
    setEvents(newEvents)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Add Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title">Task Title</label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="category">Category</label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="start">Start Date</label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="end">End Date</label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                  />
                </div>
                <Button onClick={handleAddEvent}>Add Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Modified View/Edit Task Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title">Task Title</label>
                <Input
                  id="edit-title"
                  value={selectedEvent?.title || ""}
                  onChange={(e) => setSelectedEvent(selectedEvent ? {
                    ...selectedEvent,
                    title: e.target.value
                  } : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-start">Start Time</label>
                <Input
                  id="edit-start"
                  type="datetime-local"
                  value={selectedEvent ? format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm") : ""}
                  onChange={(e) => setSelectedEvent(selectedEvent ? {
                    ...selectedEvent,
                    start: new Date(e.target.value)
                  } : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-end">End Time</label>
                <Input
                  id="edit-end"
                  type="datetime-local"
                  value={selectedEvent ? format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm") : ""}
                  onChange={(e) => setSelectedEvent(selectedEvent ? {
                    ...selectedEvent,
                    end: new Date(e.target.value)
                  } : null)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-category">Category</label>
                <Select
                  value={selectedEvent?.category || "meeting"}
                  onValueChange={(value) => setSelectedEvent(selectedEvent ? {
                    ...selectedEvent,
                    category: value
                  } : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="destructive" onClick={handleDeleteEvent}>
                  Delete
                </Button>
                <Button onClick={handleUpdateEvent}>
                  Update Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="rounded-lg border bg-card p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor={(event: Event) => event.start}
            endAccessor={(event: Event) => event.end}
            style={calendarStyles}
            selectable
            resizable
            draggableAccessor={() => true}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event: Event) => handleSelectEvent(event)}
            view={currentView}
            onView={(view) => setCurrentView(view as "month" | "week" | "day")}
            views={["month", "week", "day"]}
            eventPropGetter={(event: Event) => ({
              style: {
                ...(eventColors[event.category] || eventColors.default),
                height: "auto",
                whiteSpace: "normal",
              }
            })}
            formats={{
              monthHeaderFormat: 'MMMM yyyy',
              dayHeaderFormat: 'EEE dd/MM',
              dayRangeHeaderFormat: ({ start, end }) =>
                `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`
            }}
            length={30}
          />
        </div>
      </main>
    </div>
  )
}

