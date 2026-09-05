import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * `alwaysRendered` houdt de inhoud altijd in de DOM, ook als het item dicht is.
 *
 * Standaard mount Radix de inhoud pas bij openen. Voor een FAQ betekent dat: de
 * antwoorden staan niet in de geprerenderde HTML, dus een crawler die tekst
 * leest ziet alleen de vragen. Met deze vlag staat de tekst er wel en verbergt
 * CSS hem tot iemand klikt. Google indexeert inhoud achter een accordeon
 * gewoon, en tekstextractors van AI-zoekmachines lezen de HTML-bron.
 *
 * Kosten: het dichtklap-animatietje vervalt voor dit item, want `hidden` grijpt
 * meteen in. Bewuste ruil. Laat de vlag weg waar de animatie belangrijker is
 * dan vindbaarheid, zoals bij de vragenlijsten.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    alwaysRendered?: boolean
  }
>(({ className, children, alwaysRendered, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    forceMount={alwaysRendered ? true : undefined}
    className={cn(
      "overflow-hidden text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      alwaysRendered && "data-[state=closed]:hidden"
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
